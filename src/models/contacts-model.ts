import {
    Schema,
    Types,
    Document,
    Model,
    model,
} from 'mongoose';

type Contacts = {
    email: string,
    number: string,
    updatedAt: string,
};

export type ContactsDocument = Document<Types.ObjectId, unknown, Contacts> & Contacts & {
    _id: Types.ObjectId;
};

const contactsSchema = new Schema<Contacts, Model<Contacts>>({
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const ContactsModel = model('Contacts', contactsSchema);

export default ContactsModel;
