import { sendVerificationCode } from '@/apis/(beforeLogin)/auth.api';
import { useMutation } from '@tanstack/react-query';

export const useMemberJoinQueries = () => {
  return useMutation({
    mutationFn: sendVerificationCode,
  });
};
