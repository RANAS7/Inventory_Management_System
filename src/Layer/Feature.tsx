import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CiBellOn } from "react-icons/ci";

import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FiBarChart } from "react-icons/fi";
import { PiUsersFourBold } from "react-icons/pi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
const Feature = () => {
  return (
    <>
      <div className=" text-[17px] md:ml-10  font-serif h-[100vh]">
        <ul className="space-y-2 mt-4 ">
          <li className="flex gap-2 items-center">
            <MdDashboard />
            <Link to="">Dashboard</Link>
          </li>
          <li className="text-center flex gap-2 items-center">
            <SupplierForm
              name="/AddSupplier"
              link="/addsupplier"
              subMenu={[
                { name: "Supplier List", link: "SupplierList" },
                { name: "Add Supplier", link: "AddSupplier" },
              ]}
            />
          </li>
          <li className=" text-center flex gap-2 items-center">
            <PurchaseBill
              name="/user"
              link="/user"
              subMenu={[
                { name: "Purchase Product", link: "productList" },
                { name: "Create Product Bill", link: "PurchaseBill" },
              ]}
            />
          </li>
          <li className="text-center flex gap-2 items-center">
            <ProductList
              name="/user"
              link="/user"
              subMenu={[
                { name: "All Product", link: "product" },
                { name: "Create Product", link: "createproduct" },
              ]}
            />
          </li>
          <li className="text-center flex gap-2 items-center">
            <CustomerForm
              name="/AddSupplier"
              link="/addsupplier"
              subMenu={[
                { name: "Customer List", link: "AllCustomer" },
                { name: "Add Customer", link: "AddCustomer" },
                { name: "credit Customer", link: "CreditCustomer" },
              ]}
            />
          </li>
          <li className="text-center flex gap-2 items-center">
            <SaleBill
              name="/AddSupplier"
              link="/addsupplier"
              subMenu={[
                { name: "All bill", link: "AllBill" },
                { name: "Add Bill", link: "addbill" },
                { name: "Unpaid Bill", link: "UnpaidBill" },
              ]}
            />
          </li>
          <li className=" flex gap-2 items-center">
            <FaMoneyBillTrendUp />
            <Link to="transaction">Transaction</Link>
          </li>
          <li className="text-center flex gap-2 items-center">
            <Expense
              name="/User"
              link="/user"
              subMenu={[
                { name: "expense", link: "AddExpenses" },
                { name: "expense bill", link: "ExpenseBill" },
              ]}
            />
          </li>
          <li className="text-center flex gap-2 items-center">
            <AddStaff
              name="/User"
              link="/user"
              subMenu={[
                { name: "Staff List", link: "ListStaff" },
                { name: "Add Staff", link: "AddStaff" },
              ]}
            />
          </li>

          <li className="text-center flex gap-2 items-center">
            <Report
              name="/User"
              link="/user"
              subMenu={[
                { name: "Profit & Loss", link: "ProfitLoss" },
                { name: "Sales Report", link: "SalesReport" },
              ]}
            />
          </li>

          <li className="flex gap-4 items-center">
            <CiBellOn />
            <a href="">Notice</a>
          </li>
          {/* <li className="flex gap-2 items-center">
            <SidebarSubMenuList
              name="/user"
              link="/user"
              subMenu={[
                { name: "Suppliers", link: "Suppliers" },
                { name: "Client", link: "client" },
              ]}
            />
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Feature;

interface DropDownType {
  link: string;
  name: string;
  subMenu?: DropDownType[];
}
function SupplierForm(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0 ">
          <div className="flex items-center gap-4">
            <FaUserFriends className="" values="" />
            <AccordionTrigger className="gap-[78px] ">
              {" "}
              Supplier
            </AccordionTrigger>
          </div>
          {subMenu?.map((user) => {
            return (
              <>
                <div>
                  <AccordionContent className="">
                    <Link
                      className="no-underline"
                      to={`/dashboard/${user?.link}`}
                    >
                      {user?.name}
                    </Link>
                  </AccordionContent>
                </div>
              </>
            );
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
function PurchaseBill(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <div className="flex items-center gap-4">
            <LiaFileInvoiceSolid />
            <AccordionTrigger className="gap-10">
              Purchase Bill
            </AccordionTrigger>
          </div>
          {subMenu?.map((user) => {
            return (
              <>
                <div>
                  <AccordionContent>
                    <Link className="" to={`/dashboard/${user?.link}`}>
                      {user?.name}
                    </Link>
                  </AccordionContent>
                </div>
              </>
            );
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
function ProductList(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <div className="flex items-center gap-4">
            <FaCartPlus />
            <AccordionTrigger className="gap-16">Inventory</AccordionTrigger>
          </div>
          {subMenu?.map((user) => {
            return (
              <>
                <div>
                  <AccordionContent>
                    <Link className="" to={`/dashboard/${user?.link}`}>
                      {user?.name}
                    </Link>
                  </AccordionContent>
                </div>
              </>
            );
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function Sidebarmenu(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <div className="flex items-center flex-2">
            {" "}
            <AccordionTrigger>Balance</AccordionTrigger>
          </div>
          {subMenu?.map((user) => {
            return (
              <>
                <div>
                  <AccordionContent>
                    <Link className="text-xl" to={`/dashboard/${user?.link}`}>
                      {user?.name}
                    </Link>
                  </AccordionContent>
                </div>
              </>
            );
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function CustomerForm(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <div className="flex items-center gap-4">
            <PiUsersFourBold />{" "}
            <AccordionTrigger className="gap-16">Customer</AccordionTrigger>
          </div>
          {subMenu?.map((user) => {
            return (
              <>
                <div>
                  <AccordionContent>
                    <Link className="" to={`/dashboard/${user?.link}`}>
                      {user?.name}
                    </Link>
                  </AccordionContent>
                </div>
              </>
            );
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
function SaleBill(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <div className="flex items-center gap-4">
            {" "}
            <GiReceiveMoney />
            <AccordionTrigger className="gap-[107px]">Sale</AccordionTrigger>
          </div>
          {subMenu?.map((user) => {
            return (
              <>
                <div>
                  <AccordionContent>
                    <Link className="" to={`/dashboard/${user?.link}`}>
                      {user?.name}
                    </Link>
                  </AccordionContent>
                </div>
              </>
            );
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
function Expense(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <div className="flex items-center gap-4">
            <LiaFileInvoiceSolid />
            <AccordionTrigger className="gap-[75px]">Expense</AccordionTrigger>
          </div>
          {subMenu?.map((user) => {
            return (
              <>
                <div>
                  <AccordionContent>
                    <Link className="" to={`/dashboard/${user?.link}`}>
                      {user?.name}
                    </Link>
                  </AccordionContent>
                </div>
              </>
            );
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function AddStaff(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <div className="flex items-center gap-4">
            <PiUsersFourBold />
            <AccordionTrigger className="gap-[103px]">Staff</AccordionTrigger>
          </div>
          {subMenu?.map((user) => {
            return (
              <>
                <div>
                  <AccordionContent>
                    <Link className="" to={`/dashboard/${user?.link}`}>
                      {user?.name}
                    </Link>
                  </AccordionContent>
                </div>
              </>
            );
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function Report(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <div className="flex items-center gap-4">
            <FiBarChart />
            <AccordionTrigger className="gap-[87px]">Report</AccordionTrigger>
          </div>
          {subMenu?.map((user) => {
            return (
              <>
                <div>
                  <AccordionContent>
                    <Link className="" to={`/dashboard/${user?.link}`}>
                      {user?.name}
                    </Link>
                  </AccordionContent>
                </div>
              </>
            );
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
