import { useMutation } from '@tanstack/react-query';

import {
  sendVerificationCode,
  verifySendCode,
} from '@/apis/(beforeLogin)/auth.api';

export const useMemberJoinQueries = () => {
  const memberJoinStepOneMutate = useMutation({
    mutationFn: sendVerificationCode,
  });

  const memberJoinStepTwoMutate = useMutation({
    mutationFn: verifySendCode,
  });

  return { memberJoinStepOneMutate, memberJoinStepTwoMutate };
};
