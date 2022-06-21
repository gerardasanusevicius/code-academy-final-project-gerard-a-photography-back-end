import { RequestHandler } from 'express';
import { Error, QueryWithHelpers } from 'mongoose';
import AboutModel from '../models/about-model';
import createAboutViewModel from '../view-model-creators/create-about-view-model';

type AboutModelQuery = QueryWithHelpers<any, unknown, unknown, unknown>;
type SearchParam = string | undefined;

const getAboutModelData = async (populate: SearchParam, query: AboutModelQuery) => (
    populate === 'about'
        ? query.populate('about')
        : query);

type GetAbout = RequestHandler<unknown, unknown, unknown, { populate: SearchParam }>;
export const getAbout: GetAbout = async (req, res) => {
    const { populate } = req.query;

    const aboutDocs = await getAboutModelData(populate, AboutModel.find());
    const aboutViewModel = aboutDocs.map(createAboutViewModel);

    res.status(200).json(aboutViewModel);
};

export const updateAbout: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const aboutProps = req.body;

    try {
        const updatedAbout = await
            AboutModel.findByIdAndUpdate(id, aboutProps, { new: true });
        res.status(200).json(updatedAbout);
    } catch (error) {
        res.status(404).json({
            error: error instanceof Error ? error.message : 'Wrong about data',
        });
    }
};

export const createAbout: RequestHandler = async (req, res) => {
    const aboutProps = req.body;
    try {
        const createdAbout = await AboutModel.create(aboutProps);
        res.status(201).json(createdAbout);
    } catch (err) {
        const error = 'Server error';
        res.status(400).json({ error });
    }
};
