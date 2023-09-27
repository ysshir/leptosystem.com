import {ChangeEventHandler, useCallback, useEffect, useRef} from 'react';
import {Updater} from "use-immer";

/**
 * 前回の値
 *
 * @param value
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * 汎用 onChangeHandler for Immer
 *
 * @param updater
 */
export function useImmerChangeHandler<S>(updater: Updater<S>): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  return useCallback(({
    currentTarget
  }) => {
    const {name, type, value} = currentTarget;
    // @ts-ignore
    updater(draft => void (draft[name] = type === 'checkbox' ? !draft[name] : value));
  }, [updater]);
}
