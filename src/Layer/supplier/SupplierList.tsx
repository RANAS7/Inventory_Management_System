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
    sname: "ABC",
    cperson: "Ram",
    email: "rm@gmail.com",
    phone: "9848555",
    address: "Kathmandu",
    option: [
      
      <button className="bg-green-500 m-3 w-12 items-center rounded-sm">View</button>,
      <button className="bg-white  w-12 items-center rounded-sm">Edit</button>,
      <button className="bg-red-500 m-3 w-12 items-center rounded-sm">Delete</button>
    ],
  },
];

export function SupplierList() {
  return (
    <div>
      <h1 className="text-xl mt-4 ml-10">Supplier List</h1>
      <a className="ml-8 text-blue-500" href="#">
        Dashboard
      </a>
      / Supplier List
      <div>
        <Input className="w-96 ml-[850px] mb-10" type="text" placeholder="search" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-center">Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.sname}>
              <TableCell className="font-medium">{invoice.sname}</TableCell>
              <TableCell>{invoice.cperson}</TableCell>
              <TableCell>{invoice.email}</TableCell>
              <TableCell>{invoice.phone}</TableCell>
              <TableCell>{invoice.address}</TableCell>
              <TableCell className="text-center">{invoice.option}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default SupplierList;