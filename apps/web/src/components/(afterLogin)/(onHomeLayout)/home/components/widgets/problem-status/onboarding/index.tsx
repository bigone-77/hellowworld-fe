'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Button,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselDot,
  CarouselItem,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  Modal,
} from '@repo/ui/components';

import OnboardingMascot from '@/components/(afterLogin)/(onHomeLayout)/home/components/widgets/problem-status/onboarding/mascot';

export default function ProblemStatusOnboarding() {
  const router = useRouter();

  const [gotoPretestModal, setGotoPretestModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    undefined,
  );

  const [api, setApi] = useState<CarouselApi>();

  const carouselNextClick = () => {
    if (!api) return;
    api.scrollNext();
  };

  const carouselPrevClick = () => {
    if (!api) return;
    api.scrollPrev();
  };

  return (
    <div className='mb-12 mt-3 flex w-full flex-1 flex-col gap-y-3'>
      <div className='bg-text-box rounded-L grid grid-cols-2 items-center gap-x-2 py-[38]'>
        <div className='flex items-center justify-end pb-[31.25] pr-[23.75] pt-[13.75]'>
          <OnboardingMascot config='ORIGIN' />
        </div>

        <div className='flex flex-col gap-y-2'>
          <p className='text-headline-s text-text2'>사전 테스트하기</p>
          <p className='text-body-l1 text-text1'>
            문제를 풀기 전 나의 레벨을 확인해봐요
          </p>
        </div>
      </div>
      <Button onClick={() => setGotoPretestModal(true)} variant='primary'>
        바로시작하기
      </Button>

      <Modal
        isOpen={gotoPretestModal}
        onClose={() => setGotoPretestModal(false)}
      >
        <Modal.Content>
          <Carousel setApi={setApi}>
            <CarouselDot className='-translate-y-3' />
            <CarouselContent>
              <CarouselItem>
                <Modal.Header>
                  <Modal.Title>
                    <div className='flex-center-col'>
                      <div className='size-[200]'>
                        <OnboardingMascot config='MODAL' />
                      </div>
                      <span>사전 테스트 하기</span>
                    </div>
                  </Modal.Title>
                  <Modal.Description>
                    {
                      '스텝업코스와 문제풀이를 이용하기 위해\n사전테스트를 통해 나의 레벨을 확인해야해요'
                    }
                  </Modal.Description>
                </Modal.Header>
                <Modal.Footer>
                  <div className='flex-center-col gap-y-3'>
                    <Button
                      className='w-full'
                      onClick={() => {
                        carouselNextClick();
                      }}
                    >
                      계속
                    </Button>
                    <Button
                      variant='text'
                      onClick={() => setGotoPretestModal(false)}
                    >
                      취소
                    </Button>
                  </div>
                </Modal.Footer>
              </CarouselItem>
              <CarouselItem>
                <Modal.Header>
                  <Modal.Title>
                    <div className='flex-center-col'>
                      <div className='size-[200]'>
                        <OnboardingMascot config='MODAL' />
                      </div>
                      <span>언어 선택</span>
                    </div>
                  </Modal.Title>
                  <Modal.Description>
                    사전테스트를 받을 언어를 선택해주세요
                  </Modal.Description>
                  <div className='px-13 mt-4'>
                    <Dropdown
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                      placeholder='언어를 선택해주세요'
                    >
                      <DropdownTrigger />
                      <DropdownContent>
                        {LANGUAGE_OPTIONS.map((option) => (
                          <DropdownItem key={option.value} value={option.value}>
                            {option.label}
                          </DropdownItem>
                        ))}
                      </DropdownContent>
                    </Dropdown>
                  </div>
                </Modal.Header>
                <Modal.Footer>
                  <div className='flex-center-col gap-y-3'>
                    <Button
                      className='w-full'
                      onClick={() => {
                        setGotoPretestModal(false);
                        router.push('/pre-test');
                      }}
                    >
                      시작하기
                    </Button>
                    <Button variant='text' onClick={() => carouselPrevClick()}>
                      뒤로가기
                    </Button>
                  </div>
                </Modal.Footer>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </Modal.Content>
      </Modal>
    </div>
  );
}

const LANGUAGE_OPTIONS = [
  { value: 'python3', label: 'Python3' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'Javascript' },
];
