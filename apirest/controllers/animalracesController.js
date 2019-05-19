//productController.js
//Import product model
AnimalRaces = require('../models/animalraceModel');
//Import language file
var languagePack = require ('../language/portuguese');
//Import render Functions
var responses = require ('./resfunctions');
//Get Parent path
var path = require ('path');
var parentPath = path.resolve(__dirname,'..');

//Functions

//Index actions
exports.index = function (req, res){
    AnimalRaces.get(function (err, animalraces) {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.render('listall', responses.listAll(languagePack.titleAnimalRaces,languagePack.list,
                      languagePack.plustitleAnimalRaces,AnimalRaces,animalraces,languagePack.propertiesAnimalRaces,
                      'animalraces',languagePack.labelDetails,languagePack.labelEdit,languagePack.labelDelete));
    });
};

exports.dropdrown = function (req,res){
  AnimalRaces.get(function (err, animalraces) {
      if (err){
          res.json({
              status: "error",
              message: err
          });
      }

      res.json(animalraces);
  });
};

//Get Insert Form
exports.create = function (req, res) {
    AnimalRaces.get(function (err, animalraces) {
        if (err){
          res.json({
              status: "error",
              message: err,
          });
        }
        //
        res.render('form', responses.createForm(languagePack.propertiesAnimalRaces,AnimalRaces,
                      languagePack.titleAnimalRaces,languagePack.Insert,"POST","animalraces",true,languagePack.createdAnimalRaces));
    });
};

// Handle create Product actions
exports.new = function (req, res) {
    var animalraces = new AnimalRaces();

    Object.keys(AnimalRaces.schema.paths).map(key => {
      if(key != "create_date" && key != "_id" && key != "__v" ){
        animalraces[key] = req.body[key];
      }
    });

// save the Product and check for errors
    animalraces.save(function (err) {
        if (err)
             res.json(err);
        res.json({
                  status: true,
                  message: languagePack.createdProductType
                });
    });
};

// Handle view Product info
exports.details = function (req, res) {
    animalraces.findById(req.params.animalraces_id, function (err, animalraces) {
        if (err)
            res.send(err);
        res.render('details', responses.detailList(languagePack.titleanimalraces,req.params.animalraces,AnimalRaces,
                      languagePack.propertiesAnimalRaces,animalraces));
    });
};

//Handle update form
exports.updateform = function (req, res) {
    AnimalRaces.findById(req.params.animalraces_id, function (err, animalraces) {
        if(err)
          res.send(err);

        res.render('form', responses.createForm(languagePack.propertiesAnimalRaces,AnimalRaces,languagePack.titleAnimalRaces,
                      languagePack.update,"POST","",false, languagePack.updatedAnimalRaces, true, animalraces,req.params.animalraces_id));
    });
};

// Handle update contact info
exports.update = function (req, res) {

    AnimalRaces.findById(req.params.animalraces_id, function (err, animalraces) {
          if (err)
              res.send(err);

          Object.keys(AnimalRaces.schema.paths).map(key => {
              if(key != "create_date" && key != "_id" && key != "__v" ){
                  animalraces[key] = req.body[key];
              }
          });

          // save the contact and check for errors
          animalraces.save(function (err) {
              if (err)
                res.json(err);
              res.json({
                  message: 'Product Info updated',
                  data: animalraces
                });
              });
    });
};

//Handle delete confirmation
exports.deletedetails = function (req, res) {
  AnimalRaces.findById(req.params.animalraces_id, function (err, animalraces) {
      if (err)
          res.send(err);

      res.render('details', responses.detailList(languagePack.titleAnimalRaces,req.params.animalraces_id,AnimalRaces,
                    languagePack.propertiesAnimalRaces,animalraces, true));
  });
};

// Handle delete contact
exports.delete = function (req, res) {
    AnimalRaces.remove({
        _id: req.params.animalraces_id
    }, function (err, animalraces) {
        if (err)
            res.send(err);

        res.json({
                    status: true,
                    message: languagePack.deletedAnimalRaces
                });
            });
};
