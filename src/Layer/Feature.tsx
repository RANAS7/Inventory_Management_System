import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";

import { MdDashboard, MdOutlineInventory2 } from "react-icons/md";
import { Link } from "react-router-dom";
const Feature = () => {
  return (
    <>
      <div className="ml-10  font-serif ">
        <ul className="space-y-2 mt-4 ">
          <li className="flex gap-2 items-center">
            <MdDashboard />
            <Link to="">Dashboard</Link>
          </li>
          <li className="flex gap-2 items-center">
            <SupplierForm
              name="/AddSupplier"
              link="/addsupplier"
              subMenu={[
                { name: "Supplier List", link: "SupplierList" },
                { name: "Add Supplier", link: "AddSupplier" },
              ]}
            />
          </li>
          <li className="flex gap-2 items-center">
            <PurchaseBill
              name="/user"
              link="/user"
              subMenu={[
                { name: "Purchase Product", link: "productList" },
                { name: "Create Product Bill", link: "PurchaseBill" },
              ]}
            />
          </li>
          <li className="flex gap-2 items-center">
            <ProductList
              name="/user"
              link="/user"
              subMenu={[
                { name: "All Product", link: "product" },
                { name: "Create Product", link: "createproduct" },
              ]}
            />
          </li>
          <li className="flex gap-2 items-center">
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
          <li className="flex gap-2 items-center">
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
          <li className="flex gap-2 items-center">
            <Link to="dashboard/transaction">Transaction</Link>
          </li>
          <li className="flex gap-2 items-center">
            <Expense
              name="/User"
              link="/user"
              subMenu={[
                { name: "expense", link: "AddExpenses" },
                { name: "expense bill", link: "ExpenseBill" },
              ]}
            />
          </li>
          <li className="flex gap-2 items-center">
            <AddStaff
              name="/User"
              link="/user"
              subMenu={[
                { name: "Staff List", link: "ListStaff" },
                { name: "Add Staff", link: "AddStaff" },
              ]}
            />
          </li>
          {/* <li className="flex gap-2 items-center">
            <a href="">Setting</a>
          </li> */}
          {/* <li className="flex gap-2 items-center">
            <PurchaseList
              name="/user"
              link="/user"
              subMenu={[
                { name: "All Purchase", link: "purchase" },
                { name: "Create Purchase", link: "" },
              ]}
            />
          </li> */}
          {/* <li className="flex gap-2 items-center">
            <Sidebarmenu
              name="/User"
              link="/user"
              subMenu={[
                { name: "Cash", link: "Suppliers" },
                { name: "Wallet", link: "client" },
                { name: "Cheque", link: "client" },
              ]}
            />
          </li> */}
          <li className="flex gap-2 items-center">
            <Report
              name="/User"
              link="/user"
              subMenu={[
                { name: "Profit & Loss", link: "ProfitLoss" },
                { name: "Sales Report", link: "SalesReport" },
              ]}
            />
          </li>

          <li className="flex gap-2 items-center">
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

// function SidebarSubMenuList(props: DropDownType) {
//   const { subMenu } = props;
//   return (
//     <div>
//       <Accordion type="single" collapsible className="w-full">
//         <AccordionItem value="item-1">
//           <AccordionTrigger>User</AccordionTrigger>
//           {/* <AccordionContent>
//             <Link to={`/dashboard/${link}`}>{name}</Link>
//           </AccordionContent> */}

//           {subMenu?.map((user) => {
//             return (
//               <>
//                 <div>
//                   <AccordionContent>
//                     <Link className="text-xl" to={`/dashboard/${user?.link}`}>
//                       {user?.name}
//                     </Link>
//                   </AccordionContent>
//                 </div>
//               </>
//             );
//           })}
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }
function Sidebarmenu(props: DropDownType) {
  const { name, link, subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Balance</AccordionTrigger>
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
function ProductList(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Inventory</AccordionTrigger>
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
// function PurchaseList(props: DropDownType) {
//   const { subMenu } = props;
//   return (
//     <div>
//       <Accordion type="single" collapsible className="w-full">
//         <AccordionItem value="item-1">
//           <AccordionTrigger>Purchase</AccordionTrigger>
//           {subMenu?.map((user) => {
//             return (
//               <>
//                 <div>
//                   <AccordionContent>
//                     <Link className="" to={`/dashboard/${user?.link}`}>
//                       {user?.name}
//                     </Link>
//                   </AccordionContent>
//                 </div>
//               </>
//             );
//           })}
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }
function SupplierForm(props: DropDownType) {
  const { name, link, subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Supplier</AccordionTrigger>
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
function CustomerForm(props: DropDownType) {
  const { name, link, subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Customer</AccordionTrigger>
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
        <AccordionItem value="item-1">
          <AccordionTrigger>Sale</AccordionTrigger>
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
function PurchaseBill(props: DropDownType) {
  const { subMenu } = props;
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Purchase Bill</AccordionTrigger>
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
        <AccordionItem value="item-1">
          <AccordionTrigger>Staff</AccordionTrigger>
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
        <AccordionItem value="item-1">
          <AccordionTrigger>Report</AccordionTrigger>
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
        <AccordionItem value="item-1">
          <AccordionTrigger>Expense</AccordionTrigger>
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
