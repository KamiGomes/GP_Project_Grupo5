//productController.js
//Import product model
ProductType = require('../models/producttypeModel');
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
    ProductType.get(function (err, producttypes) {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.render('listall', responses.listAll(languagePack.titleProductType,languagePack.list,
                      languagePack.plustitleProductType,ProductType,producttypes,languagePack.propertiesProductType,
                      'producttypes',languagePack.labelDetails,languagePack.labelEdit,languagePack.labelDelete));
    });
};

exports.dropdrown = function (req,res){
  ProductType.get(function (err, producttypes) {
      if (err){
          res.json({
              status: "error",
              message: err
          });
      }

      res.json(producttypes);
  });
};

//Get Insert Form
exports.create = function (req, res) {
    ProductType.get(function (err, producttypes) {
        if (err){
          res.json({
              status: "error",
              message: err,
          });
        }
        //
        res.render('form', responses.createForm(languagePack.propertiesProductType,ProductType,
                      languagePack.titleProductType,languagePack.Insert,"POST","producttypes",true,languagePack.createdProductType));
    });
};

// Handle create Product actions
exports.new = function (req, res) {
    var producttype = new ProductType();

    Object.keys(ProductType.schema.paths).map(key => {
      if(key != "create_date" && key != "_id" && key != "__v" ){
        producttype[key] = req.body[key];
      }
    });

// save the Product and check for errors
    producttype.save(function (err) {
         if (err)
           res.json(err);
           res.json({
                       status: true,
                       message: languagePack.createdProductType
                   });
    });
};

exports.test = function (req, res){
  ProductType.getById(req.params.producttype_id, function (err, producttype) {
      if (err)
          res.send(err);
      res.json(producttype);
  });
}

// Handle view Product info
exports.details = function (req, res) {
    ProductType.findById(req.params.producttype_id, function (err, producttype) {
        if (err)
            res.send(err);
        res.render('details', responses.detailList(languagePack.titleProductType,req.params.product_id,ProductType,
                      languagePack.propertiesProductType,producttype));
    });
};

//Handle update form
exports.updateform = function (req, res) {
    ProductType.findById(req.params.producttype_id, function (err, producttype) {
        if(err)
          res.send(err);

        res.render('form', responses.createForm(languagePack.propertiesProductType,ProductType,languagePack.titleProductType,
                      languagePack.update,"POST","",false, languagePack.updatedProductType, true, producttype,req.params.producttype_id));
    });
};

// Handle update contact info
exports.update = function (req, res) {

    ProductType.findById(req.params.producttype_id, function (err, producttype) {
          if (err)
              res.send(err);

          Object.keys(ProductType.schema.paths).map(key => {
              if(key != "create_date" && key != "_id" && key != "__v" ){
                  producttype[key] = req.body[key];
              }
          });

          // save the contact and check for errors
          producttype.save(function (err) {
              if (err)
                res.json(err);
              res.json({
                  status: true,
                  message: languagePack.updatedProductType
                });
              });
    });
};

//Handle delete confirmation
exports.deletedetails = function (req, res) {
  ProductType.findById(req.params.producttype_id, function (err, producttype) {
      if (err)
          res.send(err);

      res.render('details', responses.detailList(languagePack.titleProductType,req.params.producttype_id,ProductType,
                    languagePack.propertiesProductType,producttype, true));
  });
};

// Handle delete contact
exports.delete = function (req, res) {
    ProductType.remove({
        _id: req.params.producttype_id
    }, function (err, producttype) {
        if (err)
            res.send(err);

        res.json({
                    status: true,
                    message: languagePack.deletedProductType
                });
            });
};
