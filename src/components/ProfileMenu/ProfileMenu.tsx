import { PersonIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks/hooks";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {" "}
        <PersonIcon className="w-8 h-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 mr-4 mt-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        {/* become seller  */}
        {user?.role === "user" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/become-seller">Become Seller</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
