import { useRouter } from "next/router";

import UsersResetPasswordPage from "@/views/users/reset-password";

const ResetPasswordPage = () => {
  const {
    query: { uid, token },
  } = useRouter();
  return <UsersResetPasswordPage uid={uid as string} token={token as string} />;
};

export default ResetPasswordPage;
