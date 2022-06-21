import { AboutDocument } from '../models/about-model';

export type AboutViewModel = {
    id: string,
    intro: string,
    sentence: string,
    genres: string[],
    image: string,
    updatedAt: string,
};

const createAboutViewModel = (aboutDoc: AboutDocument): AboutViewModel => ({
    id: aboutDoc._id.toString(),
    intro: aboutDoc.intro,
    sentence: aboutDoc.sentence,
    genres: aboutDoc.genres,
    image: aboutDoc.image,
    updatedAt: aboutDoc.updatedAt,
});

export default createAboutViewModel;
