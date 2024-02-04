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
    username: "admin",
    fullname: "Ram Prasad",
    usertype: "salesman",
    option: [
      <button className="bg-white  w-12 items-center rounded-sm">Edit</button>,
      <button className="bg-red-500 m-3 w-12 items-center rounded-sm">
        Delete
      </button>,
    ],
  },
];

export function ListStaff() {
  return (
    <div>
      <h1 className="text-xl mt-4 ml-10">Staff List</h1>
      <a className="ml-8 text-blue-500" href="#">
        Dashboard
      </a>
      / Staff List
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
            <TableHead className="text-center">S.N</TableHead>
            <TableHead className="text-center">User Name</TableHead>
            <TableHead className="text-center">Full Name</TableHead>
            <TableHead className="text-center">User type / Position</TableHead>
            <TableHead className="text-center">Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.sn}>
              <TableCell className="text-center">{invoice.sn}</TableCell>
              <TableCell className="text-center">{invoice.username}</TableCell>
              <TableCell className="text-center">{invoice.fullname}</TableCell>
              <TableCell className="text-center">{invoice.usertype}</TableCell>
              <TableCell className="text-center">{invoice.option}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default ListStaff;
