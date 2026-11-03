import ApiError from "../utils/ApiError.js";

export const validateMiddle = (schema) => (req, res, next) => {
    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success) {
        const errors = parsedData.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        throw new ApiError(400, "Invalid Data", errors);
    }

    req.body = parsedData.data;
    next();
};

export const validateParamsMiddle = (schema) => (req, res, next) => {
    const parsedData = schema.safeParse(req.params);

    if (!parsedData.success) {
        const errors = parsedData.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        throw new ApiError(400, "Invalid Data", errors);
    }

    req.validatedParams = parsedData.data;
    next();
};

export const validateQueryMiddle = (schema) => (req, res, next) => {
    const parsedData = schema.safeParse(req.query);

    if (!parsedData.success) {
        const errors = parsedData.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        throw new ApiError(400, "Invalid Data", errors);
    }

    req.validatedQuery = parsedData.data;
    next();
};