import {AppRouter} from "./AppRouter";
import {ValidationError as ValidationErrorBase} from "core/TRPC/ValidationError";

/**
 * バリデーションエラー
 */
export class ValidationError extends ValidationErrorBase<AppRouter> {
}
