import React, {FC} from 'react';
import {useTRPC} from "www/UI/App";
import {Col, Container, Row} from "react-bootstrap";
import {FormCol, FormNumber, FormPassword, FormSelect, FormText, FormTextArea, useLoader, useMessage} from "core/UI";
import {Helmet} from "react-helmet";
import {useImmerChangeHandler} from "core/Utils/react/hooks";
import {useImmer} from "use-immer";

const defaultModel = {
  text            : '',
  password        : '',
  integer         : '',
  integer_realtime: '',
  float           : '',
  float_realtime  : '',
  textarea        : '',
  select          : '',
}


export const FormPage: FC = () => {
  const Loader  = useLoader(),
        Message = useMessage(),
        tRPC    = useTRPC();

  const [model, setModel] = useImmer(defaultModel);

  // 編集
  const handleChange = useImmerChangeHandler(setModel);

  return (
      <>
        <Helmet>
          <title>Input | leptosystem</title>
        </Helmet>

        <Container>
          <Row>
            <Col>
              <h3>
                Formパーツ
              </h3>
            </Col>
          </Row>

          <Row className={'mt-5'}>
            <FormCol inputId={'FormText'}
                     className={'mb-1'}
                     labelColClassname={'text-end'}
                     title={'テキスト'}
                     size={{xs: [3, 3], lg: [1, 2]}}>

              <FormText name={'text'}
                        value={model.text}
                        onChange={handleChange}
                        className={'me-1 mb-1'}
                        size={'sm'}
                        style={{}}/>
            </FormCol>

            <FormCol inputId={'FormPassword'}
                     className={'mb-1'}
                     labelColClassname={'text-end'}
                     title={'パスワード'}
                     size={{xs: [3, 3], lg: [1, 2]}}>

              <FormPassword name={'password'}
                            value={model.password}
                            onChange={handleChange}
                            className={'me-1 mb-1'}
                            size={'sm'}
                            style={{}}/>
            </FormCol>


            <FormCol inputId={'FormNumber'}
                     className={'mb-1'}
                     labelColClassname={'text-end'}
                     title={'整数1'}
                     size={{xs: [3, 3], lg: [1, 2]}}>

              <FormNumber name={'integer'}
                          value={model.integer}
                          onChange={handleChange}
                          precision={0}
                          className={'me-1 mb-1'}
                          size={'sm'}
                          style={{}}/>
            </FormCol>

            <FormCol inputId={'FormNumber + realtime'}
                     className={'mb-1'}
                     labelColClassname={'text-end'}
                     title={'整数2'}
                     size={{xs: [3, 3], lg: [1, 2]}}>

              <FormNumber name={'integer_realtime'}
                          value={model.integer_realtime}
                          onChange={handleChange}
                          precision={0}
                          realtime={true}
                          className={'me-1 mb-1'}
                          size={'sm'}
                          style={{}}/>
            </FormCol>

            <FormCol inputId={'FormNumber'}
                     className={'mb-1'}
                     labelColClassname={'text-end'}
                     title={'小数1'}
                     size={{xs: [3, 3], lg: [1, 2]}}>

              <FormNumber name={'float'}
                          value={model.float}
                          onChange={handleChange}
                          precision={2}
                          className={'me-1 mb-1'}
                          size={'sm'}
                          style={{}}/>
            </FormCol>

            <FormCol inputId={'FormNumber + realtime'}
                     className={'mb-1'}
                     labelColClassname={'text-end'}
                     title={'小数2'}
                     size={{xs: [3, 3], lg: [1, 2]}}>

              <FormNumber name={'float_realtime'}
                          value={model.float_realtime}
                          onChange={handleChange}
                          realtime={true}
                          precision={2}
                          className={'me-1 mb-1'}
                          size={'sm'}
                          style={{}}/>
            </FormCol>


            <FormCol inputId={'FormTextArea'}
                     className={'mb-1'}
                     labelColClassname={'text-end'}
                     title={'テキストエリア'}
                     size={{xs: [3, 9], lg: [1, 11]}}>

              <FormTextArea name={'textarea'}
                            value={model.textarea}
                            onChange={handleChange}
                            className={'me-1 mb-1'}
                            size={'sm'}
                            style={{}}/>
            </FormCol>

            <FormCol inputId={'FormSelect'}
                     className={'mb-1'}
                     labelColClassname={'text-end'}
                     title={'セレクタ'}
                     size={{xs: [3, 3], lg: [1, 2]}}>

              <FormSelect name={'select'}
                          value={model.select}
                          onChange={handleChange}
                          className={'me-1 mb-1'}
                          size={'sm'}
                          style={{}}>

                <option value="">-</option>
                <option value="0">選択肢0</option>
                <option value="1">選択肢1</option>
                <option value="2">選択肢2</option>
                <option value="3">選択肢3</option>
              </FormSelect>
            </FormCol>
          </Row>
        </Container>
      </>
  );
}
