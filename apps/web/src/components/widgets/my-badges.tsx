import Badge from '@repo/ui/components/Badge';

export default function MyBadges() {
  return (
    <section className='rounded-L bg-white px-6 pt-6'>
      <Badge
        title='첫질문'
        imgUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1752665263/d6hq9n35as76gfctfysr.svg'
        imgSize={90}
      />
    </section>
  );
}
