import React from 'react';
import {FormTextBase, FormTextBaseProps, FormTextBaseState} from "./FormTextBase";


interface FormTextProps extends FormTextBaseProps {
}

export interface FormTextState extends FormTextBaseState {
}

/**
 *
 */
export class FormText extends FormTextBase<FormTextProps, FormTextState> {
  controlProps = () => ({
    ...super.controlProps(),
  });
}
