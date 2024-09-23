
import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from '../extends/customError';
import { ResponseHttp } from '../domain/http.domain';

export default class ErrorMiddlewareHttp {
    public static NotFoundErrorsHttp(request : express.Request ,response : express.Response,next : NextFunction){
        if (!response.headersSent) {
            const error: CustomError = new Error('URL Not Found');
            error.status = 404;
            next(error);
        }  
    }
    public static HandlerHTTPNotFoundErrors(request : express.Request,response : express.Response, next : NextFunction){
        const err = createError(404);
        if(err){
            console.debug(err)
            response.status(404).json({message : err , status : 404})
            next()
        }
    }
    public static GlobalErrorHandlerHttp(err : CustomError, request : express.Request , response : express.Response , next : NextFunction){
        response.status(err.status || 500);
        response.json({
            status: err.status,
            message: err.message,
        } as ResponseHttp
    
        );
    }

}