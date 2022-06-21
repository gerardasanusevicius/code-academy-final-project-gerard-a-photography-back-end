import { RequestHandler } from 'express';
import { Error, QueryWithHelpers } from 'mongoose';
import ContactsModel from '../models/contacts-model';
import createContactsViewModel from '../view-model-creators/create-contacts-view-model';

type ContactsModelQuery = QueryWithHelpers<any, unknown, unknown, unknown>;
type SearchParam = string | undefined;

const getContactsModelData = async (populate: SearchParam, query: ContactsModelQuery) => (
    populate === 'contacts'
        ? query.populate('contacts')
        : query);

type GetContacts = RequestHandler<unknown, unknown, unknown, { populate: SearchParam }>;
export const getContacts: GetContacts = async (req, res) => {
    const { populate } = req.query;

    const contactDocs = await getContactsModelData(populate, ContactsModel.find());
    const contactsViewModel = contactDocs.map(createContactsViewModel);

    res.status(200).json(contactsViewModel);
};

export const updateContacts: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const contactsProps = req.body;

    try {
        const updatedContacts = await
            ContactsModel.findByIdAndUpdate(id, contactsProps, { new: true });
        res.status(200).json(updatedContacts);
    } catch (error) {
        res.status(404).json({
            error: error instanceof Error ? error.message : 'Wrong contacts data',
        });
    }
};

export const createContacts: RequestHandler = async (req, res) => {
    const contactsProps = req.body;
    try {
        const createdContacts = await ContactsModel.create(contactsProps);
        res.status(201).json(createdContacts);
    } catch (err) {
        const error = 'Server error';
        res.status(400).json({ error });
    }
};
