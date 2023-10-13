import React, {FC, useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Nl2Br} from "core/UI";

/**
 * コンポーネント
 *
 * @param title
 * @param message
 * @param onExit
 * @constructor
 */
export const MessageModalComponent: FC<{ title?: string, message: string, onExited: () => void }> = ({title = '', message, onExited}) => {

  const [show, setShow] = useState<boolean>(false);
  const handleClose     = () => setShow(false);

  // 表示
  useEffect(() => setShow(true), []);

  return (
      <Modal show={show}
             onHide={handleClose}
             onExited={onExited}
             backdropClassName={'system-modal'}>

        {/* title */}
        {0 < title.length && (
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
        )}

        <Modal.Body className={`m-body`}><Nl2Br text={message}/></Modal.Body>
        <Modal.Footer className={'justify-content-center'}>
          <Button variant="primary"
                  onClick={handleClose}
                  style={{minWidth: '10em'}}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
  );
};
