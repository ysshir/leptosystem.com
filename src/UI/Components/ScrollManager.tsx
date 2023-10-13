import {FC, useEffect} from 'react';
import {useLocation} from "react-router-dom";

export const ScrollManager: FC = () => {
  const {pathname, hash} = useLocation();

  useEffect(() => {
    if (hash) {
      const dom = document.querySelector(hash);
      if (dom) {
        dom.scrollIntoView(true);
        return;
      }
    }
    window.scrollTo(0, 0);

  }, [pathname, hash]);

  return null;
}
