import { ChartNoAxesGantt, Loader, RotateCw } from "lucide-react";
import { usePublicCategories } from "@/features/categories/useCategory";
import { Button, Status } from "../ui";
import { CategoryCard } from "./CategoryCard";
import { useSearchParams } from "react-router-dom";

function Categories() {
  const { categories, isLoading, error } = usePublicCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || null;

  return (
    <div className="relative p-2 md:p-0">
      <div className="flex items-center justify-between py-2 my-2">
        <div className="text-2xl flex items-center gap-2 font-bold font-sans">
          Categories <ChartNoAxesGantt />{" "}
        </div>
        <Button
          onClick={() => {
            searchParams.delete("category");
            setSearchParams(searchParams);
          }}
          color="tertiary"
          size="small"
          shape="icon"
          type={"outline"}
          disabled={!category ? true : false}
        >
          <RotateCw size={18} />
        </Button>
      </div>
      {isLoading && <Loader className=" animate-spin m-auto mt-20" />}
      {error && !isLoading && (
        <Status
          heading={"No Categories found"}
          message={"Server error ,cannot show categories "}
          status={"noResults"}
          size={"small"}
        />
      )}
      <div className="grid  grid-cols-1  gap-4">
        {!isLoading &&
          !error &&
          categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
      </div>
    </div>
  );
}

export default Categories;
