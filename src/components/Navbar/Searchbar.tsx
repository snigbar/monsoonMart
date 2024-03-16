import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SearchBar() {
  const [showSearchContent, setShowSearchContent] = useState(false);

  return (
    <div className="relative w-1/2">
      <button className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto right-3 hover:text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <Input
        type="text"
        placeholder="Search"
        className="pl-4 pr-4 rounded-lg py-6"
        onChange={() => setShowSearchContent(true)}
        onBlur={() => setShowSearchContent(false)}
      />
      {/* search result */}
      {showSearchContent && (
        <div className="absolute bg-white -bottom-10 p-4 rounded-lg shadow-md w-full"></div>
      )}
    </div>
  );
}
