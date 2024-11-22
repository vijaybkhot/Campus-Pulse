import { createHash } from "crypto";
import { promisify } from "util";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Email from "../utils/email.js";

const signToken = (id) =>
  sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // Cookie options. The secure should be set to true only in production mode
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // Setting secure:true in production
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  // Sending token via cookie
  res.cookie("jwt", token, cookieOptions);

  // Remove/hide password from output
  user.password = undefined;

  // Send response
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  // Create a new user using the User schema with necessary fields
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName || "",
    email: req.body.email,
    phone: req.body.phone, // Default to empty string if not provided
    bio: req.body.bio || "", // Default to empty string if not provided
    locationPreference: req.body.locationPreference,
    countryOfOrigin: req.body.countryOfOrigin || "unknown", // Default to "Unknown"
    educationMajor: req.body.educationMajor,
    smoking: req.body.smoking || false, // Default to false if not provided
    pets: req.body.pets || false, // Default to false if not provided
    dietaryPreferences: req.body.dietaryPreferences || "any", // Default to "Any"
    preferredRoommateGender: req.body.preferredRoommateGender || "any", // Default to "any"
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender || "unknown", // Default to "other"
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // // Prepare the welcome message
  // const message = `Welcome to Our Community, ${newUser.firstName}!

  // We're thrilled to have you join us. Get ready to explore, connect, and make the most out of our platform.

  // Here are a few tips to help you get started:
  // - Complete your profile to let others know more about you.
  // - Check out the latest events and groups aligned with your interests.
  // - Don’t hesitate to reach out if you need any assistance – we're here to help!

  // If you have any questions or feedback, feel free to reply to this email.

  // Once again, welcome aboard! We can't wait to see all the great things you'll accomplish.

  // Warm regards,
  // The Campus-Pulse Team`;

  // // Send welcome email
  // await sendEmail({
  //   email: newUser.email,
  //   subject: "Welcome to Campus-Pulse!",
  //   message: message,
  // });

  // Generate JWT token and send response
  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // 3) If everything is ok, send token to client
  createSendToken(user, 200, res);
});

// Logout
export function logout(req, res) {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
}

// Protect function
export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log into get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError("The user to whom this token belongs no longer exists.", 401)
    );

  // 4) Check if user changed password after the JWT was issued
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please login again.", 401)
    );
  }

  // Grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});

// Check if user is loggedin
export async function isLoggedIn(req, res, next) {
  // 1) Getting token and check if its there
  if (req.cookies.jwt) {
    try {
      // 2) Verify token
      const decoded = await promisify(verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();

      // 4) Check if user changed password after the JWT was issued
      if (currentUser.changePasswordAfter(decoded.iat)) {
        return next();
      }

      // Grant access to protected route
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
}

// Restrict to a particular role
export function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
}

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/users/resetPassword/${resetToken}`;

    // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password please ignore this email!`;
    // await sendEmail({
    //   email: user.email,
    //   subject: "Your password reset token (valid for 10 mins)",
    //   message: message,
    // });

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passworResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3) Log the user in, send JWT
  createSendToken(user, 200, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  // 2) Check if POSTed current password is correct
  const isPasswordCorrect = await user.correctPassword(
    req.body.passwordCurrent,
    user.password
  );
  if (!isPasswordCorrect) {
    return next(new AppError("Your current password is incorrect.", 401));
  }

  // 3) Update password fields
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;

  // Save the user with the new password
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
