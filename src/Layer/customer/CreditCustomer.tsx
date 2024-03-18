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

//sadcn Pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const invoices = [
  {
    sn: "1",
    customer: "Ram",
    phone: "rm@gmail.com",
    email: "9848555",
    tamount: "Rs 150000",
    pamount: "Rs 10000",
    ramount: "Rs 5000",
    option: [
      <button className="bg-green-500 m-3 w-24 items-center rounded-sm">
        View History
      </button>,
      <button className="bg-white  w-12 items-center rounded-sm">Edit</button>,
    ],
  },
  {
    sn: "2",
    customer: "Ram",
    phone: "rm@gmail.com",
    email: "9848555",
    tamount: "Rs 150000",
    pamount: "Rs 10000",
    ramount: "Rs 5000",
    option: [
      <button className="bg-green-500 m-3 w-24 items-center rounded-sm">
        View History
      </button>,
      <button className="bg-white  w-12 items-center rounded-sm">Edit</button>,
    ],
  },
  {
    sn: "3",
    customer: "Ram",
    phone: "rm@gmail.com",
    email: "9848555",
    tamount: "Rs 150000",
    pamount: "Rs 10000",
    ramount: "Rs 5000",
    option: [
      <button className="bg-green-500 m-3 w-24 items-center rounded-sm">
        View History
      </button>,
      <button className="bg-white  w-12 items-center rounded-sm">Edit</button>,
    ],
  },
];

export function CreditCustomer() {
  return (
    <div className="md:h-[100vh] flex-col">
      <h1 className="text-xl mt-4 ml-10">Credit Customer</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      /Credit Customer
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
            <TableHead>Customer</TableHead>

            <TableHead>E-mail</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>paid Amount</TableHead>
            <TableHead>Remaining Amount</TableHead>
            <TableHead>Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.sn}>
              <TableCell className="font-medium">{invoice.sn}</TableCell>
              <TableCell>{invoice.customer}</TableCell>
              <TableCell>{invoice.phone}</TableCell>
              <TableCell>{invoice.email}</TableCell>
              <TableCell>{invoice.tamount}</TableCell>
              <TableCell>{invoice.pamount}</TableCell>
              <TableCell>{invoice.ramount}</TableCell>
              <TableCell>{invoice.option}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </div>
  );
}
export default CreditCustomer;
