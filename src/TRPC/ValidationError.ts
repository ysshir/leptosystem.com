import {AnyProcedure, AnyRouter} from '@trpc/server';
import {TRPCClientError} from '@trpc/client';

type RouterOrProcedure = AnyRouter | AnyProcedure;
type PropsType = { [key: string]: string[] };

export class ValidationError<T extends RouterOrProcedure> {

  private props: PropsType = {};

  constructor(err?: TRPCClientError<T>) {
    if (err) {
      JSON.parse(err.message).reduce((result: PropsType, elem: { path: string[], message: string }) => {
        const key = elem.path.join('.');
        if (key in result) {
          result[key].push(elem.message);
        } else {
          result[key] = [elem.message];
        }

        return result;
      }, this.props);

      console.error(err);
    }
  }

  get(name: string): string;
  get(name: string, glue: string = "\n"): string {
    if (name in this.props) {
      return this.props[name].join(glue);
    }
    return "";
  }

  /**
   * 例外変換
   *
   * @param _err
   */
  static convert(_err: any) {
    try {
      const err = new this(_err);
      return [true, err];

    } catch (e) {
      return [false, _err];
    }
  }
}
