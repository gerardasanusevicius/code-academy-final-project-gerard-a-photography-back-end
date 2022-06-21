import { Admin, AdminDocument } from '../models/admin-model';

export type AdminViewModel = Omit<Admin, 'password'> & {
    id: string,
};

const createAdminViewModel = (adminDoc: AdminDocument): AdminViewModel => ({
    id: adminDoc._id.toString(),
    username: adminDoc.username,
    createdAt: adminDoc.createdAt,
    updatedAt: adminDoc.updatedAt,
});

export default createAdminViewModel;
