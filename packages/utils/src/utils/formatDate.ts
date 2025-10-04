import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(
  date: Date | number | string,
  formatString: string,
): string {
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date value provided to formatDate:', date);
      return '';
    }

    return format(dateObj, formatString, { locale: ko });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}
