'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCheckbox, useMemberJoinQueries } from '@/hooks';

import { SendCodePayload, sendCodePayloadSchema } from '@/schemas';

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

interface Props {
  setJoinId: (id: string) => void;
  setTempCode: React.Dispatch<React.SetStateAction<string>>;
  goNextStep: () => void;
}

export default function FirstStep({
  setJoinId,
  setTempCode,
  goNextStep,
}: Props) {
  const { mutate: sendCodeMutate } =
    useMemberJoinQueries().memberJoinStepOneMutate;

  const {
    register,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<SendCodePayload>({
    resolver: zodResolver(sendCodePayloadSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  //   AGENT_LIST.reduce(
  //     (acc, item) => {
  //       acc[item.id] = false;
  //       return acc;
  //     },
  //     {} as Record<string, boolean>,
  //   ),
  // );

  // const isAllChecked = useMemo(
  //   () => AGENT_LIST.every((item) => checkedItems[item.id]),
  //   [checkedItems],
  // );

  // const handleCheckAll = (isChecked: boolean) => {
  //   const newCheckedItems = { ...checkedItems };
  //   AGENT_LIST.forEach((item) => {
  //     newCheckedItems[item.id] = isChecked;
  //   });
  //   setCheckedItems(newCheckedItems);
  // };

  // const handleCheck = (id: string, isChecked: boolean) => {
  //   setCheckedItems((prev) => ({ ...prev, [id]: isChecked }));
  // };
  const {
    checkedItems,
    isAllChecked,
    areAllRequiredChecked,
    handleCheckAll,
    handleCheck,
  } = useCheckbox(AGENT_LIST);

  const btnDisabled = !isValid || !areAllRequiredChecked;

  const handleNextStep = async () => {
    const isFormValid = await trigger();

    if (isFormValid) {
      setJoinId(getValues('email'));
      sendCodeMutate(
        { email: getValues('email') },
        {
          onSuccess: (data) => setTempCode(data.authCode),
        },
      );
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
