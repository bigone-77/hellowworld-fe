import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { joinMemberFormSchema, JoinMemberPayload } from '@/schemas';

import {
  Button,
  HelperMessage,
  InlineSvg,
  TextField,
} from '@repo/ui/components';

import { passwordRules } from '@/config/password';

interface Props {
  joinId: string;
}

export default function ThirdStep({ joinId }: Props) {
  const {
    register,
    watch,
    trigger,
    formState: { errors, dirtyFields, isValid },
  } = useForm<JoinMemberPayload>({
    resolver: zodResolver(joinMemberFormSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const showPasswordValidation = watch('password')?.length > 0;

  const [isValidPassword, setIsValidPassword] = useState(false);

  useEffect(() => {
    if (dirtyFields.passwordConfirm) {
      trigger('passwordConfirm');
    }
  }, [watch('password'), trigger, dirtyFields.passwordConfirm]);

  return (
    <section>
      <div className='mb-10 flex flex-col gap-y-1'>
        <TextField
          label='아이디'
          placeholder='이메일 주소를 입력해주세요.'
          defaultValue={joinId}
          disabled={true}
        />
        <TextField
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요.'
          type='password'
          {...register('password')}
          success={isValidPassword}
        />
        <PasswordValidationCheckList
          userId='joinId'
          setIsValidPassword={setIsValidPassword}
          targetedPassword={watch('password')}
          isDirty={dirtyFields.password}
        />

        <TextField
          label='비밀번호 확인'
          placeholder='비밀번호 확인'
          type='password'
          error={errors.passwordConfirm?.message}
          {...register('passwordConfirm')}
          success={
            !errors.passwordConfirm &&
            dirtyFields.passwordConfirm &&
            '비밀번호가 일치합니다'
          }
        />
      </div>
      <Button
        className='w-full'
        disabled={!isValid}
        // onClick={handleNextStep}
      >
        회원가입 완료
      </Button>
    </section>
  );
}

const PasswordValidationCheckList = ({
  userId,
  setIsValidPassword,
  targetedPassword,
  isDirty,
}: {
  userId: string;
  setIsValidPassword: React.Dispatch<React.SetStateAction<boolean>>;
  targetedPassword: string;
  isDirty?: boolean;
}) => {
  const isAllRulesMet = passwordRules.every((rule) =>
    rule.isValid(targetedPassword, userId),
  );

  const onSuccess = isDirty && isAllRulesMet;

  useEffect(() => {
    setIsValidPassword(onSuccess as boolean);
  }, [onSuccess]);

  if (!isDirty) return null;

  return (
    <ul className='mb-4 flex -translate-y-4 flex-col gap-y-1 pl-5'>
      {onSuccess ? (
        <HelperMessage variant='success'>
          사용 가능한 비밀번호입니다
        </HelperMessage>
      ) : (
        passwordRules.map((rule) => {
          const isMet = rule.isValid(targetedPassword, userId);
          return (
            <li
              key={rule.id}
              className={`flex items-center gap-x-[0.5] transition-colors ${
                isMet ? 'text-success-on' : 'text-error-on'
              }`}
            >
              <InlineSvg alias='check' width={16} height={16} />
              <HelperMessage variant={isMet ? 'success' : 'error'}>
                {rule.errorMessage}
              </HelperMessage>
            </li>
          );
        })
      )}
    </ul>
  );
};
