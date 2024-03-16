import { navItems } from "@/assets/data/constants";
import { Link } from "react-router-dom";
import { Categories } from "./Categories";

const Navigationbar = () => {
  return (
    <div className="flex items-center justify-center w-full h-min py-4">
      <div className="flex justify-between items-center w-3/5 text-base font-semibold">
        <Categories></Categories>
        {navItems.map((val, idx) => (
          <Link to={val.url} key={idx}>
            {val.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigationbar;
