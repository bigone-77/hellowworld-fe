import { useMutation } from '@tanstack/react-query';

import {
  handleMemberJoin,
  sendVerificationCode,
  verifySendCode,
} from '@/lib/(beforeLogin)';

export const useAuthQueries = () => {
  const memberJoinStepOneMutate = useMutation({
    mutationFn: sendVerificationCode,
  });

  const memberJoinStepTwoMutate = useMutation({
    mutationFn: verifySendCode,
  });

  const memberJoinLastMutate = useMutation({
    mutationFn: handleMemberJoin,
  });

  return {
    memberJoinStepOneMutate,
    memberJoinStepTwoMutate,
    memberJoinLastMutate,
  };
};
