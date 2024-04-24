import { TDashboardElement } from "@/interfaces/interfaces";

import { NavLink, useLocation } from "react-router-dom";

interface Props {
  DashboardData: TDashboardElement[];
}

const DashboardSidebarMenu = ({ DashboardData }: Props) => {
  const location = useLocation();

  return (
    <nav className="px-4 py-2 mt-4 h-full">
      <ul className="flex flex-col items-start justify-between gap-4 w-full">
        {DashboardData.map((val, idx) => (
          <NavLink
            to={val.route}
            className={({ isActive }) => {
              const activeRoute = location.pathname === val.route || isActive;
              return activeRoute ? "w-full bg-slate-200" : "w-full";
            }}
            end
          >
            <li
              className="flex justify-start items-center p-2 gap-2 w-full hover:bg-slate-300/75 rounded-sm"
              key={idx}
            >
              <div>{val.icon}</div>
              <p>{val.routeName}</p>
            </li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardSidebarMenu;
