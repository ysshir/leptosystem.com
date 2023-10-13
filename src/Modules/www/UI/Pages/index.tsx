import React, {FC, useCallback} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {Layout} from "www/UI/Layouts";
import {Routes} from "react-router";
import {HomePage} from "www/UI/Pages/Home";
import {RemoveTrailingSlash, ScrollManager} from "core/UI";
import {TRPCPage} from "www/UI/Pages/Trpc";
import {FormPage} from "www/UI/Pages/Form";

/**
 *
 */
export const RootPage: FC = () => {
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    let target = event.target as HTMLInputElement;

    if (target.tagName !== 'INPUT' || target.type !== 'date') {
      return;
    }

    // 日付コピペ
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    switch (event.keyCode) {
      case 67: {
        // Copy
        navigator.clipboard.writeText(target.value);
        break;
      }

      case 86: {
        // Paste
        navigator.clipboard.readText().then(text => {
          if (Date.isValid(text)) {
            Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set?.call(target, new Date(text).toYmd());
          }
          target.dispatchEvent(new Event('input', {bubbles: true}));
        })
        break;
      }
    }
  }, []);

  return (
      <div onKeyDown={handleKeyDown}>
        <BrowserRouter>
          <RemoveTrailingSlash/>
          <ScrollManager/>

          <Routes>
            <Route element={<Layout/>}>
              <>
                <Route index element={<HomePage/>}/>
                <Route path="/trpc/*" element={<TRPCPage/>}/>
                <Route path="/form/*" element={<FormPage/>}/>
              </>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}
