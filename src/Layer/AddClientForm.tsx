import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  setOpen: (data: boolean) => void;
}
export function AddClientForm(props: Props) {
  const { open, setOpen } = props;
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setOpen(false);
          }}
        >
          Aadd{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[82%] ml-28">
        <DialogHeader>
          <DialogTitle>Create Customer</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="">
            <div className="flex w-[100%] gap-10">
              <Label className="inline">
                Full Name
                <Input id="name" value="" className=" w-96 my-3" />
              </Label>
              <Label className="inline">
                Phone No.
                <Input id="name" value="" className=" w-96 my-3" />
              </Label>
              <Label className="inline">
                City
                <Input id="name" value="" className=" w-96 my-3" />
              </Label>
            </div>
            <div className="flex w-[100%] gap-10">
              <Label className="inline">
                E-mail
                <Input id="name" value="" className=" w-96 my-3" />
              </Label>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Image</Label>
                <Input id="picture" type="file" />
              </div>
            </div>
            <label> Address</label>

            <Textarea className="mt-2" placeholder="Type your message here." />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
