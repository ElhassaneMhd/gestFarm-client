import { Tag } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Sheep } from "../ui/Sheep";
import { useEffect, useState } from "react";

export const CategoryCard = ({ category }) => {
  const { name, description, price, sheep } = category;
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = name === searchParams.get("category");

  const [showDesc, setShowDesc] = useState(selected);
  useEffect(() => setShowDesc(selected), [selected]);
  return (
    <div
      onClick={() => {
        setShowDesc(true);
        setSearchParams({ category: name });
      }}
      className={`group w-full bg-background-primary rounded-xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer border border-border ${
        selected ? "ring-2 ring-primary shadow-lg" : "hover: border-secondray"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Tag className="w-5 h-5 text-secondary" />
          <h3 className="text-lg font-semibold  text-text-primary">{name}</h3>
        </div>
        <span className="px-3 py-1 text-sm font-medium text-text-primary bg-background-secondary rounded-full">
          {price} Dh/kg
        </span>
      </div>

      <p className="text-text-secondary text-sm mb-4">
        {showDesc ? description : description.slice(0, 100) + "..."}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-background-tertiary">
        <div className="flex items-center space-x-2">
          <Sheep className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-text-secondary">{sheep} available</span>
        </div>
        <div className="transform transition-transform duration-300 group-hover:translate-x-2">
          <span className="text-text-primary">→</span>
        </div>
      </div>
    </div>
  );
};
