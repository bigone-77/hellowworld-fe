export type ProblemStatus = '미진행' | '스스로풀음' | '도움받음' | '레벨부족';

export type Problem = {
  id: number;
  status: ProblemStatus;
  title: string;
  language: string; // 나중에 언어 확정되면 더욱 구체화 예정
  tags: string[]; // 나중에 태그 확정되면 더욱 구체화 예정
  level: string;
  points: string;
  accuracy: string;
  isBookmarked: boolean;
};

export const dummyData: Problem[] = [
  {
    id: 1,
    status: '스스로풀음',
    title: 'Fly me to the Alpha Centauri',
    language: 'Markdown',
    tags: ['#이름에', '#변수', '#변수'],
    level: 'LV24',
    points: '50pt',
    accuracy: '99.5%',
    isBookmarked: true,
  },
  {
    id: 2,
    status: '미진행',
    title: 'Fly me to the Alpha Centauri',
    language: 'Python',
    tags: ['#이름에', '#변수', '#변수'],
    level: 'LV32',
    points: '50pt',
    accuracy: '99.5%',
    isBookmarked: true,
  },
  {
    id: 3,
    status: '미진행',
    title: 'Fly me to the Alpha Centauri',
    language: 'Python',
    tags: ['#이름에', '#변수', '#변수'],
    level: 'LV32',
    points: '50pt',
    accuracy: '99.5%',
    isBookmarked: true,
  },
  {
    id: 4,
    status: '미진행',
    title: 'Fly me to the Alpha Centauri',
    language: 'Python',
    tags: ['#이름에', '#변수', '#변수'],
    level: 'LV32',
    points: '50pt',
    accuracy: '99.5%',
    isBookmarked: true,
  },
  {
    id: 5,
    status: '미진행',
    title: 'Fly me to the Alpha Centauri',
    language: 'Python',
    tags: ['#이름에', '#변수', '#변수'],
    level: 'LV32',
    points: '50pt',
    accuracy: '99.5%',
    isBookmarked: true,
  },
  {
    id: 6,
    status: '미진행',
    title: 'Fly me to the Alpha Centauri',
    language: 'Python',
    tags: ['#이름에', '#변수', '#변수'],
    level: 'LV32',
    points: '50pt',
    accuracy: '99.5%',
    isBookmarked: true,
  },
  {
    id: 7,
    status: '레벨부족',
    title: 'Fly me to the Alpha Centauri',
    language: 'Python',
    tags: ['#이름에', '#변수', '#변수'],
    level: 'LV50',
    points: '100pt',
    accuracy: '99.4%',
    isBookmarked: false,
  },
  {
    id: 8,
    status: '레벨부족',
    title: 'Fly me to the Alpha Centauri',
    language: 'Python',
    tags: ['#이름에', '#변수', '#변수'],
    level: 'LV50',
    points: '100pt',
    accuracy: '99.4%',
    isBookmarked: false,
  },
  {
    id: 9,
    status: '레벨부족',
    title: 'Fly me to the Alpha Centauri',
    language: 'Python',
    tags: ['#이름에', '#변수', '#변수'],
    level: 'LV50',
    points: '100pt',
    accuracy: '99.4%',
    isBookmarked: false,
  },
];
