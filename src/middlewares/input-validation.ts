import { NextFunction, Request, Response } from "express";
import createHttpError, { BadRequest, InternalServerError } from "http-errors";
import { ObjectSchema } from "joi";

export default function validate(validator: ObjectSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            req.body = await validator.validateAsync(req.body)
            return next()
        }
        catch (err) {
            if(err.isJoi) { // isJoi is a boolean value set to true that joi adds
                return next(createHttpError(BadRequest(err.message)))
            }
            return next(createHttpError(InternalServerError(err)))
        }
    }

}