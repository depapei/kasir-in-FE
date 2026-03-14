import { ChevronRight } from "lucide-react";
import { Category } from "../types/category";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  isLoading: boolean;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  isLoading,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 md:gap-3 mb-4 md:mb-8 overflow-x-auto pb-2 scrollbar-hide items-center w-full">
      {isLoading ? (
        <div className="animate-pulse flex gap-2 md:gap-3">
          <div className="w-20 md:w-24 h-10 md:h-12 bg-gray-200 rounded-full shrink-0"></div>
          <div className="w-20 md:w-24 h-10 md:h-12 bg-gray-200 rounded-full shrink-0"></div>
        </div>
      ) : (
        <>
          <button
            onClick={() => onSelectCategory("")}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base whitespace-nowrap transition-all shadow-sm shrink-0 ${
              selectedCategory === ""
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900 hover:bg-gray-50"
            }`}
          >
            All
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base whitespace-nowrap transition-all shadow-sm shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
