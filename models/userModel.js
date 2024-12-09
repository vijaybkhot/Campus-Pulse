import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import validator from "validator";

// Destructure the Schema from mongoose
const { Schema } = mongoose;

// Sample user with required (mandatory) fields body
// {
//   "email": "user@campus-pulse.com",
//   "firstName":"newUser",
//   "dateOfBirth":"01/01/1991",
//   "educationMajor": "Computer Science",
//   "locationPreference":"Jersey City",
//   "password":"123456789",
//   "passwordConfirm":"123456789"
// }

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Email address is required"],
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (val) {
          return validator.isMobilePhone(val, "en-US", { strictMode: false }); // Strict mode can be set to false for more relaxed validation
        },
        message: "Please enter a valid mobile phone number",
      },
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio must be less than 500 characters"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "prefer not to say", "unknown"],
      default: "unknown",
    },
    countryOfOrigin: {
      type: String,
      default: "unknown",
    },
    educationMajor: {
      type: String,
      required: true,
    },
    smoking: {
      type: Boolean,
      default: false,
    },
    pets: {
      type: Boolean,
      default: false,
    },
    dietaryPreferences: {
      type: String,
      enum: ["Vegetarian", "Vegan", "Non-Veg", "any"],
      default: "any",
    },
    locationPreference: {
      type: String,
      required: true,
    },
    preferredRoommateGender: {
      type: String,
      enum: ["male", "female", "non-binary", "any"],
      default: "any",
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      trim: true,
      required: "Please enter a password",
      minlength: [8, "Password must be atleast 8 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: function () {
        // Make passwordConfirm required only for registration
        return this.isNew;
      },
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    loginCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirm
  this.passwordConfirm = undefined;

  next();
});

// Middleware to add passwordChangedAt after the change of password
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// A query middleware to filter out the not active users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Middleware to calculate age from DateOfBirth before saving
userSchema.pre("save", function (next) {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  if (
    month < birthDate.getMonth() ||
    (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  this.age = age; // Set age dynamically
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
