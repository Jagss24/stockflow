import { useGetCurrentUserQuery } from "@/api/user/user.query";
import { ROUTE_PAGES } from "@/constants/pages";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { data, isLoading, isFetching } = useGetCurrentUserQuery({});

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (data) {
    return <Navigate to={ROUTE_PAGES.dashboard} replace />;
  }

  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default PublicRoute;
