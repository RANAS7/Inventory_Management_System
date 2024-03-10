import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Layer/Dashboard";
import DashboardLayout from "./Layer/Dashboardlayout";
import Layout from "./Layer/Layout";
import Client from "./Layer/Client";
import Product from "./Layer/product/Product";
import CreateProudct from "./Layer/product/CreateProudct";
import ProductDetails from "./Layer/product/ProductDetails";
import Allpurchase from "./Layer/Purchase/ProductList";
import AddSupplier from "./Layer/supplier/AddSupplier";
import SupplierList from "./Layer/supplier/SupplierList";
import CreditCustomer from "./Layer/customer/CreditCustomer";
import AddBill from "./Layer/sale/AddBill";
import AllCustomer from "./Layer/customer/AllCustomer";
import AddCustomer from "./Layer/customer/AddCustomer";
import { AllBill } from "./Layer/sale/AllBill";
import UnpaidBill from "./Layer/sale/UnpaidBill";
import PurchaseBill from "./Layer/Purchase/PurchaseBill";
import ProductList from "./Layer/Purchase/ProductList";
import AddStaff from "./Layer/staff/AddStaff";
import ListStaff from "./Layer/staff/ListStaff";
import ProfitLoss from "./Layer/reportt/ProfitLoss";
import SalesReport from "./Layer/reportt/SalesReport";
import ExpenseBill from "./Layer/Expenses/ExpenseBill";
import AddExpenses from "./Layer/Expenses/AddExpenses";
import Transaction from "./Layer/Transcation/Transaction";
import Login from "./components/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        // Dashboard Content
      },
      {
        path: "transaction",
        element: <Transaction />,
        // Dashboard Content
      },
      {
        path: "supplierlist",
        element: <SupplierList />,
        // Add Supplier form
      },
      {
        path: "addsupplier",
        element: <AddSupplier />,
        // Add Supplier form
      },
      {
        path: "AllCustomer",
        element: <AllCustomer />,
        // Add Supplier form
      },
      {
        path: "AddCustomer",
        element: <AddCustomer />,
        // Add Supplier form
      },
      {
        path: "CreditCustomer",
        element: <CreditCustomer />,

        // criditcustomer
      },
      {
        path: "addBill",
        element: <AddBill />,

        //add invoices
      },
      {
        path: "AllBill",
        element: <AllBill />,

        //add invoices
      },
      {
        path: "UnpaidBill",
        element: <UnpaidBill />,

        //add invoices
      },
      {
        path: "client",
        element: <Client />,
        // loader: teamLoader,
      },
      {
        path: "PurchaseBill",
        element: <PurchaseBill />,
        // loader: teamLoader,
      },
      {
        path: "ProductList",
        element: <ProductList />,
        // loader: teamLoader,
      },

      {
        path: "products",
        element: <ProductDetails />,
        // loader: teamLoader,
      },
      {
        path: "product",
        element: <Product />,
        // loader: teamLoader,
      },
      {
        path: "CreateProduct",
        element: <CreateProudct />,
        // loader: teamLoader,
      },
      {
        path: "purchase",
        element: <Allpurchase />,
        // loader: teamLoader,
      },
      {
        path: "AddStaff",
        element: <AddStaff />,
        // loader: teamLoader,
      },
      {
        path: "ListStaff",
        element: <ListStaff />,
        // loader: teamLoader,
      },
      {
        path: "SalesReport",
        element: <SalesReport />,
        // loader: teamLoader,
      },
      {
        path: "ProfitLoss",
        element: <ProfitLoss />,
        // loader: teamLoader,
      },
      {
        path: "AddExpenses",
        element: <AddExpenses />,
        // loader: teamLoader,
      },
      {
        path: "expensebill",
        element: <ExpenseBill />,
        // loader: teamLoader,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
