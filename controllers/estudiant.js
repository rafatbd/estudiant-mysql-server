const Sequelize = require('sequelize');
const estudiant = require('../models').estudiant;
module.exports = {
 create(req, res) {
    return new Promise((resolve, reject) => {
            estudiant.create ({
                 nom: req.body.nom,
                 vivenda: req.body.vivenda,
                 poblacio: req.body.poblacio,
                 carrera: req.body.carrera,
                 tipus_estudi: req.body.tipus_estudi
            })
            .then(estudiant => res.status(200).send(estudiant))
            .catch(error => res.status(400).send(error));
            resolve();
    });
 },
 list(_, res) {
    return new Promise((resolve, reject) => {
        estudiant.findAll({})
        .then(estudiant => res.status(200).send(estudiant))
        .catch(error => res.status(400).send(error));
        resolve();
    });
 },
 find (req, res) {
    return new Promise((resolve, reject) => {
    
     estudiant.findAll({
         where: {
             id: req.params.id
         }
     })
     .then(estudiant => res.status(200).send(estudiant))
     .catch(error => res.status(400).send(error));
     resolve();
    });
  },
  destroy (req, res){
    return new Promise((resolve, reject) => {
    
        estudiant.destroy({
             where: {
                 id: req.params.id
             }
         }).then(()=>{
            estudiant.findAll({})   
            .then(estudiant => res.status(200).send(estudiant))
            .catch(error => res.status(400).send(error));
            resolve();
        }); 
    });
  },
  update (req, res){
    return new Promise((resolve, reject) => {
        estudiant.update(
            {
                nom: req.body.nom,
                vivenda: req.body.vivenda,
                poblacio: req.body.poblacio,
                carrera: req.body.carrera,
                tipus_estudi: req.body.tipus_estudi
            },
            {
                returning: true,
                where: {
                    id: req.params.id,
                }
            }
        );
    }).then(()=>{
        estudiant.findAll({
             where: {
                 id: req.params.id
             }
         })
         .then(estudiant => res.status(200).send(estudiant))
         .catch(error => res.status(400).send(error));
         resolve();
    });
    
  }, 
};