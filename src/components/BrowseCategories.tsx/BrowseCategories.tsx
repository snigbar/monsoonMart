import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categories } from "@/constants/categories.constants";
import { Link } from "react-router-dom";

interface TBrowseCategories {
  name: string;
  imgSrc: string;
  total?: number;
}

const CategoriesCard = ({ name, imgSrc, total }: TBrowseCategories) => {
  return (
    <Link to={`/categories/${name}`}>
      <div className="rounded-md shadow-sm bg-white px-4 py-2 flex justify-start items-center gap-4 border w-80">
        {/* imgSrc */}
        <img src={imgSrc} className="h-12 w-12" />
        {/* name*/}
        <div className="flex flex-col justify-between items-start gap-4 w-full">
          <div className="flex justify-between items-center w-full gap-4">
            <p className="font-medium text-gray-900 text-wrap text-sm">
              {name}
            </p>
            <p className=" text-light font-light">{total ? total : 0}</p>
          </div>

          <p className="font-semibold text-rose-500">show all</p>
        </div>
      </div>
    </Link>
  );
};

const BrowseCategories = () => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 px-4 py-6">
        {/*categories cards */}
        {categories.map((val, idx) => (
          <CategoriesCard
            key={idx}
            imgSrc={val.imgSrc}
            name={val.name}
          ></CategoriesCard>
        ))}
      </div>

      <ScrollBar
        orientation="horizontal"
        className="bg-gray-100 rounded-xl border"
      />
    </ScrollArea>
  );
};

export default BrowseCategories;
