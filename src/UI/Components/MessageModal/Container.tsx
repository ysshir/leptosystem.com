import React, {FC, ReactNode, useState} from "react";
import {v4 as uuid} from "uuid";
import {useImmer} from "use-immer";
import {MessageModalComponent} from './Component';


export interface MessageModalContextType {
  show(title: string, message: string, callback: () => void): void;

  show(title: string, message: string): void;

  show(message: string, callback: () => void): void;

  show(message: string): void;

  error(error: { errors: ErrorType[] } | any): void;

  error(error: { errors: ErrorType[] } | any, callback: () => void): void;
}

interface Message {
  uuid: string,
  title?: string,
  message: string,
  callback?: () => void
}

interface ErrorType {
  message: string
}


// コンテキスト
const MessageModalContext = React.createContext<MessageModalContextType>({} as MessageModalContextType);
export const useMessage: () => MessageModalContextType = () => React.useContext(MessageModalContext);


// コンテナ
export const MessageModalContainer: FC<{ children: ReactNode }> = ({children}) => {

  const [context] = useState<MessageModalContextType>(() => {

    // 表示
    function fnShow(title: string, message?: any, callback?: any) {
      let _title: string;
      let _message: string;
      let _callback: (() => void) | undefined;

      if (typeof message === 'string') {
        _title = title;
        _message = message;
        _callback = callback;
      } else {
        _title = '';
        _message = title;
        _callback = message;
      }

      setMessages(draft => {
        draft.push({
          uuid:     uuid(),
          title:    _title,
          message:  _message,
          callback: _callback,
        });
      });
    }

    // エラー
    function fnError(err: string | ErrorType | { errors: ErrorType[] }, callback?: () => void) {
      if (typeof err === 'string') {
        fnShow(err, callback);
      } else if ("message" in err) {
        fnShow(err.message, callback);
      } else {
        fnShow(err.errors.map(elem => elem.message).join("\n"), callback);
      }
    }

    // Context
    return {
      show:  fnShow,
      error: fnError
    };
  });

  // State
  const [messages, setMessages] = useImmer<Message[]>([]);

  return (
      <>
        <MessageModalContext.Provider value={context}>
          {children}
        </MessageModalContext.Provider>

        {messages.map(msg => {
          const {uuid, title, message, callback} = msg;

          const onExited = () => {
            setMessages(draft => draft.filter(el => el !== msg));
            if (callback) {
              callback();
            }
          };

          return (
              <MessageModalComponent key={uuid}
                                     title={title}
                                     message={message}
                                     onExited={onExited}/>
          );
        })}
      </>
  );
}

