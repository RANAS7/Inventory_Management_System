import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const invoices = [
  {
    sn: "1",
    date: "2081-02-15",
    createdby: "Accountant",
    amount: "Rs 10000",
    expensetype: "salary",
    paymenttype: "cash",
    detail: "salary expenses",
    option: [
      <button className="bg-green-500 m-3 w-24 items-center rounded-sm">
        View
      </button>,
      <button className="bg-white  w-12 items-center rounded-sm">Edit</button>,
      <button className="bg-red-700  w-12 items-center rounded-sm">
        Delete
      </button>,
    ],
  },
];

export function ExpenseBill() {
  return (
    <div>
      <h1 className="text-xl mt-4 ml-10">Expense Bill List</h1>
      <a className="ml-8 text-blue-500" href="#">
        Dashboard
      </a>
      /Expense List
      <div>
        <Input
          className="w-96 ml-[850px] mb-10"
          type="text"
          placeholder="search"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">created By</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Expense Type</TableHead>
            <TableHead className="text-center">Payment Type</TableHead>
            <TableHead className="text-center">Details</TableHead>
            <TableHead className="text-center">Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.sn}>
              <TableCell className="font-medium">{invoice.sn}</TableCell>
              <TableCell className="text-center">{invoice.date}</TableCell>
              <TableCell className="text-center">{invoice.createdby}</TableCell>

              <TableCell className="text-center">{invoice.amount}</TableCell>
              <TableCell className="text-center">
                {invoice.expensetype}
              </TableCell>
              <TableCell className="text-center">
                {invoice.paymenttype}
              </TableCell>
              <TableCell className="text-center">{invoice.detail}</TableCell>
              <TableCell className="text-center">{invoice.option}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default ExpenseBill;
