import {
  Schema,
  Model,
  Types,
  Document,
  model,
} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export type Admin = {
  username: string,
  password: string,
  createdAt: string,
  updatedAt: string,
};

type AdminModelType = Model<Admin, unknown>;

export type AdminDocument = (Document<Types.ObjectId, unknown, Admin> & Admin & {
  _id: Types.ObjectId;
});

const adminSchema = new Schema<Admin, AdminModelType>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

adminSchema.plugin(uniqueValidator);

const AdminModel = model('Admin', adminSchema);

export default AdminModel;
