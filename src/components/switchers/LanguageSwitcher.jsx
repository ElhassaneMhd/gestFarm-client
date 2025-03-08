import { ChevronDown, Languages } from "lucide-react";
import { Button, DropDown } from "../ui";
import { useTranslation } from "react-i18next";
import { handelChangeLanguage } from "@/i18n/config";

export function LanguageSwitcher({ size, layout }) {
  const { t, i18n } = useTranslation();

  return (
    <DropDown
      toggler={
        layout === "long" ? (
          <Button size={size} display="with-icon" color="tertiary">
            <Languages size={20} />
            <span className="flex-1 text-text-primary text-start capitalize">
              {t(`header.languages.${i18n.language}`)}
            </span>
            <ChevronDown />
          </Button>
        ) : (
          <Button size={size} shape="icon">
            <Languages  size={16} />
          </Button>
        )
      }
    >
      {["en", "fr"].map((lang) => (
        <DropDown.Option
          key={lang}
          onClick={() => handelChangeLanguage(lang)}
          isCurrent={i18n.language === lang}
        >
          <span>{t(`header.languages.${lang}`)}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
