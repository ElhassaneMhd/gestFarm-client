/* eslint-disable react-refresh/only-export-components */
import { Button } from "./Button";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export const socials = [
  {
    href: "https://www.facebook.com",
    icon: <Facebook />,
    color: "#1877f2",
    name: "Facebook",
  },
  {
    href: "https://www.twitter.com",
    icon: <Twitter />,
    color: "#0a66c2",
    name: "Twitter",
  },
  {
    href: "https://www.instagram.com",
    icon: <Instagram />,
    color: "#e1306c",
    name: "Instagram",
  },
  {
    href: "https://www.linkedin.com",
    icon: <Linkedin />,
    color: "#1da1f2",
    name: "Linkedin",
  },
  {
    href: "https://www.youtube.com",
    icon: <Youtube />,
    color: "#ff0000",
    name: "Youtube",
  },
];

export const isSet = (settings) =>
  socials.map((s) => s.name.toLocaleLowerCase()).some((s) => settings?.[s]);

export function SocialMedia({ className = "", size }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className={`relative flex items-center justify-center gap-3 shadow-md ${className}`}
    >
      {socials.map((s, index) => {
        return (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            className="group"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <Button
              shape="icon"
              className={`rounded-full text-text-primary group-hover:text-white`}
              style={{
                backgroundColor: hovered === index ? s.color : "transparent",
              }}
              size={size}
            >
              {s.icon}
            </Button>
          </a>
        );
      })}
    </div>
  );
}
