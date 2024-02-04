import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const AddExpenses = () => {
  return (
    <>
      <div>
        <h1 className="text-xl mt-4 ml-10">Expenses</h1>
        <a className="ml-8 text-blue-500" href="#">
          Dashboard
        </a>
        / Expenses
        <div className="bg-white w-[100%] h-screen">
          <div>
            <div className="flex mx-auto">
              <div className="w-[80%]">
                <div className="flex  ml-6 mt-4">
                  <h1>Date:</h1>
                  <Input type="date" placeholder="" className="w-80 ml-24" />
                </div>
                <div className="flex gap-16 mt-4">
                  <h1 className="ml-4">Created By:</h1>
                  <Input type="text" placeholder="name" className="w-80" />
                </div>
                <div className="flex gap-20 mt-4">
                  <h1 className="ml-4">Amount:</h1>
                  <Input type="text" placeholder="Amount" className="w-80" />
                </div>
                <div className="flex ml-6 mt-3">
                  <label className="gap-8 flex mt-1 ">
                    Expenses Type:
                    <select
                      name="selectedFruit"
                      className="ml- w- py-2 w-80 rounded border border-l-amber-500"
                    >
                      <option value="apple">choose option </option>
                      <option value="apple">Salary </option>

                      <option value="banana">Khaja</option>
                      <option value="orange">Miscellaneous</option>
                    </select>
                  </label>
                </div>
                <div className="flex ml-6 mt-3">
                  <label className="gap-8 flex mt-1 ">
                    Payment Type:
                    <select
                      name="selectedFruit"
                      className="ml- w- py-2 w-80 rounded border border-l-amber-500"
                    >
                      <option value="apple">choose option </option>
                      <option value="apple">cash</option>

                      <option value="banana">Bank Account</option>
                      <option value="orange">Cheque</option>
                    </select>
                  </label>
                </div>
                <div className="flex gap-24 mt-4">
                  <h1 className="ml-4">Details</h1>
                  <Input
                    type="text"
                    placeholder="expense details"
                    className="w-80"
                  />
                </div>
                <Button className="ml-52 mt-10 w-36">Save</Button>
              </div>

              <div className=" w-[100%] ml-10">
                <h1 className="ml-10 text-center mb-10 text-3xl">
                  {" "}
                  <Button>Add Expenses Type</Button>
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/* here */}
      </div>
    </>
  );
};

export default AddExpenses;
