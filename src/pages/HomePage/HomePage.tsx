import BrowseCategories from "@/components/BrowseCategories.tsx/BrowseCategories";
import { HomePageBanner } from "@/components/HomePageBanner/HomePageBanner";
import Navigationbar from "@/components/Navbar/Navigationbar";
// import { useAppSelector } from "@/store/hooks/hooks";

export default function HomePage() {
  // const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="space-y-4">
      <Navigationbar />
      <HomePageBanner></HomePageBanner>
      <BrowseCategories></BrowseCategories>
    </div>
  );
}
