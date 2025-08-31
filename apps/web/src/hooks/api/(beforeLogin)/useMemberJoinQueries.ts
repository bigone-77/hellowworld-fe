import { useMutation } from '@tanstack/react-query';

import { sendVerificationCode } from '@/apis/(beforeLogin)/auth.api';

export const useMemberJoinQueries = () => {
  return useMutation({
    mutationFn: sendVerificationCode,
  });
};
