import { useForm } from '@/hooks/useForm';
import { Button } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useRegister } from '@/hooks/useUser';
import {  RULES } from '@/utils/constants';
import { useEffect } from 'react';
import { changeTitle } from '@/utils/helpers';

export function Register() {
  const { t } = useTranslation();
  const { register, isRegistering } = useRegister();

  useEffect(() => {
    changeTitle('Create Account');
  }, []);

  const {
    Form,
    options: { isValid, handleSubmit },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
    },
    fields: [
      {
        name: "username",
        label: t("form.username.label"),
        rules: { ...RULES.username },
      },
      {
        name: "email",
        type: "email",
        label: t("form.email.label"),
      },
      {
        name: "phone",
        label: t("form.phone.label"),
      },

      {
        name: "password",
        type: "password",
        label: t("form.password.label"),
      },
      {
        name: "passwordConfirmation",
        type: "password",
        label: t("form.confirmPassword.label"),
        rules: { ...RULES.passwordConfirmation },
      },
    ],
    gridLayout: true,
    onSubmit: register,
    submitOnEnter: true,
  });

  return (
    <div className='relative flex h-full w-full flex-col justify-center p-2 md:px-5 md:py-8 '>
      <h1 className='mb-8 text-2xl font-bold text-text-primary sm:text-3xl'>
        {t('form.welcome')} 
      </h1>
      {Form}

      <Button
        className={'w-full mt-6'}
        disabled={!isValid}
        isLoading={isRegistering}
        onClick={() => !isRegistering && handleSubmit()}
      >
        {isRegistering ? 'Registering...' : t('form.register')}
      </Button>
      <p className='mt-5 flex items-center justify-center gap-1 border-t border-border py-4 text-center text-text-primary'>
        {t('form.alreadyHaveAccount')}
        <Link to='/login' className='ml-2 cursor-pointer text-sm font-bold text-primary underline '>
          {t('form.login')}
        </Link>
      </p>
    </div>
  );
}
