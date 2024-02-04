// Layout.js
import { Outlet } from "react-router-dom";
import Feature from "./Feature";
import { IoIosNotifications } from "react-icons/io";
import { Button } from "@/components/ui/button";
// import React, { PureComponent } from "react";
const DashboardLayout = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex">
        <div className="bg-gray-800 text-white w-64 flex-shrink-0 h-auto overflow-y-auto">
          {/* sidebar */}

          <Feature />
        </div>
        <div className="w-[85%] bg-white over">
          <main>
            {/* Main content */}
            <div className="bg-white h-16 flex flex-wrap justify-between shadow-lg ">
              {/* Navbar Fixed content notification*/}
              <div className="items-center">
                <Button className="ml-4 mt-3">Add Product</Button>
              </div>
              <div className="flex gap-4 mr-10 items-center">
                <span className="text-3xl">
                  <IoIosNotifications />
                </span>
                <div className="bg-black w-10 h-10 rounded-full"></div>
              </div>
            </div>
            {<Outlet />}
            <div className="bg-sky-950 h-20 text-center relative bottom-0 right-0 text-white">
              <h1 className="text-center mt-10 pt-4">
                {" "}
                2024 Copyright MSP Solution All Reserved
              </h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
