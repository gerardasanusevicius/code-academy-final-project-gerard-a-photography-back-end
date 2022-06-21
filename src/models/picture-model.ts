import {
  Schema,
  Types,
  Document,
  Model,
  model,
} from 'mongoose';

type Picture = {
  title: string,
  srcSmall: string,
  srcLarge: string,
  updatedAt: string,
};

export type PictureDocument = Document<Types.ObjectId, unknown, Picture> & Picture & {
  _id: Types.ObjectId;
};

const pictureSchema = new Schema<Picture, Model<Picture>>({
  title: {
    type: String,
    required: true,
  },
  srcSmall: {
    type: String,
    required: true,
  },
  srcLarge: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const PictureModel = model('Picture', pictureSchema);

export default PictureModel;
