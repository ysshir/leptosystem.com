import React, {RefObject} from 'react';
import {Form, FormControlProps} from 'react-bootstrap';
import {BsProps} from "core/Utils/bootstrap";

export interface FormTextBaseProps extends BsProps<'input', FormControlProps> {

}

export interface FormTextBaseState {
  hasFocus: boolean
}

/**
 *
 */
export class FormTextBase<P extends BsProps<'input', FormControlProps>, S extends FormTextBaseState> extends React.PureComponent<P, S> {

  readonly _ref: RefObject<HTMLInputElement>;

  constructor(props: P | Readonly<P>) {
    super(props);

    this._ref = React.createRef();

    // 初期化
    this.state = {
      hasFocus: false,
    } as S;
  }

  handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    this.setState(prev => ({...prev, hasFocus: true}));

    // Original
    this.props.onFocus?.call(event.target, event);

    this.selectText();
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState(prev => ({...prev, hasFocus: false}));

    const formatted = this.format(event.currentTarget.value);
    if (event.target.value !== formatted) {

      // @ts-ignore
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set.call(event.target, formatted);
      event.target.dispatchEvent(new Event('input', {bubbles: true}));
    }

    // Original
    this.props.onBlur?.call(event.target, event);
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    // Original
    this.props.onKeyDown?.call(event.target, event);
  };

  format = (input: string): string => {
    return input;
  }

  selectText = () => {
    this._ref.current?.select();
  };


  controlProps() {
    return {
      autoComplete: 'off',
      ...this.props,
      onFocus  : this.handleFocus,
      onBlur   : this.handleBlur,
      onKeyDown: this.handleKeyDown,
      ref      : this._ref
    }
  }

  render() {
    return (
        <Form.Control {...this.controlProps()}/>
    );
  }
}
