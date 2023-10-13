import React, {FC} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {Layout} from "www/UI/Layouts";
import {Routes} from "react-router";
import {HomePage} from "www/UI/Pages/Home";
import {RemoveTrailingSlash, ScrollManager} from "core/UI";
import {TRPCPage} from "www/UI/Pages/Trpc";

/**
 *
 */
export const RootPage: FC = () => {
  return (
      <BrowserRouter>
        <RemoveTrailingSlash/>
        <ScrollManager/>

        <Routes>
          <Route element={<Layout/>}>
            <>
              <Route index element={<HomePage/>}/>
              <Route path="/trpc/*" element={<TRPCPage/>}/>
            </>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
