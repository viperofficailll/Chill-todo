import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Header></Header>
      <div className="mx-auto mt-4 max-w-8xl flex-1 border border-gray-200 shadow-[0px_-1px_50px_0px_rgba(0,0,0,0.1)]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RootLayout;
