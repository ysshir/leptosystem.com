import React, {FC} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {Layout} from "www/UI/Layouts";
import {Routes} from "react-router";
import {HomePage} from "www/UI/Pages/Home";

/**
 *
 */
export const RootPage: FC = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <>
              <Route index element={<HomePage/>}/>
            </>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
