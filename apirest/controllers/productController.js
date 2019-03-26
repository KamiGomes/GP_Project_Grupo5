//productController.js
//Import product model
Product = require('../models/productModel');
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
    Product.get(function (err, products) {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.render('listall', responses.listAll(languagePack.titleProduct,languagePack.list,languagePack.plusProduct,Product
                      ,products,languagePack.propertiesProduct,'products',languagePack.labelDetails,languagePack.labelEdit,languagePack.labelDelete));
    });
};

//Get Insert Form
exports.create = function (req, res) {
    Product.get(function (err, products) {
        if (err){
          res.json({
              status: "error",
              message: err,
          });
        }
        //
        res.render('form', responses.createForm(languagePack.propertiesProduct,Product,languagePack.titleProduct,languagePack.Insert,"POST"));
    });
};

// Handle create Product actions
exports.new = function (req, res) {
    var product = new Product();

    Object.keys(Product.schema.paths).map(key => {
      if(key != "create_date" && key != "_id" && key != "__v" ){
        product[key] = req.body[key];
      }
    });

// save the Product and check for errors
    product.save(function (err) {
        // if (err)
        //     res.json(err);
        res.render('form', res.render('form', responses.createForm(languagePack.propertiesProduct,Product,
                      languagePack.titleProduct,languagePack.Insert,"POST", true, languagePack.createdProduct)));
    });
};

// Handle view Product info
exports.details = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        res.render('details', responses.detailList(languagePack.titleProduct,req.params.product_id,Product,languagePack.propertiesProduct,product));
    });
};
//Handle update form
exports.updateform = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if(err)
          res.send(err);

        res.render('form', responses.createForm(languagePack.propertiesProduct,Product,languagePack.titleProduct,
                      languagePack.update,"POST",false, languagePack.updatedProduct, true, product, req.params.product_id));
    });
};

// Handle update contact info
exports.update = function (req, res) {

    Product.findById(req.params.product_id, function (err, product) {
          if (err)
              res.send(err);

          Object.keys(Product.schema.paths).map(key => {
              if(key != "create_date" && key != "_id" && key != "__v" ){
                  product[key] = req.body[key];
              }
          });

          // save the contact and check for errors
          product.save(function (err) {
              if (err)
                res.json(err);
              res.json({
                  message: 'Product Info updated',
                  data: product
                });
              });
    });
};

//Handle delete confirmation
exports.deletedetails = function (req, res) {
  Product.findById(req.params.product_id, function (err, product) {
      if (err)
          res.send(err);

      res.render('details', responses.detailList(languagePack.titleProduct,req.params.product_id,Product,languagePack.propertiesProduct,product, true));
  });
};

// Handle delete contact
exports.delete = function (req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);

        res.json({
                    status: true,
                    message: languagePack.deletedProduct
                });
            });
};
