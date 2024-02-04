import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const invoices = [
  {
    sn: "1",
    refno: "INVO6",
    customer: "Hari",
    date: "2081-02-15",
    totalamount: "Rs 10000",
    paidamount: "Rs 5000",
    remaingamount: "5000",
  },
];

export function SalesReport() {
  return (
    <div>
      <h1 className="text-xl mt-4 ml-10">Sales Report</h1>
      <a className="ml-8 text-blue-500" href="#">
        Dashboard
      </a>
      / Sales Report
      <div className="ml-10">
        <h1 className="text-center text-xl">Sale Ledger data</h1>
        <p> Date range</p>
      </div>
      <div className="flex text-center justify-center">
        <Input className="w-52 mb-10" type="text" placeholder="Date" />
        <Button>to</Button>
        <Input className="w-52 mb-10" type="text" placeholder="Date" />
        <Button>get</Button>
      </div>
      <div>
        <Input
          className="w-96 ml-[850px] mb-10"
          type="text"
          placeholder="search"
        />
      </div>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead className="text-center">Ref No.</TableHead>

            <TableHead className="text-center">Customer Name</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Total Amount</TableHead>
            <TableHead className="text-center">paid Amount</TableHead>
            <TableHead className="text-center">Remaing Amount</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default SalesReport;
