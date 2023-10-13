import {FC, ReactNode} from "react";
import {Col, Form} from "react-bootstrap";

type ColSizeKeys = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type ColSize = Partial<Record<ColSizeKeys, number>>;

export const FormCol: FC<{
  inputId: string,
  title: string,
  subtitle?: string,
  size: Partial<Record<ColSizeKeys, [number, number]>> | [number, number],
  labelColClassname?: string,
  controlColClassName?: string,
  className?: string,
  children: ReactNode,
  comment?: string,
  error?: string,
}> = ({inputId, title, subtitle, size, className, labelColClassname, controlColClassName, children, comment, error}) => {

  const colSize = [{}, {}] as [ColSize, ColSize];
  if (Array.isArray(size)) {
    colSize[0].xs = size[0];
    colSize[1].xs = size[1];
  } else {
    Object.entries(size).forEach(([key, [a, b]]) => {
      colSize[0][key as ColSizeKeys] = a;
      colSize[1][key as ColSizeKeys] = b;
    });
  }

  return (
      <>
        <Col {...colSize[0]} className={`${className} ${labelColClassname}`}>
          <label htmlFor={inputId} className={'small lh-sm h-100'}>
            {title}<br/>
            <small className={'text-muted'}>{subtitle || inputId}</small>
          </label>
        </Col>
        <Col {...colSize[1]} className={`${className} ${controlColClassName}`}>
          {children}
          {comment && (
              <div>
                <Form.Text className="text-muted">
                  <small>{comment}</small>
                </Form.Text>
              </div>
          )}
          {error && (
              <div>
                <Form.Text className="text-danger">
                  {error}
                </Form.Text>
              </div>
          )}
        </Col>
      </>
  )
}
