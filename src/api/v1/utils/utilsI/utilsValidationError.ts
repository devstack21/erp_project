import { ValidationError } from "class-validator"
import { MessageValidationError } from "../../domain/error.domain"
import { AbstractMessageValidationError } from "../../domain/error.domain"
/**
 * @doc interface pour la definition des methodes de validation des services
 */
export interface utilsValidationErrorInterface{
     responseValidateError : (errors : ValidationError[]) => AbstractMessageValidationError
}