import BrowseCategories from "@/components/BrowseCategories.tsx/BrowseCategories";
import { HomePageBanner } from "@/components/HomePageBanner/HomePageBanner";
// import { useAppSelector } from "@/store/hooks/hooks";

export default function HomePage() {
  // const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="space-y-4">
      <HomePageBanner></HomePageBanner>
      <BrowseCategories></BrowseCategories>
    </div>
  );
}
