import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BadgeDollarSign,
  ChartNoAxesGantt,
  LogOut,
  PanelRightClose,
  PanelRightOpen,
  Truck,
  UserRoundCog,
  Users2,
} from "lucide-react";
import { Button } from "../ui";
import { useLogout } from "@/hooks/useUser";
import { Logo } from "../ui/Logo";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Sheep } from "../ui/Sheep";
import { useUser } from "../../hooks/useUser";
import { getAccessiblePages } from "../../utils/helpers";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );
  const { logout, isLoggingOut } = useLogout();
  const { t } = useTranslation();
  const { user } = useUser();
  const [parent] = useAutoAnimate({ duration: 300 });

  const spanClass = `transition-transform origin-left duration-500 text-sm text-text-secondary ${
    isExpanded ? "md:scale-100" : "scale-0"
  }`;

  useEffect(() => {
    const onresize = () =>
      setIsExpanded(window.matchMedia("(min-width: 1024px)").matches);

    window.addEventListener("resize", onresize);

    return () => window.removeEventListener("resize", onresize);
  }, [isExpanded]);

  const size = isExpanded ? 18 : 20;
  const sideBarElements = [
    {
      name: "sheep",
      icon: <Sheep size={`${isExpanded ? "xs" : "xs"}`} />,
    },
    {
      name: "categories",
      icon: <ChartNoAxesGantt size={size} />,
    },
    { name: "sales", icon: <BadgeDollarSign size={size} /> },
    { name: "shipments", icon: <Truck size={size} /> },
    { name: "users", icon: <Users2 size={size} /> },
    { name: "roles", icon: <UserRoundCog size={size} /> },
  ];
  const routeSideBar = sideBarElements.filter((s) =>
    getAccessiblePages(user?.permissions).includes(s?.name)
  );

  return (
    <aside
      className={`fixed top-0 z-[15] row-span-2 flex h-full flex-col gap-8 overflow-hidden bg-background-secondary pb-2 pt-3 transition-[width] duration-500 md:relative ${
        isExpanded ? "w-full  px-3 md:w-[250px]" : "w-14 px-2"
      }`}
    >
      <div className="flex items-center justify-between ps-2">
        <Logo
          className={`object-contain transition-all duration-500 ${
            isExpanded ? "w-28 scale-100" : "w-0 scale-0"
          }`}
        />
        <Button
          shape="icon"
          className={`not-active self-center ${isExpanded ? "" : "mx-auto"}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <PanelRightOpen size={20} />
          ) : (
            <PanelRightClose size={20} />
          )}
        </Button>
      </div>
      <ul
        className={`relative space-y-1 overflow-y-auto overflow-x-hidden ${
          isExpanded ? "pr-2" : "no_scrollbar"
        }`}
        ref={parent}
      >
        {routeSideBar.map(({ name, icon }) => (
          <li key={name}>
            <NavLink
              to={`/app/${name}`}
              className={`sidebar-element group ${
                isExpanded ? "ps-3" : "ps-2.5"
              } `}
            >
              {icon}
              <span className={spanClass}>{t(`app.sidebar.${name}`)}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button className="sidebar-element group w-full" onClick={logout}>
          <LogOut size={isExpanded ? 18 : 20} />
          <span className={spanClass}>
            {isLoggingOut ? "Logging Out..." : t("app.sidebar.logout")}
          </span>
        </button>
      </div>
    </aside>
  );
}
