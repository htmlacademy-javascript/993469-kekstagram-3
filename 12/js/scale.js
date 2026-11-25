const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const uploadForm = document.querySelector('.img-upload__form');
const scaleValueField = uploadForm.querySelector('.scale__control--value');
const scaleSmallerButton = uploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadForm.querySelector('.scale__control--bigger');
const previewImage = uploadForm.querySelector('.img-upload__preview img');

const setScale = (value) => {
  scaleValueField.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const onScaleSmallerClick = () => {
  const currentValue = parseInt(scaleValueField.value, 10);
  const newValue = Math.max(MIN_SCALE, currentValue - SCALE_STEP);
  setScale(newValue);
};

const onScaleBiggerClick = () => {
  const currentValue = parseInt(scaleValueField.value, 10);
  const newValue = Math.min(MAX_SCALE, currentValue + SCALE_STEP);
  setScale(newValue);
};

const resetScale = () => {
  setScale(DEFAULT_SCALE);
};

const initScale = () => {
  scaleSmallerButton.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerClick);
};

export { initScale, resetScale };
