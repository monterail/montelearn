import dynamic from "next/dynamic";

// We have to render App only on the client side,
// because "react-admin" relies on `window` internally :(
export default dynamic(() => import("@/views/App"), { ssr: false });
