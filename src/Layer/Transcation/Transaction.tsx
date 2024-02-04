import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const Transaction = () => {
  return (
    <>
      <div>
        <h1 className="text-xl mt-4 ml-10">Transaction/ Cash Receivable</h1>
        <a className="ml-8 text-blue-500" href="#">
          Dashboard
        </a>
        / Transaction
        <div className="bg-white w-[100%] h-screen">
          <div>
            <div className="flex mx-auto">
              <div className="w-[45%]">
                <div className="flex gap-20 mt-4">
                  <h1 className="ml-4">Search Customer:</h1>
                  <Input
                    type="text"
                    placeholder="search Customer"
                    className="w-80"
                  />
                </div>
                <div className="ml-60">
                  <h1 className="mt-4"> Payment Details:</h1>
                  <p className="mt-1">Customers:</p>
                  <p className="mt-1"> mobile: </p>
                  <p className="mt-1">Billing Address:</p>
                  <p className="mt-1">Customers:</p>
                </div>
                <div className="ml-60">
                  <hr className="bg-red-500 w-80 h-[2px] mt-4" />
                  <p className="mt-1"> Total Amount:</p>
                  <p className="mt-1">Paid Amount:</p>
                  <hr className="bg-red-500 w-80 h-[2px] mt-4" />
                  <p className="mt-4">Remaing Amount:</p>
                </div>
                <div className="flex gap-20 ml-6 mt-3">
                  <h1>Cash Received:</h1>
                  <Input
                    type="text"
                    placeholder="cash received"
                    className="w-80 ml-8"
                  />
                </div>
                <div className="flex gap-20 ml-6 mt-3">
                  <label className="gap-20 mt-1 ">
                    payment Type:
                    <select
                      name="selectedFruit"
                      className="ml-28 w-80 py-2 rounded border border-l-amber-500"
                    >
                      <option value="apple">Cash</option>
                      <option value="banana">Bank</option>
                      <option value="orange">Cheaque</option>
                    </select>
                  </label>
                </div>
                <div className="flex gap-20 ml-6 mt-4">
                  <h1>Date:</h1>
                  <Input type="date" placeholder="" className="w-80 ml-24" />
                </div>
                <div className="ml-60 mt-2">
                  <Input
                    type="text"
                    placeholder="payment Type Reference code"
                    className="w-80"
                  />
                  <Button className="mt-4">Cash Received</Button>
                </div>
              </div>

              <div className="mt-36 w-[100%] ml-10">
                <h1 className="ml-10 text-center mb-10 text-3xl">
                  {" "}
                  Account Balance:
                </h1>
                <div className="flex ml-0 gap-4">
                  <div className="bg-green-500 w-[31%] shadow- block rounded h-20">
                    <h1 className="text-center  text-xl font-smibold">
                      Cash Amount
                    </h1>
                    <p className="text-center mt-1 text-2xl font-bold">
                      Rs:3223232132
                    </p>
                  </div>
                  <div className="bg-red-500 w-[31%] shadow- block rounded h-20">
                    <h1 className="text-center  text-xl font-smibold">
                      Cheque Amount
                    </h1>
                    <p className="text-center mt-1 text-2xl font-bold">
                      Rs:3223232132
                    </p>
                  </div>
                  <div className="bg-green-500 w-[31%] shadow- block rounded h-20">
                    <h1 className="text-center  text-xl font-smibold">
                      {" "}
                      Bank Account
                    </h1>
                    <p className="text-center mt-1 text-2xl font-bold">
                      Rs:3223232132
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
