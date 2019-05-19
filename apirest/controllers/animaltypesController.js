//productController.js
//Import product model
AnimalType = require('../models/animaltypeModel');
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
    AnimalType.get(function (err, animaltypes) {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.render('listall', responses.listAll(languagePack.titleAnimalType,languagePack.list,
                      languagePack.plustitleAnimalType,AnimalType,animaltypes,languagePack.propertiesAnimalType,
                      'animaltypes',languagePack.labelDetails,languagePack.labelEdit,languagePack.labelDelete));
    });
};

exports.dropdrown = function (req,res){
  AnimalType.get(function (err, animaltypes) {
      if (err){
          res.json({
              status: "error",
              message: err
          });
      }

      res.json(animaltypes);
  });
};

//Get Insert Form
exports.create = function (req, res) {
    AnimalType.get(function (err, animaltypes) {
        if (err){
          res.json({
              status: "error",
              message: err,
          });
        }
        //
        res.render('form', responses.createForm(languagePack.propertiesAnimalType,AnimalType,
                      languagePack.titleAnimalType,languagePack.Insert,"POST","animaltypes",true,languagePack.createdAnimalType));
    });
};

// Handle create Product actions
exports.new = function (req, res) {
    var animaltype = new AnimalType();

    Object.keys(AnimalType.schema.paths).map(key => {
      if(key != "create_date" && key != "_id" && key != "__v" ){
        animaltype[key] = req.body[key];
      }
    });

// save the Product and check for errors
    animaltype.save(function (err) {
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
    AnimalType.findById(req.params.animaltype_id, function (err, animaltype) {
        if (err)
            res.send(err);
        res.render('details', responses.detailList(languagePack.titleAnimalType,req.params.animaltype,AnimalType,
                      languagePack.propertiesAnimalType,animaltype));
    });
};

//Handle update form
exports.updateform = function (req, res) {
    AnimalType.findById(req.params.animaltype_id, function (err, animaltype) {
        if(err)
          res.send(err);

        res.render('form', responses.createForm(languagePack.propertiesAnimalType,AnimalType,languagePack.titleAnimalType,
                      languagePack.update,"POST","",false, languagePack.updatedAnimalType, true, animaltype,req.params.animaltype_id));
    });
};

// Handle update contact info
exports.update = function (req, res) {

    AnimalType.findById(req.params.animaltype_id, function (err, animaltype) {
          if (err)
              res.send(err);

          Object.keys(AnimalType.schema.paths).map(key => {
              if(key != "create_date" && key != "_id" && key != "__v" ){
                  animaltype[key] = req.body[key];
              }
          });

          // save the contact and check for errors
          animaltype.save(function (err) {
              if (err)
                res.json(err);
              res.json({
                  message: 'Product Info updated',
                  data: animaltype
                });
              });
    });
};

//Handle delete confirmation
exports.deletedetails = function (req, res) {
  AnimalType.findById(req.params.animaltype_id, function (err, animaltype) {
      if (err)
          res.send(err);

      res.render('details', responses.detailList(languagePack.titleAnimalType,req.params.animaltype_id,AnimalType,
                    languagePack.propertiesAnimalType,animaltype, true));
  });
};

// Handle delete contact
exports.delete = function (req, res) {
    AnimalType.remove({
        _id: req.params.animaltype_id
    }, function (err, animaltype) {
        if (err)
            res.send(err);

        res.json({
                    status: true,
                    message: languagePack.deletedAnimalType
                });
            });
};
