'use client';

import { useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { emailFormSchema, EmailFormValues } from '@/schemas';

import { Button, Checkbox, TextField } from '@repo/ui/components';

const AGENT_LIST = [
  {
    id: 'age',
    label: '만 14세 이상입니다.',
    isRequired: true,
    defaultChecked: false,
  },
  {
    id: 'terms',
    label: '이용약관에 동의합니다.',
    isRequired: true,
    defaultChecked: false,
  },
  {
    id: 'privacy',
    label: '개인정보 수집 및 이용동의',
    isRequired: true,
    defaultChecked: false,
  },
  {
    id: 'thirdParty',
    label: '개인정보 처리 위탁동의',
    isRequired: true,
    defaultChecked: false,
  },
  {
    id: 'marketing',
    label: '마케팅 수신 동의',
    isRequired: false,
    defaultChecked: false,
  },
];

const initialCheckedState = AGENT_LIST.reduce(
  (acc, item) => {
    acc[item.id] = false;
    return acc;
  },
  {} as Record<string, boolean>,
);

interface Props {
  setJoinId: (id: string) => void;
  goNextStep: () => void;
}

export default function FirstStep({ setJoinId, goNextStep }: Props) {
  const {
    register,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const [checkedItems, setCheckedItems] = useState(initialCheckedState);

  const isAllChecked = useMemo(
    () => AGENT_LIST.every((item) => checkedItems[item.id]),
    [checkedItems],
  );

  const handleCheckAll = (isChecked: boolean) => {
    const newCheckedItems = { ...checkedItems };
    AGENT_LIST.forEach((item) => {
      newCheckedItems[item.id] = isChecked;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleCheck = (id: string, isChecked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: isChecked }));
  };

  const btnDisabled =
    !isValid ||
    AGENT_LIST.filter((list) => list.isRequired).some(
      (item) => !checkedItems[item.id],
    );

  const handleNextStep = async () => {
    const isFormValid = await trigger();

    if (isFormValid) {
      console.log(getValues('email'));

      setJoinId(getValues('email'));
      goNextStep();
    }
  };

  return (
    <section>
      <TextField
        label='아이디'
        placeholder='이메일 주소를 입력해주세요.'
        error={errors.email?.message}
        {...register('email')}
      />
      <div className='flex flex-col pb-10 pt-6'>
        <Checkbox
          checked={isAllChecked}
          onChange={(e) => handleCheckAll(e.target.checked)}
        >
          <span className='text-body-l2 text-text2'>모두 동의합니다.</span>
        </Checkbox>

        <div className='bg-text-box-var my-3 h-px' />

        <div className='flex flex-col gap-y-3'>
          {AGENT_LIST.map((item) => (
            <Checkbox
              key={item.id}
              checked={checkedItems[item.id] || false}
              onChange={(e) => handleCheck(item.id, e.target.checked)}
            >
              {item.id !== 'age' ? (
                <div className='flex items-center gap-x-1'>
                  <span
                    className={
                      item.isRequired ? 'text-text2' : 'text-text-line'
                    }
                  >
                    [{item.isRequired ? '필수' : '선택'}]
                  </span>
                  <span>{item.label}</span>
                </div>
              ) : (
                <span>{item.label}</span>
              )}
            </Checkbox>
          ))}
        </div>
      </div>
      <Button
        className='w-full'
        disabled={btnDisabled}
        onClick={handleNextStep}
      >
        이메일 인증
      </Button>
    </section>
  );
}
