import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";

export function deleteOne(Model) {
  return catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id, {});

    if (!document) {
      return next(new AppError(`No document found with that ID`, 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
}

export function updateOne(Model) {
  return catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: document,
      },
    });
  });
}

export function createOne(Model) {
  return catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: document,
      },
    });
  });
}

// Get one document factory handler function
// popOptions for the case where we need to populate based on certain referencing
export function getOne(Model, popOptions) {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query; // Populate the reviews of virtual populate

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
}

//   }

// Utility function to capitalize each word
function capitalizeWords(str) {
  if (typeof str !== "string") return str;
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getAll(Model, defaultSort = null) {
  return catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on TOUR (hack)
    let filter = {};

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort(defaultSort)
      .limitFields()
      .paginate();

    let docs = await features.query;

    // Capitalize the first letter of each word for relevant fields
    docs = docs.map((doc) => {
      const newDoc = { ...doc._doc };
      for (let key in newDoc) {
        if (
          key !== "email" &&
          key !== "bio" &&
          isNaN(newDoc[key]) &&
          typeof newDoc[key] === "string"
        ) {
          newDoc[key] = capitalizeWords(newDoc[key]);
        }
      }
      return newDoc;
    });

    // Send Response
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
}
