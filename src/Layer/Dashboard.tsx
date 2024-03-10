import { Button } from "@/components/ui/button";
import { PieChart, Pie } from "recharts";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";

const data = [
  {
    name: "Page A",
    sale: 4000,
    purchase: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    sale: 4000,
    purchase: 2400,
    amt: 2210,
  },
  {
    name: "Page C",
    sale: 4000,
    purchase: 2400,
    amt: 2290,
  },
  {
    name: "Page D",
    sale: 4000,
    purchase: 2400,
    amt: 2000,
  },
  {
    name: "Page E",
    sale: 4000,
    purchase: 2400,
    amt: 2181,
  },
  {
    name: "Page F",
    sale: 4000,
    purchase: 2400,
    amt: 2500,
  },
];
const Dashboard = () => {
  return (
    <>
      <div className="bg-sky- w-[100%]">
        <div className="md:flex  gap-1 content-center">
          <div className=" flex text-center  bg--500 mt-1  md:w-[25%] w-[100%]  justify-center items-center shadow-lg rounded h-20">
            <div>
              {" "}
              <span className="text-5xl text-indigo-600">
                <MdOutlineAttachMoney />
              </span>
            </div>
            <div className="">
              <h1 className="font-semibold">Cash Amount</h1>
              <p className="font-bold text-2xl text-green-600">
                {" "}
                RS 2521531351
              </p>
            </div>
          </div>
          <div className=" flex text-center  bg--500 mt-1  md:w-[25%] w-[100%]  justify-center items-center shadow-lg rounded h-20">
            <div>
              {" "}
              <span className="text-5xl text-indigo-600">
                <MdOutlineAttachMoney />
              </span>
            </div>
            <div>
              <h1 className="font-semibold">Bank Account</h1>
              <p className="font-bold text-2xl text-green-600">
                {" "}
                RS 2521531351
              </p>
            </div>
          </div>
          <div className="flex text-center  bg--500 mt-1  md:w-[25%] w-[100%]  justify-center items-center shadow-lg rounded h-20">
            <div>
              {" "}
              <span className="text-5xl text-indigo-600">
                <MdOutlineAttachMoney />
              </span>
            </div>
            <div>
              <h1 className="font-semibold">Cash Amount</h1>
              <p className="font-bold text-2xl text-red-500"> RS 2521531351</p>
            </div>
          </div>
          <div className="flex mt-1  md:w-[25%]  md:justify-center content-center items-center shadow-lg  rounded h-20 ">
            <Link to="transaction">
              {" "}
              <Button className="ml-64 md:ml-0  "> Create Transaction</Button>
            </Link>
          </div>
        </div>
        <div className="md:flex mt-10 gap-6 ml-10 content-center">
          <div className=" bg-white mt-1 md:w-[40%] w-[100%]  justify-center items-center shadow-lg  rounded h-80">
            <h1 className="text-center text-2xl font-semibold">
              Recent purchase
            </h1>
          </div>
          <div className=" bg-white mt-1 md:w-[40%] w-[100%]  justify-center items-center shadow-lg  rounded h-80">
            <h1 className="text-center font-semibold text-2xl">Recent sale</h1>
          </div>
          <div className=" text-center  md:mt-1 mt-6 ml-0  md:w-[20%]  justify-center items-center shadow-lg  rounded md:h-80 h-56">
            <div className="text-center justify-center items-center ml-4   ">
              <div className="flex   gap-4 text-2xl font-semibold text-blue-600 py-2 md:ml-0 ml-48">
                <span>
                  {" "}
                  <FaUsers className="md:text-center text-2xl " />
                </span>
                <h1 className="md:text-zinc-400  ">Total Supplier</h1>
              </div>
              <span className="text-3xl text-black font-semibold">100</span>
            </div>
            <div>
              <div className="text-center justify-center items-center ml-4  ">
                <div className="flex gap-4 text-2xl font-semibold text-blue-600 py-2 mt-7 md:ml-0 ml-48 ">
                  <span>
                    {" "}
                    <FaUsers className="md:text-center text-2xl" />
                  </span>
                  <h1 className="md:text-zinc-400">Total Customer</h1>
                </div>
                <span className="md:text-3xl text-black font-semibold">
                  100
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex mt-10 gap-4 ml-2 content-center">
          <div className="flex  mt-1  md:w-[35%]  justify-center items-center shadow-lg  rounded h-96">
            <PieChart width={400} height={400}>
              <Pie
                data={data01}
                dataKey="value"
                cx={200}
                cy={200}
                outerRadius={60}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                cx={200}
                cy={200}
                innerRadius={70}
                outerRadius={90}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </div>
          <div className=" bg-white mt-1 md:w-[63%] w-[100%] text  justify-center items-center shadow-lg rounded h-96">
            <h1 className="text-center text-3xl font-semibold">
              {" "}
              Differences{" "}
            </h1>
            <BarChart
              className="ml-36"
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="purchase" fill="#8884d8" />
              <Bar dataKey="sale" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
