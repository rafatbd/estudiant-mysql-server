const Sequelize     = require('sequelize');
const Op            = Sequelize.Op;
const desplacament = require('../models').desplacament;
const estudiant    = require('../models').estudiant;
const facultat     = require('../models').facultat;
module.exports = {
  create(req, res) {
          // Estudiant
          return new Promise((resolve, reject) => {
            const responseEstudiant = estudiant.findOne({
                 where: {
                     [Op.or]: [{
                          nom: req.body.estudiant
                     },{
                          id: req.body.estudiant
                     }]
                 }
            });
            // Facultat
            const responseFacultat = facultat.findOne({
                 where: {
                     [Op.or]: [{
                          nom: req.body.facultat
                     },{
                          id: req.body.facultat
                     }]
                 }
            });
            Promise
            .all ([responseEstudiant, responseFacultat])
            .then(responses => {
                    desplacament
                     .create ({
                          estudiant_id: responses[0].id,
                          facultat_id: responses[1].id,
                          distancia: req.body.distancia,
                          data: req.body.data 
                     })
                     .then(desplacament => res.status(200).send(desplacament))
             })
             .catch(error => res.status(400).send(error));
           resolve();
          });
     },
  list(_, res) {
    return new Promise((resolve, reject) => {
    
     desplacament.findAll({
           include: [{
                model: estudiant,
                as: 'estudiant'
           },{
                model: facultat,
                as: 'facultat'
           }]
     })
     .then(desplacament => res.status(200).send(desplacament))
     .catch(error => res.status(400).send(error));
     resolve();
    });
  },

  find (req, res) {
    return new Promise((resolve, reject) => {

     desplacament.findAll({
          where: {
                id: req.params.id
          },
          include: [{
                model: estudiant,
                as: 'estudiant'
           },{
                model: facultat,
                as: 'facultat'
           }]
     })
     .then(desplacament => res.status(200).send(desplacament))
     .catch(error => res.status(400).send(error));
     resolve();
    });
  },
  destroy (req, res) {
    return new Promise((resolve, reject) => {

     desplacament.destroy({
          where: {
                id: req.params.id,
          },
          include: [{
                model: estudiant,
                as: 'estudiant'
           },{
                model: facultat,
                as: 'facultat'
           }]
     }).then(()=>{
        desplacament.findAll({
           include: [{
                model: estudiant,
                as: 'estudiant'
           },{
                model: facultat,
                as: 'facultat'
          }]
        })
        .then(desplacament => res.status(200).send(desplacament))
        .catch(error => res.status(400).send(error));
        resolve();

       });
    });
  },
  update (req, res){
    return new Promise((resolve, reject) => {

    desplacament.update(
        {
            distancia: req.body.distancia,
            data: req.body.data
        },
        {
            returning: true,
            where: {
                id: req.params.id,
            },
          include: [{
                model: estudiant,
                as: 'estudiant'
           },{
                model: facultat,
                as: 'facultat'
           }]
        }
    ).then(()=>{
        desplacament.findAll({
             include: [{
                  model: estudiant,
                  as: 'estudiant'
             },{
                  model: facultat,
                  as: 'facultat'
             }]
       })
       .then(desplacament => res.status(200).send(desplacament))
       .catch(error => res.status(400).send(error));
       resolve();

    });
  });
    
  }, 

};