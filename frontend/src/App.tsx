import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div>
      <Suspense>
        <Toaster position="bottom-right" />
        <Outlet />
      </Suspense>
    </div>
  );
};

export default App;
