import DashboardSidebarMenu from "@/components/Navbar/DashboardSidebarMenu";
import { TDashboardElement } from "@/interfaces/interfaces";
import { Outlet } from "react-router-dom";

interface Props {
  DashboardData: TDashboardElement[];
}

const Dashboard = ({ DashboardData }: Props) => {
  return (
    <div className="flex justify-between items-start h-[83vh]">
      <div className="w-[280px] h-full border-r">
        <DashboardSidebarMenu DashboardData={DashboardData} />
      </div>

      <div className="min-h-[80vh] w-full p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
