import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="p-4 flex flex-col max-w-xl mx-auto min-h-screen relative">
      <Outlet />
    </div>
  );
};
