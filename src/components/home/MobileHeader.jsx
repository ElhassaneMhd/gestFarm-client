import { NavLink } from "react-router-dom";
import { ThemeSwitcher } from "../switchers/ThemeSwitcher";
import { LoggedUser } from "../switchers/AuthSwitcher";
import { Button } from "../ui";
import { Overlay } from "../ui/Modal";
import { SocialMedia } from "../ui/SocialMedia";
import { HOMEPAGE_ROUTES } from "@/utils/constants";
import { LogOut, X } from "lucide-react";
import { LanguageSwitcher } from "../switchers/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useLogout, useUser } from "@/hooks/useUser";

export function MobileHeader({ isOpen, onClose }) {
  const {user} = useUser();
  const { t } = useTranslation();
  const { logout } = useLogout();

  return (
    <>
      <Overlay isOpen={isOpen} onClose={onClose} closeOnBlur={true} />
      <div
        className={
          "fixed right-0 top-0 z-40  flex h-full w-full flex-col gap-5 justify-self-end overflow-auto bg-background-primary transition-transform duration-500 sm:w-[360px] " +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="flex items-center justify-between gap-3 px-5 pt-5">
          {user && <LoggedUser user={user} />}
          <div className="ml-auto flex gap-2">
            {user && (
              <Button onClick={() => logout()} shape="icon">
                <LogOut size={18} />
              </Button>
            )}
            <ThemeSwitcher size="small" layout="long" />

            <Button onClick={onClose} shape="icon">
              <X  size={18}/>
            </Button>
          </div>
        </div>

        <ul className="flex flex-1 flex-col items-center justify-center gap-6">
          {[
            ...HOMEPAGE_ROUTES,
            ...(user ? [{ label: "dashboard", path: "/app" }] : [])
          ].map(({ label, path }) => (
            <NavLink key={label} to={path} className="mobile_header">
              <li className=" text-2xl font-semibold capitalize text-text-primary transition-all duration-300 hover:scale-110 hover:text-text-secondary sm:text-xl">
                {t(`header.navbar.${label}`)}
              </li>
            </NavLink>
          ))}

          {!user && (
            <ul className="mt-4 flex flex-col items-center gap-2 border-t-2 border-border pt-6">
              {["login", "register"].map((e) => (
                <li key={e} className="font-medium text-text-secondary">
                  <NavLink to={`/${e}`}>{t(`header.auth.${e}`)}</NavLink>
                </li>
              ))}
            </ul>
          )}

        </ul>

        <div className="mx-auto ">
          <LanguageSwitcher size="small" layout="long" />
        </div>

        <SocialMedia className="mt-auto py-3" />
      </div>
    </>
  );
}
