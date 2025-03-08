import { cn } from "../../utils/helpers";

export function Sheep({ size, color = "text-text-tertiary", className = "" }) {
  const op = {
    sizes: {
      xs: "h-6 w-5",
      sm: "h-8 w-7",
      md: "h-10 w-9",
      lg: "h-12 w-11",
    },
    colors: {
      primary: "text-text-primary",
      secondary: "text-text-tertiary",
      black: "text-black",
    },
  };
  return (
    <img
      className={cn("filter dark:invert ", op.sizes[size], color, className)}
      src="/svg/sheep.svg"
      alt="Sheep SVG"
    />
  );
}
