const _ = require('lodash');
const projectsRouter = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const Project = require('../models/project');
const handleImageUpload = require('../middlewares/handleImageUpload');
const { RecordNotFoundError } = require('../error-types');
const tryDeleteFile = require('../helpers/tryDeleteFile');

projectsRouter.get('/', async (req, res) => {
  return Project.findMany()
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send('Il y a eu une erreur lors de la récupération de vos projets');
    });
});

projectsRouter.get('/:id', async (req, res) => {
  return Project.findOne(parseInt(req.params.id, 10))
    .then((project) => {
      res.json([project]);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send('Il y a eu une erreur lors de la récupération de votre projet');
    });
});

projectsRouter.post(
  '/',
  handleImageUpload.single('imageUrl'),
  async (req, res) => {
    const { name, year, description } = req.body;
    let imageUrl;
    if (req.file && req.file.path) {
      imageUrl = req.file.path;
    }

    return Project.createProject({
      name,
      year: parseInt(year, 10),
      description,
      imageUrl,
    })
      .then((project) => {
        res.json(project);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send('Il y a eu une erreur lors de la création de votre projet');
      });
  }
);

projectsRouter.patch(
  '/:id',
  handleImageUpload.single('imageUrl'),
  expressAsyncHandler(async (req, res) => {
    const project = await Project.findOne(parseInt(req.params.id, 10));
    const oldImagerUrl = project.imageUrl;
    if (!project) throw new RecordNotFoundError('projects', req.params.id);
    const data = _.omit(req.body, 'imageUrl', 'id');
    if (req.file && req.file.path) {
      if (req.body.imageUrl === '') {
        await tryDeleteFile(req.file.path);
      } else {
        data.imageUrl = req.file.path;
      }
    }
    const updated = await Project.updateProject(req.params.id, data);
    if (req.file && req.file.path) {
      await tryDeleteFile(oldImagerUrl);
    }
    res.send(updated);
  })
);

projectsRouter.delete('/:id', async (req, res) => {
  return Project.destroy(req.params.id)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send('Il y a eu une erreur lors de la suppression de votre projet');
    });
});

module.exports = projectsRouter;
