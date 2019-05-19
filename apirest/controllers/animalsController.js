//productController.js
//Import product model
AnimalsController = require('../models/animalscontrollerModel');
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
    AnimalsController.get(function (err, animalscontroller) {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.render('listall', responses.listAll(languagePack.titleAnimalsController,languagePack.list,
                      languagePack.plustitleAnimalsController,AnimalsController,animalscontroller,languagePack.propertiesAnimalsController,
                      'animalscontroller',languagePack.labelDetails,languagePack.labelEdit,languagePack.labelDelete));
    });
};

exports.dropdrown = function (req,res){
  AnimalsController.get(function (err, animalscontroller) {
      if (err){
          res.json({
              status: "error",
              message: err
          });
      }

      res.json(animalscontroller);
  });
};

//Get Insert Form
exports.create = function (req, res) {
    AnimalsController.get(function (err, animalscontroller) {
        if (err){
          res.json({
              status: "error",
              message: err,
          });
        }
        //
        res.render('form', responses.createForm(languagePack.propertiesAnimalsController,AnimalsController,
                      languagePack.titleAnimalsController,languagePack.Insert,"POST","animalscontroller",true,languagePack.createdAnimalsController));
    });
};

// Handle create Product actions
exports.new = function (req, res) {
    var animalscontroller = new AnimalsController();

    Object.keys(AnimalsController.schema.paths).map(key => {
      if(key != "create_date" && key != "_id" && key != "__v" ){
        animalscontroller[key] = req.body[key];
      }
    });

// save the Product and check for errors
    animalscontroller.save(function (err) {
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
    AnimalsController.findById(req.params.animalscontroller_id, function (err, animalscontroller) {
        if (err)
            res.send(err);
        res.render('details', responses.detailList(languagePack.titleAnimalsController,req.params.animalscontroller,AnimalsController,
                      languagePack.propertiesAnimalsController,animalscontroller));
    });
};

//Handle update form
exports.updateform = function (req, res) {
    AnimalsController.findById(req.params.animalscontroller_id, function (err, animalscontroller) {
        if(err)
          res.send(err);

        res.render('form', responses.createForm(languagePack.propertiesAnimalsController,AnimalsController,languagePack.titleAnimalsController,
                      languagePack.update,"POST","",false, languagePack.updatedAnimalsController, true, animalscontroller,req.params.animalscontroller_id));
    });
};

// Handle update contact info
exports.update = function (req, res) {

    AnimalsController.findById(req.params.animalscontroller_id, function (err, animalscontroller) {
          if (err)
              res.send(err);

          Object.keys(AnimalsController.schema.paths).map(key => {
              if(key != "create_date" && key != "_id" && key != "__v" ){
                  animalscontroller[key] = req.body[key];
              }
          });

          // save the contact and check for errors
          animalscontroller.save(function (err) {
              if (err)
                res.json(err);
              res.json({
                  message: 'Product Info updated',
                  data: animalscontroller
                });
              });
    });
};

//Handle delete confirmation
exports.deletedetails = function (req, res) {
  AnimalsController.findById(req.params.animalscontroller_id, function (err, animalscontroller) {
      if (err)
          res.send(err);

      res.render('details', responses.detailList(languagePack.titleAnimalsController,req.params.animalscontroller_id,AnimalsController,
                    languagePack.propertiesAnimalsController,animalscontroller, true));
  });
};

// Handle delete contact
exports.delete = function (req, res) {
    AnimalsController.remove({
        _id: req.params.animalscontroller_id
    }, function (err, animalscontroller) {
        if (err)
            res.send(err);

        res.json({
                    status: true,
                    message: languagePack.deletedAnimalsController
                });
            });
};
