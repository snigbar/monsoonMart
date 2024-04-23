import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "@/store/slices/AuthSlice/auth.api";
import { logOut, setLoading } from "@/store/slices/AuthSlice/auth.slice";
import { useEffect } from "react";

const ProfileMenu = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    }
    if (isSuccess) {
      dispatch(logOut());
      dispatch(setLoading(false));
    }
  }, [isSuccess, isLoading]);

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

        {/* become seller  */}
        {user?.role === "user" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/become-seller">Become Seller</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            className="flex justify-between items-center w-full"
            onClick={handleLogout}
          >
            <span>logout</span>
            <ExitIcon></ExitIcon>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
