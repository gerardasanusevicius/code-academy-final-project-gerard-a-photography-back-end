import { RequestHandler } from 'express';
import { Error, QueryWithHelpers } from 'mongoose';
import ProjectModel from '../models/project-model';
import createProjectViewModel from '../view-model-creators/create-project-view-model';

type ProjectModelQuery = QueryWithHelpers<any, unknown, unknown, unknown>;
type SearchParam = string | undefined;

const getProjectsModelData = async (populate: SearchParam, query: ProjectModelQuery) => (
  populate === 'about'
    ? query.populate('about')
    : query);

type GetProjects = RequestHandler<unknown, unknown, unknown, { populate: SearchParam }>;
export const getProjects: GetProjects = async (req, res) => {
  const { populate } = req.query;

  const projectDocs = await getProjectsModelData(populate, ProjectModel.find());
  const projectViewModels = projectDocs.map(createProjectViewModel);

  res.status(200).json(projectViewModels);
};

export const createProject: RequestHandler = async (req, res) => {
  const projectProps = req.body;
  try {
    const createdProject = await ProjectModel.create(projectProps);
    res.status(201).json(createdProject);
  } catch (err) {
    const error = 'Server error';
    res.status(400).json({ error });
  }
};

export const updateProject: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const projectProps = req.body;

  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(id, projectProps, { new: true });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : 'Wrong project data',
    });
  }
};

export const deleteProject: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(id);
    if (deletedProject === null) throw new Error(`Project with id of '${id}' was not found`);
    res.status(200).json({
      project: deletedProject,
    });
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : error,
    });
  }
};
