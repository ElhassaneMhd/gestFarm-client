import { Clock, DollarSign, Scale, Tag } from "lucide-react";
import { SHEEP_AGES } from "../../utils/constants";

export const SheepCard = ({ sheep }) => {
  const { number, categoryName, price, weight, age } = sheep;
  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-2 bg-background-tertiary backdrop-blur-sm rounded-xl border border-white/20 hover:bg-background-disabled transition-all duration-300">
      <div className="flex-shrink-0">
        <div className="p-2.5 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
          <Icon className="w-5 h-5 text-white stroke-[2.5]" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-text-secondary">{label}</p>
        <p className="text-md font-semibold text-text-primary">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-background-primary h-fit backdrop-blur-xl rounded-xl shadow-xl overflow-hidden border border-border">
      {/* Header */}
      <div className="bg-secondary-hover p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-50 text-sm font-medium tracking-wide">
              Sheep ID
            </p>
            <h1 className="text-2xl font-bold text-white mt-1 tracking-tight">
              #{number}
            </h1>
          </div>
          <div className="mt-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-sm">
              {categoryName.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 p-2 bg-background-secondary">
        <InfoItem icon={Scale} label="Weight" value={`${weight} kg`} />
        <InfoItem
          icon={DollarSign}
          label="Price"
          value={`${price.toLocaleString()} Dh`}
        />
        <InfoItem icon={Clock} label="Age" value={SHEEP_AGES[age]} />
        <InfoItem icon={Tag} label="Category" value={categoryName} />
      </div>
    </div>
  );
};
