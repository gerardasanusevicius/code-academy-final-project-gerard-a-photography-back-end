import {
  Schema,
  Types,
  Document,
  Model,
  model,
} from 'mongoose';

type Project = {
  title: string,
  url: string,
  updatedAt: string,
};

export type ProjectDocument = Document<Types.ObjectId, unknown, Project> & Project & {
  _id: Types.ObjectId;
};
const projectSchema = new Schema<Project, Model<Project>>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const ProjectModel = model('Project', projectSchema);

export default ProjectModel;
