import { ProjectDocument } from '../models/project-model';

export type ProjectViewModel = {
  id: string,
  title: string,
  url: string,
  updatedAt: string,
};

const createProjectViewModel = (projectDoc: ProjectDocument): ProjectViewModel => ({
  id: projectDoc._id.toString(),
  title: projectDoc.title,
  url: projectDoc.url,
  updatedAt: projectDoc.updatedAt,
});

export default createProjectViewModel;
