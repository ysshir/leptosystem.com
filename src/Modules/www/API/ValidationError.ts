import {AppRouter} from "./AppRouter";
import {ValidationError as ValidationErrorBase} from "src/TRPC/ValidationError";

/**
 * バリデーションエラー
 */
export class ValidationError extends ValidationErrorBase<AppRouter> {
}
