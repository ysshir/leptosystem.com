import React, {FC, ReactNode, useState} from 'react';
import ReactDOM from "react-dom";
import {LoaderComponent} from "./Component";
import {v4 as uuid} from "uuid";

// Container
const container: HTMLBodyElement | null = document.querySelector('body');


interface LoaderTask<R> {
  (): Promise<R>;
}

interface LoaderContextType {
  // 表示
  show: (message: string) => void,

  // 非表示
  hide: () => void,

  // タスク
  task<R>(task: LoaderTask<R>): Promise<R>,

  task<R>(task: LoaderTask<R>, msec: number): Promise<R>,

  task<R>(message: string, task: LoaderTask<R>): Promise<R>,

  task<R>(message: string, task: LoaderTask<R>, msec: number): Promise<R>
}

//
const runningTasks = new Set<string>;

// コンテキスト
const LoaderContext = React.createContext<LoaderContextType>({} as LoaderContextType);
export const useLoader: () => LoaderContextType = () => React.useContext(LoaderContext);


// コンテナ
export const LoaderContainer: FC<{ children: ReactNode }> = ({children}) => {

  // シングルトン
  const [context] = useState<LoaderContextType>(() => {

    // 表示
    function fnShow(message: string) {
      setShow(true);
      setMessage(message);
    }

    // 非表示
    function fnHide() {
      setShow(false);
    }

    // タスク
    async function fnTask(message: any, task?: any, msec?: number) {
      const taskId = uuid();
      runningTasks.add(taskId);

      let _message: string;
      let _task: LoaderTask<any>;

      if (typeof message === 'string') {
        _message = message;
        _task = task;
      } else {
        _message = 'loading...';
        _task = message;
        msec = task;
      }

      try {
        // ローディング
        fnShow(_message);

        // タスク実行
        if (msec) {
          return await Date.duty(_task, msec);
        }
        return await _task();

      } finally {
        runningTasks.delete(taskId);

        if (runningTasks.size === 0) {
          fnHide();
        }
      }
    }

    // コンテキスト
    return {
      show: fnShow,
      hide: fnHide,
      task: fnTask
    };
  });

  // State
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  return (
      <>
        <LoaderContext.Provider value={context}>
          {children}
        </LoaderContext.Provider>

        {show && container && (
            ReactDOM.createPortal(
                <LoaderComponent message={message} fullScreen={true}/>,
                container,
            )
        )}
      </>
  );
}
