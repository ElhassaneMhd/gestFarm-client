import { forwardRef, useState } from "react";
import { InputField } from "./InputField";
import { Eye, EyeClosed } from "lucide-react";

export const PasswordInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputField
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="••••••••••••"
      ref={ref}
      {...props}
    >
      <button
        type="button"
        className="absolute right-1.5 top-1/2 z-10 -translate-y-1/2 text-lg text-text-tertiary transition-transform duration-300"
        onClick={() => props.value && setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
      </button>
    </InputField>
  );
});

PasswordInput.displayName = "PasswordInput";
