import { Github, Linkedin, Mail } from "lucide-react";
import { Button, ToolTip } from "../ui";
import { redirect } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border px-3 py-4">
      <p className="text-center text-xs font-light text-text-secondary">
        Developed by{" "}
        <ToolTip
          arrow={false}
          interactive={true}
          content={
            <Card
              data={{
                name: "Elhassane Mehdioui",
                avatar: "https://avatars.githubusercontent.com/u/121520500?v=4",
                role: "Full Stack Developer",
                location: "Morocco",
                github: "https://github.com/ElhassaneMhd/",
                linkedin: "https://www.linkedin.com/in/elhassanmhd",
                email: "elhassane.mhd.pro@gmail.com",
              }}
            />
          }
        >
          <button className="font-semibold text-primary transition-colors duration-300 hover:text-primary-hover">
            Hassan
          </button>
        </ToolTip>{" "}
        | &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}

function Card({ data }) {
  const { name, avatar, role, github, linkedin, email } = data;

  return (
    <div className="flex flex-col gap-3">
      <img
        src={avatar}
        alt="avatar"
        className="h-36 rounded-md object-cover "
      />
      <div className="space-y-2.5">
        <div className="px-4">
          <h2 className="text-lg font-semibold text-text-primary">{name}</h2>
          <h4 className="text-xs font-medium text-text-secondary">{role}</h4>
        </div>
        <div className="flex justify-center gap-3 border-t border-border pt-2">
          <a target="_blank" href={github}>
            <Button shape="icon" className="rounded-full">
              <Github />
            </Button>
          </a>
          <a target="_blank" href={linkedin}>
            <Button shape="icon" className="rounded-full">
              <Linkedin />
            </Button>
          </a>
          <a target="_blank" href={`mailto:${email}`}>
            <Button shape="icon" className="rounded-full">
              <Mail />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
