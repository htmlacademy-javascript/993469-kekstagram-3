import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';

const initGallery = (photos) => {
  renderThumbnails(photos, openBigPicture);
};

export { initGallery };
