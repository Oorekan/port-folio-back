const db = require('../db');
const { BACK_API_URL } = require('../env');

const { findMany } = db.project;

const findOne = async (id) => {
  const currentProject = await db.project.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (currentProject) {
    let { imageUrl } = currentProject;
    if (
      imageUrl &&
      !imageUrl.startsWith('http://') &&
      !imageUrl.startsWith('https://')
    ) {
      imageUrl = `${BACK_API_URL}/${imageUrl}`;
    }
    return {
      ...currentProject,
      imageUrl,
    };
  }
  return { ...currentProject };
};

const createProject = async ({ name, year, description, imageUrl }) => {
  return db.project.create({
    data: {
      name,
      year,
      description,
      imageUrl:
        typeof imageUrl === 'string'
          ? imageUrl.replace(`${BACK_API_URL}/`, '')
          : imageUrl,
    },
  });
};

const updateProject = async (id, { name, year, description, imageUrl }) => {
  return db.project.update({
    where: { id: parseInt(id, 10) },
    data: {
      name,
      year: parseInt(year, 10),
      description,
      imageUrl:
        typeof imageUrl === 'string'
          ? imageUrl.replace(`${BACK_API_URL}/`, '')
          : imageUrl,
    },
  });
};

const destroy = (id) =>
  db.project
    .delete({ where: { id: parseInt(id, 10) } })
    .then(() => true)
    .catch(() => false);

module.exports = {
  findMany,
  findOne,
  createProject,
  updateProject,
  destroy,
};
