import { NextRouter } from "next/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";

export const withTestRouter = (tree: React.ReactElement, router: Partial<NextRouter> = {}) => {
  const {
    route = "",
    pathname = "",
    query = {},
    asPath = "",
    basePath = "/",
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    prefetch = async () => undefined,
    beforePopState = () => null,
    isFallback = false,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
  } = router;

  return (
    <RouterContext.Provider
      value={{
        route,
        pathname,
        query,
        asPath,
        basePath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        isFallback,
        events,
      }}
    >
      {tree}
    </RouterContext.Provider>
  );
};
