const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const caption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let currentComments = [];
let shownCommentsCount = 0;

const isEscapeKey = (evt) => evt.key === 'Escape';

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const picture = document.createElement('img');
  picture.classList.add('social__picture');
  picture.src = avatar;
  picture.alt = name;
  picture.width = 35;
  picture.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  comment.append(picture, text);
  return comment;
};

const renderNextComments = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_PER_PORTION
  );

  nextComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.append(fragment);
  shownCommentsCount += nextComments.length;

  commentShownCount.textContent = shownCommentsCount;
  commentsLoader.classList.toggle('hidden', shownCommentsCount >= currentComments.length);
};

const onCommentsLoaderClick = () => {
  renderNextComments();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const openBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  caption.textContent = description;
  commentTotalCount.textContent = comments.length;

  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  currentComments = comments;
  shownCommentsCount = 0;
  commentsList.innerHTML = '';
  renderNextComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', onCloseButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { openBigPicture };
