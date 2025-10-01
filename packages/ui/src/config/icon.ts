/*
  해당 아이콘들은 클라우디너리 이미지에서 svg 디렉토리에만 있는 아이콘만을 취급합니다
  1️⃣ 여타 다른 디렉토리에 있는 아이콘들과는 달리 style을 직접 적용할 수 있습니다.
  2️⃣ 만약 style이 직접 적용이 안된다면 에디터에 해당 svg를 열어 편집가능하게 바꿔주세요.
  3️⃣ 필요한 아이콘들이 없는 경우 추가하고 아래 업데이트 날짜를 기재해주세요.

  ✨ 2025.09.29 [최신 업데이트]
*/

export const ICON_MAP = {
  play: 'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753115575/svg/play.svg',
  star: 'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753271887/svg/star.svg',
  downArrow:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371406/svg/down-arrow.svg',
  prevArrow:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371493/svg/prev-arrow.svg',
  doublePrevArrow:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1757349585/svg/double-prev-arrow.svg',
  nextArrow:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371493/svg/next-arrow.svg',
  doubleNextArrow:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1757349585/svg/double-next-arrow.svg',
  check:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371466/svg/check.svg',
  award:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753788512/svg/award.svg',
  board:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753788512/svg/board.svg',
  solve:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753788512/svg/solve.svg',
  logout:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753790409/svg/logout.svg',
  search:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1757347608/svg/search.svg',
  cancel:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1754590078/svg/cancel.svg',
  error:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1754590131/svg/error.svg',
  success:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1754590164/svg/success.svg',
  pwOff:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1754590210/svg/pw-off.svg',
  pwOn: 'https://res.cloudinary.com/dl31hx4rn/image/upload/v1754590210/svg/pw-on.svg',
  upAndDown:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1759146358/svg/up-and-down.svg',
  filter:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1759161463/svg/filter.svg',
  setting:
    'https://res.cloudinary.com/dl31hx4rn/image/upload/v1759164151/svg/setting.svg',
} as const;

export type IconAlias = keyof typeof ICON_MAP;
