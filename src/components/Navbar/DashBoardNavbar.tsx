import { Link } from "react-router-dom";
import logo from "../../assets/monsoonMartLogo.png";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

import { Badge } from "../ui/badge";
import { BellIcon } from "@radix-ui/react-icons";

export const DashBoardNavbar = () => {
  return (
    <div className="flex justify-between items-center h-min px-8 py-8 bottom-border relative">
      <Link to="/">
        <img src={logo} className="w-40" />
      </Link>
      {/* navlinks */}
      <div className="flex items-center justify-between gap-8 mr-10">
        {/* notification */}
        <div className="relative mt-1">
          <Badge className="absolute -top-4 -right-3 px-2 rounded-full">
            1
          </Badge>
          <BellIcon className="w-6 h-6" />
        </div>
        <ProfileMenu></ProfileMenu>
      </div>
    </div>
  );
};
