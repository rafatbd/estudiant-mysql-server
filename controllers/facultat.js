const Sequelize     = require('sequelize');
const facultat      = require('../models').facultat;
module.exports = {
    create(req, res) {
      return new Promise((resolve, reject) => {
         facultat.create ({
            nom: req.body.nom,
            direccio: req.body.direccio,
            universitat: req.body.universitat
          }).then(facultat => res.status(200).send(facultat))
          .catch(error => res.status(400).send(error));
          resolve();
      });
    },

    list(_, res) {
      return new Promise((resolve, reject) => {
         facultat.findAll({})
         .then(facultat => res.status(200).send(facultat))
         .catch(error => res.status(400).send(error));
         resolve();
      });
    },

    find (req, res) {
      return new Promise((resolve, reject) => {
         facultat.findAll({
               where: {
                  id: req.params.id,
               }
         })
         .then(facultat => res.status(200).send(facultat))
         .catch(error => res.status(400).send(error));
         resolve();
      });
   },

   destroy (req, res){
    return new Promise((resolve, reject) => {  
      facultat.destroy({
           where: {
              id: req.params.id,
           }
       }).then(()=>{
        facultat.findAll({})   
       .then(facultat => res.status(200).send(facultat))
       .catch(error => res.status(400).send(error));
       resolve();
      });
    });
  }, 

  update (req, res){
    return new Promise((resolve, reject) => {  
      facultat.update(
          {
              nom: req.body.nom,
              direccio: req.body.direccio,
              universitat: req.body.universitat
          },
          {
              returning: true,
              where: {
                  id: req.params.id,
              }
          }
      );
    }).then(()=>{
      facultat.findAll({
           where: {
               id: req.params.id
           }
      })
      .then(facultat => res.status(200).send(facultat))
      .catch(error => res.status(400).send(error));
      resolve();

    });
  }, 


};