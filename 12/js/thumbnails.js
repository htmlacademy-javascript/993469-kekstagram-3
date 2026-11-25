const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = (photo, onThumbnailClick) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    onThumbnailClick(photo);
  });

  return thumbnail;
};

const renderThumbnails = (photos, onThumbnailClick) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.append(createThumbnail(photo, onThumbnailClick));
  });

  picturesContainer.append(fragment);
};

export { renderThumbnails };
