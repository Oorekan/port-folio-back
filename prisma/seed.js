const db = require('../db');

module.exports = async function seed() {
  await db.user.createMany({
    data: [
      {
        email: 'brandon.monge@outlook.fr',
        password: 'Oorekan',
        role: 'admin',
      },
    ],
  });
  /* await db.project.createMany({
    data: [
      {
        name: 'Memoory',
        year: 2021,
        description:
          "Projet réalisé afin de mettre en pratique les connaissances obtenues lors dès 3 premières semaines de formation. Le développement de ce projet a été fait en 2 semaines grâce à l'apprentissage et à la mise en application des bases Javascript. Voici un lien vers le site, https://pschnur.github.io/Projet-1-Memory/",
        imageUrl: 'https://i.imgur.com/mmQA3QC.png',
      },
      {
        name: 'Biblio Tech',
        year: 2021,
        description:
          "Projet réalisé en 5 semaines ayant pour but de répertorier des livres afin de pouvoir consulter des informations tels que les synopsis ou les notes des utilisateurs les concernant. Le développement de ce projet a permis de mettre à l'épreuve mes connaissances sur React et sur les bases de données. Voici un lien vers le site, https://biblio-tech.netlify.app/",
        imageUrl: 'https://i.imgur.com/3DZXJ0K.jpeg',
      },
      {
        name: 'Gamelle',
        year: 2021,
        description: 'Projet réalisé en 9 semaines, suite à venir...',
        imageUrl: 'https://i.imgur.com/mmQA3QC.png',
      },
    ],
  }); */
};

module
  .exports()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
