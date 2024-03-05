const express = require("express");
const cors = require("cors");
const user = require("./Routes/post/user");
const login = require("./Routes/post/login");
const createProduct = require("./Routes/post/create_product");
const getUser = require("./Routes/get/getUser");
const salary = require("./Routes/post/salary");
const productDetails = require("./Routes/post/productdetail");
const getProduct = require("./Routes/get/get_products");
const exp = require("./Routes/post/exp");
const notice = require("./Routes/post/notice");
const vendor = require("./Routes/post/vendor");
const sales = require("./Routes/post/sales");
const customer = require("./Routes/post/custmer");
const duser = require("./Routes/delete/duser");
const update_u = require("./Routes/update/update_user");
const getCustomers = require("./Routes/get/getCustomers");
const getVendors = require("./Routes/get/getVendor");
const dproduct = require("./Routes/delete/dproduct");
const getSalary = require("./Routes/get/get_salary");
const getExp = require("./Routes/get/get_exp");
const getMiscellaneous = require("./Routes/get/get_miscellaneous");
const getSales = require("./Routes/get/get_sales");
const dCustomer = require("./Routes/delete/d_customer");
const dSales = require("./Routes/delete/d_sales");
const getNotice = require("./Routes/get/get_notice");
const dVendor = require("./Routes/delete/d_vendor");
const dExp = require("./Routes/delete/d_exp");
const update_exp = require("./Routes/update/update_exp");
const updateProduct = require("./Routes/update/update_product");

const app = express();
app.use(express.json());
app.use(cors());
app.use(user);
app.use(login);
app.use(createProduct);
app.use(getUser);
app.use(salary);
app.use(productDetails);
app.use(getProduct);
app.use(exp);
app.use(notice);
app.use(vendor);
app.use(sales);
app.use(customer);
app.use(duser);
app.use(update_u);
app.use(getCustomers);
app.use(getVendors);
app.use(dproduct);
app.use(getSalary);
app.use(getExp);
app.use(getMiscellaneous);
app.use(getSales);
app.use(dCustomer);
app.use(dSales);
app.use(getNotice);
app.use(dVendor);
app.use(dExp);
app.use(update_exp);
app.use(updateProduct);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
