import { DropDown } from "../ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLogout, useUser } from "@/hooks/useUser";
import Avatar from "../ui/Avatar";
import { LayoutGrid, LogOut, UserRoundCheck } from "lucide-react";

export function AuthSwitcher() {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const { user } = useUser();

  return (
    <DropDown
      toggler={<Avatar />}
      options={{
        className: "min-w-[200px]",
      }}
      togglerClassName="hidden lg:block"
    >
      {user ? (
        <>
          <DropDown.Title>
            <LoggedUser user={user} />
          </DropDown.Title>
          <DropDown.Divider />
          <Link to="/app">
            <DropDown.Option>
              <LayoutGrid /> {t(`header.auth.dashboard`)}
            </DropDown.Option>
          </Link>
          <DropDown.Option onClick={logout}>
            <LogOut />
            {t(`header.auth.logout`)}
          </DropDown.Option>
        </>
      ) : (
        <>
          <Link to="/login">
            <DropDown.Option>
              <LogOut />
              Log In
            </DropDown.Option>
          </Link>
          <Link to="/register">
            <DropDown.Option>
              <UserRoundCheck />
              Create Account
            </DropDown.Option>
          </Link>
        </>
      )}
    </DropDown>
  );
}

export function LoggedUser({ user }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Avatar />
      <div className="grid">
        <span className="">{user?.username}</span>
        <span className="text-xs font-medium text-text-secondary">
          {user?.email}
        </span>
      </div>
    </div>
  );
}
