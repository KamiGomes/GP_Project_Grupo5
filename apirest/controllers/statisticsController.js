//productController.js
//Import product model
StatisticsController = require('../models/statisticscontrollerModel');
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
    StatisticsController.get(function (err, statisticscontroller) {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.render('listall', responses.listAll(languagePack.titleStatisticsController,languagePack.list,
                      languagePack.plustitleStatisticsController,StatisticsController,statisticscontroller,languagePack.propertiesStatisticsController,
                      'statisticscontroller',languagePack.labelDetails,languagePack.labelEdit,languagePack.labelDelete));
    });
};

exports.dropdrown = function (req,res){
  StatisticsController.get(function (err, statisticscontroller) {
      if (err){
          res.json({
              status: "error",
              message: err
          });
      }

      res.json(statisticscontroller);
  });
};

//Get Insert Form
exports.create = function (req, res) {
    StatisticsController.get(function (err, statisticscontroller) {
        if (err){
          res.json({
              status: "error",
              message: err,
          });
        }
        //
        res.render('form', responses.createForm(languagePack.propertiesStatisticsController,StatisticsController,
                      languagePack.titleStatisticsController,languagePack.Insert,"POST","statisticscontroller",true,languagePack.createdStatisticsController));
    });
};

// Handle create Product actions
exports.new = function (req, res) {
    var statisticscontroller = new StatisticsController();

    Object.keys(StatisticsController.schema.paths).map(key => {
      if(key != "create_date" && key != "_id" && key != "__v" ){
        statisticscontroller[key] = req.body[key];
      }
    });

// save the Product and check for errors
    statisticscontroller.save(function (err) {
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
    StatisticsController.findById(req.params.statisticscontroller_id, function (err, statisticscontroller) {
        if (err)
            res.send(err);
        res.render('details', responses.detailList(languagePack.titleStatisticsController,req.params.statisticscontroller,StatisticsController,
                      languagePack.propertiesStatisticsController,statisticscontroller));
    });
};

//Handle update form
exports.updateform = function (req, res) {
    StatisticsController.findById(req.params.statisticscontroller_id, function (err, statisticscontroller) {
        if(err)
          res.send(err);

        res.render('form', responses.createForm(languagePack.propertiesStatisticsController,StatisticsController,languagePack.titleStatisticsController,
                      languagePack.update,"POST","",false, languagePack.updatedStatisticsController, true, statisticscontroller,req.params.statisticscontroller_id));
    });
};

// Handle update contact info
exports.update = function (req, res) {

    StatisticsController.findById(req.params.statisticscontroller_id, function (err, statisticscontroller) {
          if (err)
              res.send(err);

          Object.keys(StatisticsController.schema.paths).map(key => {
              if(key != "create_date" && key != "_id" && key != "__v" ){
                  statisticscontroller[key] = req.body[key];
              }
          });

          // save the contact and check for errors
          statisticscontroller.save(function (err) {
              if (err)
                res.json(err);
              res.json({
                  message: 'Product Info updated',
                  data: statisticscontroller
                });
              });
    });
};

//Handle delete confirmation
exports.deletedetails = function (req, res) {
  StatisticsController.findById(req.params.statisticscontroller_id, function (err, statisticscontroller) {
      if (err)
          res.send(err);

      res.render('details', responses.detailList(languagePack.titleStatisticsController,req.params.statisticscontroller_id,StatisticsController,
                    languagePack.propertiesStatisticsController,statisticscontroller, true));
  });
};

// Handle delete contact
exports.delete = function (req, res) {
    StatisticsController.remove({
        _id: req.params.statisticscontroller_id
    }, function (err, statisticscontroller) {
        if (err)
            res.send(err);

        res.json({
                    status: true,
                    message: languagePack.deletedStatisticsController
                });
            });
};
