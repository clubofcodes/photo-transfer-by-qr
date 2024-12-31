import React from "react";
import { Outlet } from "react-router";

const DefaultLayout: React.FC = () => {
  return (
    <main className="h-full max-w-screen-2xl mx-auto content-center p-4 md:p-6 2xl:p-10">
      <div className="sm:max-w-md mx-auto bg-white dark:bg-black/50 backdrop-blur-3xl rounded-2xl shadow-lg dark:border-gray-700 p-4 sm:p-8">
        <Outlet />
      </div>
    </main>
  );
};

export default DefaultLayout;
