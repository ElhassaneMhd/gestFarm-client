import Tippy from "@tippyjs/react";
import { forwardRef } from "react";
import { cn } from "@/utils/helpers";
import { tv } from "tailwind-variants";
import {
  Calendar,
  CircleAlert,
  FileText,
  Key,
  Mail,
  Map,
  MapPin,
  Phone,
  Search,
} from "lucide-react";

const input = tv({
  base: "input-field relative py-1 rounded-lg bg-background-secondary px-2 overflow-hidden border border-border w-full",
  variants: {
    icon: { true: "pl-9" },
    disabled: { true: "bg-background-disabled" },
    readOnly: { true: "bg-background-disabled" },
  },
});

const icons = {
  search: <Search size={16} />,
  email: <Mail size={16} />,
  password: <Key size={16} />,
  phone: <Phone size={16} />,
  text: <FileText size={16} />,
  date: <Calendar size={16} />,
  city: <MapPin size={16} />,
  location: <MapPin size={16} />,
  maps: <Map size={16} />,
};

function Label({ label, message }) {
  if (!label) return null;

  return (
    <div className="flex items-center gap-2">
      {typeof label === "string" ? (
        <label className="text-sm font-medium text-text-tertiary">
          {label}
        </label>
      ) : (
        label
      )}
      {<ErrorTooltip message={message} />}
    </div>
  );
}

export function ErrorTooltip({ message }) {
  return (
    <Tippy
      content={message?.split("\n").map((msg, index) => (
        <p key={index} className="text-white">
          {msg}
        </p>
      ))}
      placement="top"
      className=" rounded-lg bg-red-500 p-2 text-xs font-semibold text-white"
    >
      <span
        className={`cursor-pointer text-lg text-red-500 transition-transform duration-300 ${
          message ? "scale-100" : "scale-0"
        }`}
      >
        <CircleAlert size={16} />
      </span>
    </Tippy>
  );
}

function Icon({ icon, className = "" }) {
  if (!icon) return null;
  return (
    <span
      className={`absolute left-0 top-0 z-10 grid h-full w-7 place-content-center border-r border-border  text-text-tertiary duration-300 ${className}`}
    >
      {icon}
    </span>
  );
}


export const InputField = forwardRef(
  (
    {
      children,
      type,
      className,
      parentClassName = "",
      name,
      errorMessage,
      label,
      showIcon = true,
      iconClassName,
      customIcon,
      ...props
    },
    ref
  ) => {
    const icon = showIcon && (icons[name] || icons[type]);

    return (
      <div className={`flex flex-col gap-1.5 ${parentClassName}`}>
        <Label label={label} message={errorMessage} />
        <div
          className={cn(
            input({
              icon: Boolean(customIcon || icon),
              disabled: Boolean(props.disabled),
              readOnly: Boolean(props.readOnly),
            }),
            className
          )}
        >
          {customIcon
            ? customIcon
            : showIcon && <Icon icon={icon} className={iconClassName} />}
          {type === "textarea" ? (
            <textarea ref={ref} {...props}></textarea>
          ) : (
            <input type={type || "text"} ref={ref} {...props} />
          )}
          {children}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
