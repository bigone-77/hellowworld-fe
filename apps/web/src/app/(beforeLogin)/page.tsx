import { COOKIE } from '@/config/mock';
import { redirect } from 'next/navigation';

export default function Page() {
  if (COOKIE) {
    redirect('/home');
  }
  redirect('/login');
}
