//productController.js
//Import product model
RolesController = require('../models/rolescontrollerModel');
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
    RolesController.get(function (err, rolescontroller) {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.render('listall', responses.listAll(languagePack.titleRolesController,languagePack.list,
                      languagePack.plustitleRolesController,RolesController,rolescontroller,languagePack.propertiesRolesController,
                      'rolescontroller',languagePack.labelDetails,languagePack.labelEdit,languagePack.labelDelete));
    });
};

exports.dropdrown = function (req,res){
  RolesController.get(function (err, rolescontroller) {
      if (err){
          res.json({
              status: "error",
              message: err
          });
      }

      res.json(rolescontroller);
  });
};

//Get Insert Form
exports.create = function (req, res) {
    RolesController.get(function (err, rolescontroller) {
        if (err){
          res.json({
              status: "error",
              message: err,
          });
        }
        //
        res.render('form', responses.createForm(languagePack.propertiesRolesController,RolesController,
                      languagePack.titleRolesController,languagePack.Insert,"POST","rolescontroller",true,languagePack.createdRolesController));
    });
};

// Handle create Product actions
exports.new = function (req, res) {
    var rolescontroller = new RolesController();

    Object.keys(RolesController.schema.paths).map(key => {
      if(key != "create_date" && key != "_id" && key != "__v" ){
        rolescontroller[key] = req.body[key];
      }
    });

// save the Product and check for errors
    rolescontroller.save(function (err) {
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
    RolesController.findById(req.params.rolescontroller_id, function (err, rolescontroller) {
        if (err)
            res.send(err);
        res.render('details', responses.detailList(languagePack.titleRolesController,req.params.rolescontroller,RolesController,
                      languagePack.propertiesRolesController,rolescontroller));
    });
};

//Handle update form
exports.updateform = function (req, res) {
    RolesController.findById(req.params.rolescontroller_id, function (err, rolescontroller) {
        if(err)
          res.send(err);

        res.render('form', responses.createForm(languagePack.propertiesRolesController,RolesController,languagePack.titleRolesController,
                      languagePack.update,"POST","",false, languagePack.updatedRolesController, true, rolescontroller,req.params.rolescontroller_id));
    });
};

// Handle update contact info
exports.update = function (req, res) {

    RolesController.findById(req.params.rolescontroller_id, function (err, rolescontroller) {
          if (err)
              res.send(err);

          Object.keys(RolesController.schema.paths).map(key => {
              if(key != "create_date" && key != "_id" && key != "__v" ){
                  rolescontroller[key] = req.body[key];
              }
          });

          // save the contact and check for errors
          rolescontroller.save(function (err) {
              if (err)
                res.json(err);
              res.json({
                  message: 'Product Info updated',
                  data: rolescontroller
                });
              });
    });
};

//Handle delete confirmation
exports.deletedetails = function (req, res) {
  RolesController.findById(req.params.rolescontroller_id, function (err, rolescontroller) {
      if (err)
          res.send(err);

      res.render('details', responses.detailList(languagePack.titleRolesController,req.params.rolescontroller_id,RolesController,
                    languagePack.propertiesRolesController,rolescontroller, true));
  });
};

// Handle delete contact
exports.delete = function (req, res) {
    RolesController.remove({
        _id: req.params.rolescontroller_id
    }, function (err, rolescontroller) {
        if (err)
            res.send(err);

        res.json({
                    status: true,
                    message: languagePack.deletedRolesController
                });
            });
};
