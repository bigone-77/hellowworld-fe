import { useMutation } from '@tanstack/react-query';

import {
  handleMemberJoin,
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

  const memberJoinLastMutate = useMutation({
    mutationFn: handleMemberJoin,
  });

  return {
    memberJoinStepOneMutate,
    memberJoinStepTwoMutate,
    memberJoinLastMutate,
  };
};
