import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { MobileHeader } from "./MobileHeader";
import { ThemeSwitcher, AuthSwitcher } from "../switchers";
import { Button, Logo } from "../ui";
import { HOMEPAGE_ROUTES } from "@/utils/constants";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "../switchers/LanguageSwitcher";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-border h-[10vh] px-2 py-5 md:px-5">
      <Logo className={'  text-2xl'} />
      <Links />

      <div className="flex items-center gap-4">
        <div className="hidden gap-4 lg:flex">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
        <AuthSwitcher />
        <Button
          shape="icon"
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden"
        >
          <Menu />
        </Button>
      </div>
      <MobileHeader
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}

function Links() {
  const { t } = useTranslation();
  return (
    <ul className="hidden gap-8 lg:flex lg:flex-1 lg:justify-center ">
      {HOMEPAGE_ROUTES.map((route) => (
        <NavLink key={route.label} to={route.path} className="group">
          <li className="relative flex items-center gap-3 text-sm text-text-secondary transition-all duration-300 hover:font-semibold hover:text-text-primary group-[.active]:font-semibold group-[.active]:text-text-primary ">
            <span>{t(`header.navbar.${route.label}`)}</span>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
