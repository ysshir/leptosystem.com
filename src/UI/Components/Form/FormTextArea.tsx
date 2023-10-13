import React, {RefObject} from 'react';
import {Form, FormControlProps} from 'react-bootstrap';
import {BsProps} from "core/Utils/bootstrap";


interface Props extends BsProps<'textarea', FormControlProps> {
}

interface State {
}

/**
 *
 */
export class FormTextArea extends React.PureComponent<Props, State> {

  readonly _ref: RefObject<HTMLTextAreaElement>;

  constructor(props: Props | Readonly<Props>) {
    super(props);

    this._ref = React.createRef();
  }

  handleFocus = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {

    // Original
    if (this.props.onFocus) {
      this.props.onFocus.call(event.target, event);
    }

    this.selectText();
  };

  selectText = () => {
    this._ref.current?.select();
  };

  render() {
    return (
        <Form.Control {...{
          autoComplete: 'off',
          ...this.props,
          as:      'textarea',
          onFocus: this.handleFocus,
          ref:     this._ref
        }}/>
    );
  }
}
