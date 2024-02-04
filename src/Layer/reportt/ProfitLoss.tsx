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
    date: "2081-02-15",
    refno: "INVO6",
    productname: "Hari",
    quantity: "10",
    supplierprice: "Rs 5000",
    saleprice: "5000",
    discount: "Rs 5000",
    profit: "Rs 2000",
  },
];

export function ProfitLoss() {
  return (
    <div>
      <h1 className="text-xl mt-4 ml-10">Profit & Loss</h1>
      <a className="ml-8 text-blue-500" href="#">
        Dashboard
      </a>
      / Sales Report
      <div className="ml-10">
        <h1 className="text-center text-xl">Profit & loss Ledger data</h1>
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
            <TableHead className="text-center">Date</TableHead>

            <TableHead className="text-center">Ref No.</TableHead>
            <TableHead className="text-center">Product Name</TableHead>

            <TableHead className="text-center">Quantity</TableHead>

            <TableHead className="text-center">Supplier Price</TableHead>
            <TableHead className="text-center">Sale Price</TableHead>
            <TableHead className="text-center">Discount</TableHead>
            <TableHead className="text-center">Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.sn}>
              <TableCell className="font-medium">{invoice.sn}</TableCell>
              <TableCell className="text-center">{invoice.date}</TableCell>
              <TableCell className="text-center">{invoice.refno}</TableCell>
              <TableCell className="text-center">
                {invoice.productname}
              </TableCell>

              <TableCell className="text-center">{invoice.quantity}</TableCell>
              <TableCell className="text-center">
                {invoice.supplierprice}
              </TableCell>
              <TableCell className="text-center">{invoice.saleprice}</TableCell>
              <TableCell className="text-center">{invoice.discount}</TableCell>
              <TableCell className="text-center">{invoice.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default ProfitLoss;
