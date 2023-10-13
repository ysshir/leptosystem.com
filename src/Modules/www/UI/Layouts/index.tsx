import React, {FC} from 'react';
import {Header} from "./Header";
import {Outlet} from "react-router";

export const Layout: FC = () => {
  return (
      <div className={''}>
        <Header/>
        <Outlet/>
      </div>
  );
};
