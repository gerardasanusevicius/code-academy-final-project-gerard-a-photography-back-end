import { ContactsDocument } from '../models/contacts-model';

export type ContactsViewModel = {
    id: string,
    email: string,
    number: string,
    updatedAt: string,
};

const createContactsViewModel = (contactsDoc: ContactsDocument): ContactsViewModel => ({
    id: contactsDoc._id.toString(),
    email: contactsDoc.email,
    number: contactsDoc.number,
    updatedAt: contactsDoc.updatedAt,
});

export default createContactsViewModel;
