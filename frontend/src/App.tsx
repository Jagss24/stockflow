import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default App;
