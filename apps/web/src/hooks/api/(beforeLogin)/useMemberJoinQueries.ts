import { useMutation } from '@tanstack/react-query';

import {
  sendVerificationCode,
  verifySendCode,
} from '@/apis/(beforeLogin)/auth.api';

export const useMemberJoinQueries = () => {
  return useMutation({
    mutationFn: sendVerificationCode,
  });
};

export const useVerifySendCode = () => {
  return useMutation({
    mutationFn: verifySendCode,
  });
};
