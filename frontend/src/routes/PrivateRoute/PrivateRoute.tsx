import { useGetCurrentUserQuery } from "@/api/user/user.query";
import { ROUTE_PAGES } from "@/constants/pages";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { data, isLoading, isFetching } = useGetCurrentUserQuery({});

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (!data?.data) {
    return <Navigate to={ROUTE_PAGES.login} replace />;
  }
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default PrivateRoute;
