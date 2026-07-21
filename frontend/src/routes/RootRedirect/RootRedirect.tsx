import { useGetCurrentUserQuery } from "@/api/user/user.query";
import { ROUTE_PAGES } from "@/constants/pages";
import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const { data, isLoading, isFetching } = useGetCurrentUserQuery({});

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  return data ? (
    <Navigate to={ROUTE_PAGES.product} replace />
  ) : (
    <Navigate to={ROUTE_PAGES.login} replace />
  );
};

export default RootRedirect;
