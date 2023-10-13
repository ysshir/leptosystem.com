import React, {RefObject} from 'react';
import {Form} from 'react-bootstrap';
import {FormSelectProps} from "react-bootstrap/FormSelect";
import {BsProps} from "core/Utils/bootstrap";

interface Props extends BsProps<'select', FormSelectProps> {
}

interface State {
}

/**
 *
 */
export class FormSelect extends React.PureComponent<Props, State> {

  readonly _ref: RefObject<HTMLSelectElement>;

  constructor(props: Props | Readonly<Props>) {
    super(props);

    this._ref = React.createRef();
  }


  render() {
    const {children, ...props} = this.props;
    return (
        <Form.Select {...props} ref={this._ref}>
          {children}
        </Form.Select>
    );
  }
}
