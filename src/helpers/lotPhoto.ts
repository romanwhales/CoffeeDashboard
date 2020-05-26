import { get, includes } from 'lodash';
import { BaseLot } from 'models';
const path = require('path');
export const acceptedImageExtensions = [
  '.png', '.gif', '.jpg', '.jpeg', '.bmp',
];


export default function (lot: BaseLot) {
  let photoUrl = get(lot, 'photos[0]', null);
  if (!photoUrl || !includes(acceptedImageExtensions, path.extname(photoUrl))) {
    // fall back to default image
    photoUrl = 'https://s3.amazonaws.com/static.bellwethercoffee.com/placeholder-header.png';
  }
  return photoUrl;
}