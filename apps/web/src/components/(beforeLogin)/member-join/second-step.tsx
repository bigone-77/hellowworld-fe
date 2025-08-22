import { TextField } from '@repo/ui/components';

interface Props {
  joinId: string;
}

export default function SecondStep({ joinId }: Props) {
  console.log(joinId);

  return (
    <section>
      <TextField
        label='아이디'
        placeholder='이메일 주소를 입력해주세요.'
        defaultValue={joinId}
        disabled={true}
      />
    </section>
  );
}
