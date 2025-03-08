import { Loader } from "lucide-react";
import { Status } from "../ui";
import { SheepCard } from "./SheepCard";
import { useAvailableSheep } from "@/features/sheep/useSheep";
import { useSearchParams } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Sheep as SheepIcon } from "../ui/Sheep";
import { Pagination } from "../shared/Pagination";
import { useMethods } from "@/hooks/useMethods";
import { usePaginate } from "@/hooks/usePaginate";
import { useEffect } from "react";
export const Sheep = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, limit } = usePaginate();
  const { onPaginate, onChangeLimit } = useMethods({
    defaultSortBy: "id",
    defaultDirection: "desc",
  });
  const isPaginate =
    searchParams.get("page") && searchParams.get("limit") !== null;
  const { sheep, total, isLoading, error } = useAvailableSheep(page, limit);
  let sheepList = sheep;
  if (!isPaginate) {
    const category = searchParams.get("category") || null;
    if (category)
      sheepList = sheep?.filter((s) => s?.categoryName === category);
  }
  useEffect(() => {
    if (isPaginate) {
      searchParams.set("category", null);
      setSearchParams(searchParams);
    }
  }, [isPaginate, searchParams, setSearchParams]);

  return (
    <div className="relative p-2 pt-0">
      <div className="flex justify-between py-2 my-2 mb-2">
        <div className="flex items-center gap-2 text-2xl font-bold font-sans">
          sheep
          <SheepIcon size={"sm"} />
        </div>
      </div>
      {isLoading && <Loader size={40} className=" animate-spin m-auto mt-20" />}
      {error && !isLoading && (
        <Status
          heading={"No Sheep found"}
          message={"Sorry we dont have any available sheep "}
          status={"noResults"}
        />
      )}
      <SheepList
        sheep={sheepList}
        isLoading={isLoading}
        error={error}
        totalItems={total}
        totalPages={total / limit}
      />
      {sheep?.length > 0 && (
        <Pagination
          {...{
            totalItems: total,
            totalPages: total / limit,
            page,
            limit,
            onChangeLimit,
            onPaginate,
            className:
              "absolute -top-32  bg-background-primary border-t border-border p-4 w-full",
          }}
        />
      )}
    </div>
  );
};

function SheepList({ sheep, isLoading, error }) {
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <div className="relative h-full">
      <div
        ref={parent}
        className="relative p-2 pb-5 min-h-[99vh] max-h-[100vh] overflow-scroll grid  grid-cols-1 xl:grid-cols-2  gap-6 "
      >
        {sheep?.length == 0 && (
          <Status
            heading={"Sheep list is empty"}
            message={"Please try another time"}
            status={"noResults"}
            size={"small"}
          />
        )}
        {!isLoading &&
          !error &&
          sheep.map((sheep) => <SheepCard key={sheep.number} sheep={sheep} />)}
      </div>
    </div>
  );
}
