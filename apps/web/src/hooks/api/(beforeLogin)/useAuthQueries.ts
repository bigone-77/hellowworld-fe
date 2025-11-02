import { useMutation } from '@tanstack/react-query';

import {
  handleMemberJoin,
  sendVerificationCode,
  verifySendCode,
} from '@/lib/(beforeLogin)';
import { googleLogin } from '@/lib/(beforeLogin)/[client]/oauth';

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

  // oauth 로그인
  const oauthGoogleLoginMutate = useMutation({
    mutationFn: googleLogin,
  });

  return {
    memberJoinStepOneMutate,
    memberJoinStepTwoMutate,
    memberJoinLastMutate,

    oauthGoogleLoginMutate,
  };
};
