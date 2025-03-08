import Avatar from "../ui/Avatar";
import { useUser } from "@/hooks/useUser";
import { LanguageSwitcher, ThemeSwitcher } from "../switchers";

export default function AppBar() {
  return (
    <div className="flex items-center  justify-between gap-8 px-6 py-3">
      <UserInfo />
      <div className="flex gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

function UserInfo() {
  const { user } = useUser();
  const { username, email } = user || {};

  return (
    <div className="flex items-center gap-3">
      <Avatar />
      <div>
        <h3 className="text-sm font-medium capitalize text-text-primary">
          {username}
        </h3>
        <h4 className="text-xs capitalize text-text-tertiary">{email}</h4>
      </div>
    </div>
  );
}
