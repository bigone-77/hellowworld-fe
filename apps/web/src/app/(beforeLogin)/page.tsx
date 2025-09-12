import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

export default function Page() {
  const loginUser = getCookie('accessToken');

  if (loginUser) {
    redirect('/home');
  }
  redirect('/login');
}
