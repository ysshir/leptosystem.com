import React, {FC, useState} from 'react';
import {useTRPC} from "www/UI/App";
import {Col, Container, Row} from "react-bootstrap";
import {useLoader, useMessage} from "core/UI";
import {ValidationError} from "www/API/ValidationError";
import {Helmet} from "react-helmet";

export const TRPCPage: FC = () => {
  const Loader  = useLoader(),
        Message = useMessage(),
        tRPC    = useTRPC();

  const [a, setA]           = useState(''),
        [b, setB]           = useState(''),
        [result, setResult] = useState(''),
        [error, setError]   = useState<ValidationError | null>(null);

  const calculateOnServer = () => {
    Loader.task(async () => {
      setError(null);
      try {
        const response = await tRPC.test.times.query({a, b})
        setResult(response.toString());

      } catch (err) {
        const [converted, error] = ValidationError.convert(err);
        if (converted) {
          Message.error('入力内容を確認してください');
          setError(error)
          return;
        }
      }
    }, 500);
  };

  return (
      <>
        <Helmet>
          <title>tRPC実験 | leptosystem</title>
        </Helmet>

        <Container>
          <Row>
            <Col>
              <h3>
                <a href={'https://trpc.io/'} target={'_blank'}>tRPC</a>実験
              </h3>
            </Col>
          </Row>

          <Row className={'mt-5'}>
            <Col>
              <input value={a}
                     onChange={event => setA(event.currentTarget.value)}/>
              <span className={'text-danger'}>{error?.get('a')}</span>
            </Col>
            <Col>
              x
            </Col>
            <Col>
              <input value={b}
                     onChange={event => setB(event.currentTarget.value)}/>
              <span className={'text-danger'}>{error?.get('a')}</span>
            </Col>
            <Col>
              <button onClick={calculateOnServer}>
                =
              </button>
            </Col>
            <Col>
              <input value={result} readOnly/>
            </Col>
          </Row>
        </Container>
      </>
  );
}
