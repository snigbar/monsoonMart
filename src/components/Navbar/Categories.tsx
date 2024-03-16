import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Categories() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="cursor-pointer">Categories</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 mt-2">
        <DropdownMenuLabel>Browse Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
