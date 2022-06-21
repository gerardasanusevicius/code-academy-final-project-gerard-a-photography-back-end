import {
    Schema,
    Types,
    Document,
    Model,
    model,
} from 'mongoose';

type About = {
    intro: string,
    sentence: string,
    genres: string[],
    image: string,
    updatedAt: string,
};

export type AboutDocument = Document<Types.ObjectId, unknown, About> & About & {
    _id: Types.ObjectId;
};

const aboutSchema = new Schema<About, Model<About>>({
    intro: {
        type: String,
        required: true,
    },
    sentence: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const AboutModel = model('About', aboutSchema);

export default AboutModel;
