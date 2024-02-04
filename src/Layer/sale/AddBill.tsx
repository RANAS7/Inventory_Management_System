import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Item {
  name: string;
  availableQty: number;
  quantity: number;
  rate: number;
  discount: number;
  total: number;
}

const Table: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    name: "",
    availableQty: 0,
    quantity: 0,
    rate: 0,
    discount: 0,
    total: 0,
  });
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [totalDue, setTotalDue] = useState<number>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Item
  ) => {
    setNewItem({ ...newItem, [key]: e.target.value });
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({
      name: "",
      availableQty: 0,
      quantity: 0,
      rate: 0,
      discount: 0,
      total: 0,
    });
  };

  React.useEffect(() => {
    let totalDiscount = 0;
    let grandTotal = 0;

    items.forEach((item) => {
      const itemTotal = item.quantity * item.rate - item.discount;
      grandTotal += itemTotal;
      totalDiscount += item.discount;
    });

    const totalDue = grandTotal - paidAmount;
    setTotalDiscount(totalDiscount);
    setGrandTotal(grandTotal);
    setTotalDue(totalDue);
  }, [items, paidAmount]);
  const [supplier, setSupplier] = useState<string>("");

  return (
    <div className="bg-violet-200 h-screen">
      <h1 className="text-xl mt-4 ml-10">Add Sale bill</h1>
      <a className="ml-8 text-blue-500" href="#">
        Dashboard
      </a>
      / Add Bill
      <div className="bg-white shadow-2xl">
        <div className="">
          <div className="flex gap-10 my-12  mb-4">
            <label
              className="block   text-gray-700 font-bold mt-10"
              htmlFor="email"
            >
              Customer Name*
            </label>
            <input
              type="email"
              id="email"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="form-input mt-10 py-2 border w-96 "
            />
          </div>
        </div>
        <div className="flex gap-40 mt-4 mb-6">
          <div className="">
            <div className="flex gap-10  mb-4">
              <label
                className="block text-gray-700 font-bold mb-2 ml-10"
                htmlFor="email"
              >
                Date*
              </label>
              <input
                type="date"
                id="email"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="form-input w-96 py-2 border"
              />
            </div>
          </div>
          <div className="relative">
            <Button>New Customer</Button>
          </div>
        </div>
        <div>
          <hr
            className="w-[1250px]  mb-8 mx-4
           bg-red-600 h-[3px]"
          />
        </div>

        <table className="border px-4 py-2 mr-2">
          <thead>
            <tr className="gap-10 text-sm">
              <th className="pl-4 ">Item Information</th>
              <th className="pl-28 ">Available Qty</th>
              <th className="pl-32">Quantity</th>
              <th className=" pl-32">Rate</th>
              <th className="pl-36">Discount</th>
              <th className=" pl-40">Total</th>
              <th className="pl-24">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border  ">{item.name}</td>
                <td className="border  ">{item.availableQty}</td>
                <td className="border  ">{item.quantity}</td>
                <td className="border  ">{item.rate}</td>
                <td className="border  ">{item.discount}</td>
                <td className="border  ">
                  {item.quantity * item.rate - item.discount}
                </td>
                <td className="border  ">{item.total}</td>
                <td className="border  ">Action Buttons</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Item Information"
            value={newItem.name}
            onChange={(e) => handleChange(e, "name")}
            className="border px-4 py-2 mr-2 "
          />
          <input
            type="number"
            placeholder="Available Qty"
            value={newItem.availableQty}
            onChange={(e) => handleChange(e, "availableQty")}
            className="border py-2 mr-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => handleChange(e, "quantity")}
            className="border  py-2 mr-2"
          />
          <input
            type="number"
            placeholder="Rate"
            value={newItem.rate}
            onChange={(e) => handleChange(e, "rate")}
            className="border py-2 mr-2"
          />
          <input
            type="number"
            placeholder="Discount"
            value={newItem.discount}
            onChange={(e) => handleChange(e, "discount")}
            className="border py-2 mr-2"
          />
          <input
            type="number"
            placeholder="total"
            value={newItem.total}
            onChange={(e) => handleChange(e, "total")}
            className="border px-4 py-2 mr-2"
          />
          <button onClick={handleAddItem} className="">
            Add Item
          </button>
        </div>
        <div className="mt-4  ml-[900px] ">
          <div className=" top-0 right-0">
            <label>Total Discount: </label>
            <span>{totalDiscount}</span>
          </div>
          <div>
            <label>Grand Total: </label>
            <span>{grandTotal}</span>
          </div>
          <div>
            <label>Paid Amount: </label>
            <input
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(parseFloat(e.target.value))}
              className="border px-4 py-2 mr-2"
            />
          </div>
          <div className="flex gap-2 text-center">
            <label className="text-center mt-2">Payment Type: </label>
            <select
              name="selectedFruit"
              className=" w-52 text-center py-1 mt-2 rounded border border-l-amber-500"
            >
              <option value="apple">choose Payment Method</option>
              <option value="apple">Cash</option>
              <option value="banana">Bank</option>
              <option value="orange">Cheaque</option>
            </select>
          </div>
          <div className="pb-10">
            <label>Total Due: </label>
            <span>{totalDue}</span>
          </div>
        </div>
        <Button className="ml-96 mb-4 w-24">save</Button>
      </div>
    </div>
  );
};

export default Table;
