const PHOTOS_COUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 0,
  MAX: 30,
};

const AVATARS_COUNT = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Ольга',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Екатерина',
];

const DESCRIPTIONS = [
  'Закат на море',
  'Утро в горах',
  'Мой кот спит на клавиатуре',
  'Лучший кофе в городе',
  'Прогулка по старому парку',
  'Вид из окна поезда',
  'Наконец-то отпуск!',
  'Домашняя пицца собственного приготовления',
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};

const generateCommentId = createIdGenerator();

const createMessage = () => {
  const sentences = [getRandomArrayElement(MESSAGES)];

  if (getRandomInteger(0, 1)) {
    let secondSentence = getRandomArrayElement(MESSAGES);
    while (secondSentence === sentences[0]) {
      secondSentence = getRandomArrayElement(MESSAGES);
    }
    sentences.push(secondSentence);
  }

  return sentences.join(' ');
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: Array.from(
    { length: getRandomInteger(Comments.MIN, Comments.MAX) },
    createComment
  ),
});

const createPhotos = () => Array.from({ length: PHOTOS_COUNT },
  (_, index) => createPhoto(index + 1)
);

createPhotos();
