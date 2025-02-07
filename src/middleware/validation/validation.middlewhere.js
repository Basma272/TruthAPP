import { Types } from "mongoose";

// Middleware for validation using a schema
export const validateobjectId=(value,helpar)=>{
    return Types.ObjectId.isValid(value)
?true
:helpar.message("in-validobject")

}

export const validation = (schema) => {
    return (req, res, next) => {
    const inputdata = { ...req.body, ...req.query, ...req.params };

if (req.headers["accept-language"]) {
    inputdata["accept-language"] = req.headers["accept-language"];
}

const result = schema.validate(inputdata, { abortEarly: false });
    if (result.error) {
    return res.status(400).json({ message: "error", result: result.error.details });
    }

    next();
    };
    };
