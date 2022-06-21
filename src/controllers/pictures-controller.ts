import { RequestHandler } from 'express';
import { Error, QueryWithHelpers } from 'mongoose';
import PictureModel from '../models/picture-model';
import createPictureViewModel from '../view-model-creators/create-picture-view-model';

type PictureModelQuery = QueryWithHelpers<any, unknown, unknown, unknown>;
type SearchParam = string | undefined;

const getPicturesModelData = async (populate: SearchParam, query: PictureModelQuery) => (
  populate === 'portfolio'
    ? query.populate('portfolio')
    : query);

type GetPictures = RequestHandler<unknown, unknown, unknown, { populate: SearchParam }>;
export const getPictures: GetPictures = async (req, res) => {
  const { populate } = req.query;

  const pictureDocs = await getPicturesModelData(populate, PictureModel.find());
  const pictureViewModels = pictureDocs.map(createPictureViewModel);

  res.status(200).json(pictureViewModels);
};

export const createPicture: RequestHandler = async (req, res) => {
  const pictureProps = req.body;
  try {
    const createdPicture = await PictureModel.create(pictureProps);
    res.status(201).json(createdPicture);
  } catch (err) {
    const error = 'Server error';
    res.status(400).json({ error });
  }
};

export const updatePicture: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const pictureProps = req.body;

  try {
    const updatedPicture = await PictureModel.findByIdAndUpdate(id, pictureProps, { new: true });
    res.status(200).json(updatedPicture);
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : 'Wrong picture data',
    });
  }
};

export const deletePicture: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPicture = await PictureModel.findByIdAndDelete(id);
    if (deletedPicture === null) throw new Error(`Picture with id of '${id}' was not found`);
    res.status(200).json({
      picture: deletedPicture,
    });
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : error,
    });
  }
};
