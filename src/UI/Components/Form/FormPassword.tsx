import React from 'react';
import {Form} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FormControlProps} from "react-bootstrap";
import {BsProps} from "core/Utils/bootstrap";

/**
 *
 */
export interface Props extends BsProps<'input', FormControlProps> {
}


/**
 * @param props
 * @constructor
 */
export const FormPassword = (props: Props) => {
  const [visible, setVisible] = React.useState(false);

  return (
      <div className={'position-relative'}>
        <Form.Control {...props}
                      type={visible ? 'text' : 'password'}/>

        <button type="button"
                className={'position-absolute border-0 p-0'}
                style={{width: '2em', top: 0, bottom: 0, right: 5, background: 'none', userSelect: 'none'}}
                tabIndex={-1}
                onClick={event => {
                  event.preventDefault();
                  event.stopPropagation();

                  setVisible(!visible);
                }}>
          <FontAwesomeIcon icon={visible ? faEye : faEyeSlash}/>
        </button>
      </div>
  )
}


