import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const isEscapeKey = (evt) => evt.key === 'Escape';

const getHashtags = (value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return [];
  }

  return trimmedValue.split(/\s+/);
};

const validateHashtagsPattern = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.every((hashtag) => HASHTAG_PATTERN.test(hashtag));
};

const validateHashtagsUnique = (value) => {
  const hashtags = getHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagsCount = (value) => getHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const isTextFieldFocused = () =>
  document.activeElement === hashtagsField ||
  document.activeElement === commentField;

pristine.addValidator(
  hashtagsField,
  validateHashtagsPattern,
  'Введён невалидный хэштег',
  1,
  true
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsUnique,
  'Хэштеги повторяются',
  2,
  true
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  'Нельзя указать больше пяти хэштегов',
  3,
  true
);

pristine.addValidator(
  commentField,
  validateCommentLength,
  'Длина комментария не может составлять больше 140 символов'
);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onCancelButtonClick = () => {
  closeUploadForm();
};

const onUploadInputChange = () => {
  openUploadForm();
};

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

function closeUploadForm () {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
}

function openUploadForm () {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

const initUploadForm = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
  uploadForm.addEventListener('submit', onFormSubmit);
  initScale();
  initEffects();
};

export { initUploadForm };
