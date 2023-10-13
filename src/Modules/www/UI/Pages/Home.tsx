import React, {FC} from 'react';
import {Helmet} from "react-helmet";

export const HomePage: FC = () => {
  return (
      <>
        <Helmet>
          <title>leptosystem.com</title>
        </Helmet>

        <div className={'root-100vh d-flex align-items-center justify-content-center'}>
          <span>
            hello world from <a href="https://github.com/ysshir/leptosystem.com">leptosystem.com</a>
          </span>
        </div>
      </>
  );
}
