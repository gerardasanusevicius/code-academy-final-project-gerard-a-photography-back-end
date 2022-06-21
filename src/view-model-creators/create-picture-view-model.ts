import { PictureDocument } from '../models/picture-model';

export type PictureViewModel = {
  id: string,
  title: string,
  srcSmall: string,
  srcLarge: string,
  updatedAt: string,
};

const createPictureViewModel = (pictureDoc: PictureDocument): PictureViewModel => ({
  id: pictureDoc._id.toString(),
  title: pictureDoc.title,
  srcSmall: pictureDoc.srcSmall,
  srcLarge: pictureDoc.srcLarge,
  updatedAt: pictureDoc.updatedAt,
});

export default createPictureViewModel;
