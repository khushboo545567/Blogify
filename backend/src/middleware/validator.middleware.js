import { validationResult } from "express-validator";
import { ApiError } from "../utils/apiError.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const expectedError = [];
  errors.array().map((err) => expectedError.push({ [err.path]: err.msg }));
  throw new ApiError(422, "Reseived data is not vaild");
};
