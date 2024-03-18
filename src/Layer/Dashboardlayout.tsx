// Layout.js
import { Outlet } from "react-router-dom";
import Feature from "./Feature";
import { IoIosNotifications } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = () =>
toast("notification bar here", {
  position: "top-right",
  autoClose: false,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});
toast("notification bar here");
const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const handleSidebar = () => {
    setOpen(!open);
  };
 

  return ( 
    <div className="flex flex-col w-full h-screen ">
      <div className="flex">
        <div
          className={` ${
            open ? " inline absolute" : ""
          }flex-shrink-0  bg-gray-800 text-white w-64 h-auto overflow-y-auto`}
        >
          <Feature />
        </div>
        <div className="md:w-[85%] bg-gray-200  ">
          <main>
            <div className="bg-Indigo-200 w-[100%]  h-16 flex flex-wrap md:justify-between shadow-lg gap-10 ">
              <span
                className="md:hidden text-3xl ml-10 flex justify-between items-center"
                onClick={handleSidebar}
              >
                {!open ? <IoMdMenu /> : <IoMdMenu />}
              </span>
              <div className="items-center">
                <Button className="md:ml-4 mt-3">Add Product</Button>
              </div>
              <div className="flex gap-10 md:mr-10 items-center">
                <span className="text-3xl">
                  <IoIosNotifications onClick={notify}  />
                </span>
                <div className="bg-black w-10 h-10 rounded-full">
                  <img className="rounded-full" src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg" alt="" />
                </div>
        
               
              </div>
            </div>
            {<Outlet />}
            <div className="  bg-sky-950 h-16 text-center  bottom-0 right-0 text-white">
              <h1 className="text-center mt-10 pt-4">
                {" "}
                2024 Copyright MSP Solution All Reserved
              </h1>
            </div>
          </main>  
        </div>
      </div>
      <div className="">
<ToastContainer className={"mt-10"} />
</div> 
      
    </div>
  );
};

export default DashboardLayout;

enum PAYMENT {
  ONLINE = "ONLINE",
}
