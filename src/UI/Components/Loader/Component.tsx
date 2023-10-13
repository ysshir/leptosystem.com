import React, {CSSProperties, FC} from 'react';
import {Spinner} from 'react-bootstrap';
import style from './Component.module.scss';

interface Props {
  message?: string,
  fullScreen: boolean
}

/**
 * コンポーネント
 *
 * @param message
 * @param fullScreen
 * @constructor
 */
export const LoaderComponent: FC<Props> = ({message, fullScreen}) => {
  const css: CSSProperties = {flexFlow: 'column nowrap'};
  if (fullScreen) {
    css.position = 'fixed';
  }

  return (
      <div className={`${style.loading}`} style={css}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className={style.message} style={{marginLeft: '1em'}}>{`${message || 'Loading'}...`}</p>
      </div>
  );
}
