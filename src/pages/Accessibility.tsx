import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-xl border border-border bg-card/40 p-6 space-y-3">
    <div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="flex flex-wrap gap-3 pt-2">{children}</div>
  </section>
);

const Accessibility = () => {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
        <header className="space-y-2">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to portfolio
          </Link>
          <h1 className="text-3xl font-bold">Accessibility Test Page</h1>
          <p className="text-muted-foreground">
            Tab through each control and open every overlay to confirm focus
            rings are visible. Use Esc to close and confirm focus returns to
            the trigger.
          </p>
        </header>

        <Section
          title="Dialog"
          description="Standard modal dialog. Tab cycles within content; Esc closes."
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sample dialog</DialogTitle>
                <DialogDescription>
                  Tab between the input and the buttons to check focus rings.
                </DialogDescription>
              </DialogHeader>
              <Input placeholder="Focusable input" />
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section
          title="Alert Dialog"
          description="Confirmation alert with action and cancel buttons."
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Open Alert Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Section>

        <Section
          title="Dropdown Menu"
          description="Arrow keys move between items; highlighted item shows focus ring."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Dropdown</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section
          title="Context Menu"
          description="Right-click (or Shift+F10) on the target to open."
        >
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
              Right-click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Cut</ContextMenuItem>
              <ContextMenuItem>Copy</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Section>

        <Section
          title="Popover"
          description="Inline overlay with focusable content."
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <p className="text-sm">Popover content with an input:</p>
                <Input placeholder="Type here" />
                <Button size="sm">Submit</Button>
              </div>
            </PopoverContent>
          </Popover>
        </Section>

        <Section
          title="Select"
          description="Native-feeling select with keyboard support."
        >
          <Select>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Pick an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>
        </Section>

        <Section
          title="Sheet"
          description="Side drawer overlay."
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sample sheet</SheetTitle>
                <SheetDescription>
                  Tab between focusable items to check rings.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-2 pt-4">
                <Input placeholder="Name" />
                <Input placeholder="Email" />
                <Button>Save</Button>
              </div>
            </SheetContent>
          </Sheet>
        </Section>

        <Section
          title="Command Menu"
          description="Searchable command palette (cmdk)."
        >
          <Button variant="outline" onClick={() => setCommandOpen((v) => !v)}>
            {commandOpen ? "Hide" : "Show"} Command Menu
          </Button>
          {commandOpen && (
            <div className="w-full rounded-md border border-border">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </Section>
      </div>
    </main>
  );
};

export default Accessibility;
