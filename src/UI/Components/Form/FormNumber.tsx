import React from 'react';
import {FormTextBase, FormTextBaseProps, FormTextBaseState} from "./FormTextBase";
import {Form} from "react-bootstrap";


export interface FormNumberProps extends FormTextBaseProps {
  precision: number | 0;
  realtime?: boolean;
}


export interface FormNumberState extends FormTextBaseState {
}

/**
 *
 */
export class FormNumber extends FormTextBase<FormNumberProps, FormNumberState> {

  format = (input: string): string => {
    return input.toNumber(this.props.precision) ?? '';
  }

  controlProps() {
    let {value, placeholder, ...props} = super.controlProps();

    if (!this.state.hasFocus) {
      value = String(value).toNumber(this.props.precision)?.withComma ?? '';
    } else {
      placeholder = '';
    }

    return {
      ...props, value, placeholder
    }
  };

  render() {
    const {value, precision, realtime} = this.props;

    const showFormat = this.state.hasFocus && realtime,
          formatted  = String(value).toNumber(precision)?.withComma ?? '';


    return (
        <div className={'position-relative align-bottom'}>
          <Form.Control {...this.controlProps()}
                        style={showFormat ? {padding: '0.70rem 0.75rem 0.05rem'} : {}}
          />
          {showFormat && (
              <span className={'position-absolute text-start fw-light'}
                    style={{
                      fontSize       : 'x-small',
                      backgroundColor: 'transparent',
                      padding        : '0.05rem 0.75rem',
                      inset          : 0
                    }}>
                {formatted}
              </span>
          )}
        </div>
    );
  }
}
