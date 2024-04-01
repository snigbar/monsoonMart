import { Link } from "react-router-dom";
import logo from "../../assets/monsoonMartLogo.png";
import SearchBar from "./Searchbar";
import { HeartIcon } from "@radix-ui/react-icons";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/store/hooks/hooks";
import { Button } from "../ui/button";

export const Navbar = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="flex justify-between items-center h-min px-8 py-8 bottom-border relative">
      <Link to="/">
        <img src={logo} className="w-40" />
      </Link>
      <SearchBar></SearchBar>
      {/* navlinks */}
      <div className="flex items-center justify-between gap-8 mr-10">
        {/* shopping cart icon */}
        <div className="relative">
          <Badge className="absolute -top-4 -right-3 px-2 rounded-full">
            1
          </Badge>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />{" "}
          </svg>
        </div>
        <div className="relative">
          <Badge className="absolute -top-4 -right-3 px-2 rounded-full">
            1
          </Badge>
          <HeartIcon className="w-10 h-8" />
        </div>
        {isLoggedIn ? (
          <div className="relative">
            <Badge className="absolute -top-3 -right-3 px-2 rounded-full">
              1
            </Badge>

            <ProfileMenu></ProfileMenu>
          </div>
        ) : (
          <Button variant="default" className="px-5">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
