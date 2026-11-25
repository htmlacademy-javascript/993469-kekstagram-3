import { createPhotos } from './data.js';
import { initGallery } from './gallery.js';
import { initUploadForm } from './form.js';

initGallery(createPhotos());
initUploadForm();
