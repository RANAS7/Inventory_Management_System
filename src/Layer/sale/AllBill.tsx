import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const invoices = [
  {
    sn: "1",
    refno: "INVO6",
    customer: "Hari",
    date: "2081-02-15",
    totalamount: "Rs 10000",
    paidamount: "Rs 5000",
    remaingamount: "5000",
    option: [
      <button className="bg-green-500 m-3 w-24 items-center rounded-sm">
        View
      </button>,
      <button className="bg-red-700  w-12 items-center rounded-sm">
        Delete
      </button>,
    ],
  },
];

export function AllBill() {
  return (
    <div className="md:h-[100vh] flex-col">
      <h1 className="text-xl mt-4 ml-10">Bill List</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      /Bill List
      <div>
        <Input
          className="w-96 md:ml-[850px] md:mb-10 mb-2 ml-20 mt-10"
          type="text"
          placeholder="search"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead className="text-center">Ref No.</TableHead>

            <TableHead className="text-center">customer</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Total Amount</TableHead>
            <TableHead className="text-center">paid Amount</TableHead>
            <TableHead className="text-center">Remaining Amount</TableHead>
            <TableHead className="text-center">Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.sn}>
              <TableCell className="font-medium">{invoice.sn}</TableCell>
              <TableCell className="text-center">{invoice.refno}</TableCell>
              <TableCell className="text-center">{invoice.customer}</TableCell>
              <TableCell className="text-center">{invoice.date}</TableCell>
              <TableCell className="text-center">
                {invoice.totalamount}
              </TableCell>
              <TableCell className="text-center">
                {invoice.paidamount}
              </TableCell>
              <TableCell className="text-center">
                {invoice.remaingamount}
              </TableCell>
              <TableCell className="text-center">{invoice.option}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default AllBill;
