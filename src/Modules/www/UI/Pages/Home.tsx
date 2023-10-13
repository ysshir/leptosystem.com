import React, {FC, useState} from 'react';
import {useTRPC} from "www/UI/App";

export const HomePage: FC = () => {


  const tRPC = useTRPC();

  const [a, setA] = useState(''),
        [b, setB] = useState(''),
        [r, setR] = useState('');

  return (
      <>
        hello world from <a href="https://github.com/ysshir/leptosystem.com">leptosystem.com</a>

        <div>
          <span>trpc かけざん</span>
          <div>
            <input value={a}
                   onChange={event => setA(event.currentTarget.value)}/>

            x
            <input value={b}
                   onChange={event => setB(event.currentTarget.value)}/>

            <button onClick={async () => {
              try {
                const response = await tRPC.test.times.query({a, b})
                setR(response.toString());

              } catch (err) {
                console.error(err);
              }
            }}>
              =
            </button>
            <input value={r} readOnly/>
          </div>
        </div>
      </>
  );
}
