import { UserRound } from "lucide-react";
import { forwardRef } from "react";

const Avatar = forwardRef(({ className }, ref) => {
  return (
    <UserRound
      size={32}
      ref={ref}
      className={` bg-background-secondary rounded-md object-cover p-1  ${className}`}
    />
  );
});

Avatar.displayName = "Avatar";

export default Avatar;
