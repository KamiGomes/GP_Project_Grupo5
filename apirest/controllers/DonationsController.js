//productController.js
//Import product model
DonationsController = require('../models/donationscontrollerModel');
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
    DonationsController.get(function (err, donationscontroller) {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.render('listall', responses.listAll(languagePack.titleDonationsController,languagePack.list,
                      languagePack.plustitleDonationsController,DonationsController,donationscontroller,languagePack.propertiesDonationsController,
                      'donationscontroller',languagePack.labelDetails,languagePack.labelEdit,languagePack.labelDelete));
    });
};

exports.dropdrown = function (req,res){
  DonationsController.get(function (err, donationscontroller) {
      if (err){
          res.json({
              status: "error",
              message: err
          });
      }

      res.json(donationscontroller);
  });
};

//Get Insert Form
exports.create = function (req, res) {
    DonationsController.get(function (err, donationscontroller) {
        if (err){
          res.json({
              status: "error",
              message: err,
          });
        }
        //
        res.render('form', responses.createForm(languagePack.propertiesDonationsController,DonationsController,
                      languagePack.titleDonationsController,languagePack.Insert,"POST","donationscontroller",true,languagePack.createdDonationsController));
    });
};

// Handle create Product actions
exports.new = function (req, res) {
    var donationscontroller = new DonationsController();

    Object.keys(DonationsController.schema.paths).map(key => {
      if(key != "create_date" && key != "_id" && key != "__v" ){
        donationscontroller[key] = req.body[key];
      }
    });

// save the Product and check for errors
    donationscontroller.save(function (err) {
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
    DonationsController.findById(req.params.donationscontroller_id, function (err, donationscontroller) {
        if (err)
            res.send(err);
        res.render('details', responses.detailList(languagePack.titleDonationsController,req.params.donationscontroller,DonationsController,
                      languagePack.propertiesDonationsController,donationscontroller));
    });
};

//Handle update form
exports.updateform = function (req, res) {
    DonationsController.findById(req.params.donationscontroller_id, function (err, donationscontroller) {
        if(err)
          res.send(err);

        res.render('form', responses.createForm(languagePack.propertiesDonationsController,DonationsController,languagePack.titleDonationsController,
                      languagePack.update,"POST","",false, languagePack.updatedDonationsController, true, donationscontroller,req.params.donationscontroller_id));
    });
};

// Handle update contact info
exports.update = function (req, res) {

    DonationsController.findById(req.params.donationscontroller_id, function (err, donationscontroller) {
          if (err)
              res.send(err);

          Object.keys(DonationsController.schema.paths).map(key => {
              if(key != "create_date" && key != "_id" && key != "__v" ){
                  donationscontroller[key] = req.body[key];
              }
          });

          // save the contact and check for errors
          donationscontroller.save(function (err) {
              if (err)
                res.json(err);
              res.json({
                  message: 'Product Info updated',
                  data: donationscontroller
                });
              });
    });
};

//Handle delete confirmation
exports.deletedetails = function (req, res) {
  DonationsController.findById(req.params.donationscontroller_id, function (err, donationscontroller) {
      if (err)
          res.send(err);

      res.render('details', responses.detailList(languagePack.titleDonationsController,req.params.donationscontroller_id,DonationsController,
                    languagePack.propertiesDonationsController,donationscontroller, true));
  });
};

// Handle delete contact
exports.delete = function (req, res) {
    DonationsController.remove({
        _id: req.params.donationscontroller_id
    }, function (err, donationscontroller) {
        if (err)
            res.send(err);

        res.json({
                    status: true,
                    message: languagePack.deletedDonationsController
                });
            });
};
