// import { useForm } from "@/hooks/useForm";
import { Button } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useUser";
import { useEffect } from "react";
import { changeTitle } from "@/utils/helpers";
import { OAuthProviders } from "@/utils/constants";
import { useForm } from "@/hooks/useForm";

export function Login() {
  const { t } = useTranslation();
  const { login, isLogging } = useLogin();

  useEffect(() => {
    changeTitle("Log In");
  }, []);

  const {
    Form,
    options: { isValid, handleSubmit },
  } = useForm({
    defaultValues: { username: "", password: "" },
    fields: [
      { name: "username", type: "email", label: t("form.email.label") },
      {
        name: "password",
        type: "password",
        label: t("form.password.label"),
        rules: { pattern: null },
      },
    ],
    onSubmit: login,
    submitOnEnter: true,
  });

  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-3 p-2 md:px-10 lg:px-20  ">
      <h1 className="mb-8 text-2xl font-bold text-text-primary sm:text-3xl">
        {t("form.welcome")}
      </h1>
      {Form}
      <Button
        className={"my-4 w-full self-end"}
        disabled={!isValid}
        onClick={() => !isLogging && handleSubmit()}
        isLoading={isLogging}
      >
        {isLogging ? "Logging In..." : t("form.login")}
      </Button>

      <div className="relative flex items-center justify-center gap-1 border-t border-border py-6 text-center text-text-primary">
        <span className=" absolute -top-3 px-2 text-text-tertiary  bg-background-primary">
          Or
        </span>
        <Button
          className="w-full text-text-secondary border border-border font-semibold"
          color="tertiary"
          onClick={() => {
            const provider = OAuthProviders.GOOGLE;
            const url = `${import.meta.env.VITE_SERVER_URL}${provider}`;
            window.location.href = url;
          }}
        >
          Log in with Google
        </Button>
      </div>
      <div className="flex items-center  gap-1  py-4 text-center text-text-primary">
        {t("form.dontHaveAccount")}
        <Link to="/register" className="ml-2 font-bold text-primary underline">
          {t("form.register")}
        </Link>
      </div>
    </div>
  );
}
