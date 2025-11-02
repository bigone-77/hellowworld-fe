/*
  해당 아이콘들은 클라우디너리 이미지에서 svg 디렉토리에만 있는 아이콘만을 취급합니다
  1️⃣ 여타 다른 디렉토리에 있는 아이콘들과는 달리 style을 직접 적용할 수 있습니다.
  2️⃣ 만약 style이 직접 적용이 안된다면 에디터에 해당 svg를 열어 편집가능하게 바꿔주세요.
  3️⃣ 필요한 아이콘들이 없는 경우 추가하고 아래 업데이트 날짜를 기재해주세요.

  ✨ 2025.10.09 [최신 업데이트]
  ✨ 2025.10.11 [마스코트 정적 svg 추가]
*/

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

const getIconUrl = (path: string): string => `${CLOUDINARY_BASE_URL}/${path}`;

export const ICON_MAP = {
  play: getIconUrl('v1753115575/svg/play.svg'),
  star: getIconUrl('v1753271887/svg/star.svg'),
  close: getIconUrl('v1759668710/svg/close.svg'),
  downArrow: getIconUrl('v1753371406/svg/down-arrow.svg'),
  prevArrow: getIconUrl('v1753371493/svg/prev-arrow.svg'),
  doublePrevArrow: getIconUrl('v1757349585/svg/double-prev-arrow.svg'),
  nextArrow: getIconUrl('v1753371493/svg/next-arrow.svg'),
  doubleNextArrow: getIconUrl('v1757349585/svg/double-next-arrow.svg'),
  check: getIconUrl('v1753371466/svg/check.svg'),
  award: getIconUrl('v1753788512/svg/award.svg'),
  board: getIconUrl('v1753788512/svg/board.svg'),
  solve: getIconUrl('v1753788512/svg/solve.svg'),
  aim: getIconUrl('v1762018972/svg/aim.svg'),
  book: getIconUrl('v1762018972/svg/book.svg'),
  logout: getIconUrl('v1753790409/svg/logout.svg'),
  search: getIconUrl('v1757347608/svg/search.svg'),
  cancel: getIconUrl('v1754590078/svg/cancel.svg'),
  error: getIconUrl('v1754590131/svg/error.svg'),
  success: getIconUrl('v1754590164/svg/success.svg'),
  pwOff: getIconUrl('v1754590210/svg/pw-off.svg'),
  pwOn: getIconUrl('v1754590210/svg/pw-on.svg'),
  upAndDown: getIconUrl('v1759146358/svg/up-and-down.svg'),
  filter: getIconUrl('v1759161463/svg/filter.svg'),
  setting: getIconUrl('v1759164151/svg/setting.svg'),
  eye: getIconUrl('v1759601752/svg/eye.svg'),
  thumbsup: getIconUrl('v1759601832/svg/thumbsup.svg'),
  comment: getIconUrl('v1759602218/svg/comment.svg'),
  hint: getIconUrl('v1759949744/svg/hint.svg'),
  wrongAnswer: getIconUrl('v1760123925/svg/wrong-answer.svg'),
  correctAnswer: getIconUrl('v1760123950/svg/correct-answer.svg'),
} as const;

const MASCOT_ICONS_MAP = {
  wave: getIconUrl('v1759248272/mascot/wave.svg'),
  typing: getIconUrl('v1759248272/mascot/typing.svg'),
  study: getIconUrl('v1759248287/mascot/study.svg'),
  magic: getIconUrl('v1759248282/mascot/magic.svg'),
  run: getIconUrl('v1759248283/mascot/run.svg'),
  win: getIconUrl('v1759248284/mascot/win.svg'),
  sigh: getIconUrl('v1759248286/mascot/sigh.svg'),
  sleep: getIconUrl('v1759248284/mascot/sleep.svg'),
  panic: getIconUrl('v1759248310/mascot/panic.svg'),
} as const;

export type MascotIconAlias = keyof typeof MASCOT_ICONS_MAP;

export const ALL_ICONS_MAP = {
  ...ICON_MAP,
  ...MASCOT_ICONS_MAP,
} as const;

export type IconAlias = keyof typeof ALL_ICONS_MAP;
