export const passwordRules = [
  {
    id: 1,
    errorMessage: '최소 8자리 이상',
    isValid: (value: string) => value.length >= 8,
  },
  {
    id: 2,
    errorMessage: '영문/숫자/특수문자 2가지 이상 조합',
    isValid: (value: string) => {
      const hasLetter = /[a-zA-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[^a-zA-Z\d\s'&]/.test(value);
      return [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;
    },
  },
  {
    id: 3,
    errorMessage: '3개 이상 연속되거나 동일한 문자 제외',
    isValid: (value: string) => {
      if (value.length === 0) return false;

      if (/(.)\1\1/.test(value)) return false;
      const lowerCaseValue = value.toLowerCase();
      for (let i = 0; i < lowerCaseValue.length - 2; i++) {
        const charCode1 = lowerCaseValue.charCodeAt(i);
        const charCode2 = lowerCaseValue.charCodeAt(i + 1);
        const charCode3 = lowerCaseValue.charCodeAt(i + 2);
        if (charCode2 === charCode1 + 1 && charCode3 === charCode2 + 1)
          return false;
      }
      return true;
    },
  },
  {
    id: 4,
    errorMessage: "공백 및 특수문자 '&'는 제외",
    isValid: (value: string) => value.length > 0 && !/[\s'&]/.test(value),
  },
  {
    id: 5,
    errorMessage: '아이디 또는 개인정보와 관련된 정보 제외',
    isValid: (value: string, userId: string) =>
      value.length > 0 && userId && !value.includes(userId),
  },
];
