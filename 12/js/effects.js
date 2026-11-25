const EFFECTS = {
  none: {
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const DEFAULT_EFFECT = EFFECTS.none;

const uploadForm = document.querySelector('.img-upload__form');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectLevelContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectsList = uploadForm.querySelector('.effects__list');

let currentEffect = DEFAULT_EFFECT;

const isDefaultEffect = () => currentEffect === DEFAULT_EFFECT;

const applyEffect = (value) => {
  if (isDefaultEffect()) {
    previewImage.style.filter = 'none';
    return;
  }

  previewImage.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
};

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });
};

const onSliderUpdate = () => {
  const sliderValue = Number(effectLevelSlider.noUiSlider.get());
  effectLevelValue.value = sliderValue;
  applyEffect(sliderValue);
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  currentEffect = EFFECTS[evt.target.value];
  effectLevelContainer.classList.toggle('hidden', isDefaultEffect());
  updateSlider();
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  effectLevelContainer.classList.add('hidden');
  updateSlider();
  previewImage.style.filter = 'none';
};

const initEffects = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max,
    },
    start: DEFAULT_EFFECT.max,
    step: DEFAULT_EFFECT.step,
    connect: 'lower',
  });

  effectLevelContainer.classList.add('hidden');
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
  effectsList.addEventListener('change', onEffectsChange);
};

export { initEffects, resetEffects };
