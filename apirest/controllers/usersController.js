//productController.js
//Import product model
UsersController = require('../models/userscontrollerModel');
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
    UsersController.get(function (err, userscontroller) {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.render('listall', responses.listAll(languagePack.titleUsersController,languagePack.list,
                      languagePack.plustitleUsersController,UsersController,userscontroller,languagePack.propertiesUsersController,
                      'userscontroller',languagePack.labelDetails,languagePack.labelEdit,languagePack.labelDelete));
    });
};

exports.dropdrown = function (req,res){
  UsersController.get(function (err, userscontroller) {
      if (err){
          res.json({
              status: "error",
              message: err
          });
      }

      res.json(userscontroller);
  });
};

//Get Insert Form
exports.create = function (req, res) {
    UsersController.get(function (err, userscontroller) {
        if (err){
          res.json({
              status: "error",
              message: err,
          });
        }
        //
        res.render('form', responses.createForm(languagePack.propertiesUsersController,UsersController,
                      languagePack.titleUsersController,languagePack.Insert,"POST","userscontroller",true,languagePack.createdUsersController));
    });
};

// Handle create Product actions
exports.new = function (req, res) {
    var userscontroller = new UsersController();

    Object.keys(UsersController.schema.paths).map(key => {
      if(key != "create_date" && key != "_id" && key != "__v" ){
        userscontroller[key] = req.body[key];
      }
    });

// save the Product and check for errors
    userscontroller.save(function (err) {
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
    UsersController.findById(req.params.userscontroller_id, function (err, userscontroller) {
        if (err)
            res.send(err);
        res.render('details', responses.detailList(languagePack.titleUsersController,req.params.userscontroller,UsersController,
                      languagePack.propertiesUsersController,userscontroller));
    });
};

//Handle update form
exports.updateform = function (req, res) {
    UsersController.findById(req.params.userscontroller_id, function (err, userscontroller) {
        if(err)
          res.send(err);

        res.render('form', responses.createForm(languagePack.propertiesUsersController,UsersController,languagePack.titleUsersController,
                      languagePack.update,"POST","",false, languagePack.updatedUsersController, true, userscontroller,req.params.userscontroller_id));
    });
};

// Handle update contact info
exports.update = function (req, res) {

    UsersController.findById(req.params.userscontroller_id, function (err, userscontroller) {
          if (err)
              res.send(err);

          Object.keys(UsersController.schema.paths).map(key => {
              if(key != "create_date" && key != "_id" && key != "__v" ){
                  userscontroller[key] = req.body[key];
              }
          });

          // save the contact and check for errors
          userscontroller.save(function (err) {
              if (err)
                res.json(err);
              res.json({
                  message: 'Product Info updated',
                  data: userscontroller
                });
              });
    });
};

//Handle delete confirmation
exports.deletedetails = function (req, res) {
  UsersController.findById(req.params.userscontroller_id, function (err, userscontroller) {
      if (err)
          res.send(err);

      res.render('details', responses.detailList(languagePack.titleUsersController,req.params.userscontroller_id,UsersController,
                    languagePack.propertiesUsersController,userscontroller, true));
  });
};

// Handle delete contact
exports.delete = function (req, res) {
    UsersController.remove({
        _id: req.params.userscontroller_id
    }, function (err, userscontroller) {
        if (err)
            res.send(err);

        res.json({
                    status: true,
                    message: languagePack.deletedUsersController
                });
            });
};
