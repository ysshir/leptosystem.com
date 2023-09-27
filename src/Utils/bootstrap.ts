import React from "react";
import {BsPrefixProps, ReplaceProps} from "react-bootstrap/helpers";

export type BsProps<TInitial extends React.ElementType, P = unknown> = React.PropsWithChildren<ReplaceProps<TInitial, BsPrefixProps<TInitial> & P>>;
