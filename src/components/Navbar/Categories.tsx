import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/constants/categories.constants";

import { Link } from "react-router-dom";

export function Categories() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="cursor-pointer">Categories</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 mt-2">
        <DropdownMenuLabel>Browse Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((val) => (
          <DropdownMenuItem>
            <Link
              to={`/categroies/${val.name.split(" ").join("-")}`}
              key={val.name}
            >
              {val.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
