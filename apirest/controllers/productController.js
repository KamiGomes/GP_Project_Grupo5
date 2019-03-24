//productController.js
//Import product model
Product = require('../models/productModel');
//Import language file
var languagePack = require ('../language/portuguese');
//Get Parent path
var path = require ('path');
var parentPath = path.resolve(__dirname,'..');
//Index actions
exports.index = function (req, res){
    Product.get(function (err, products) {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.render('listall', {
              title: languagePack.titleProduct,
              welcomeMessage: languagePack.list,
              plus: languagePack.plusProduct,
              columns: Object.keys(Product.schema.paths).map(key => {
                        return {
                            name: languagePack.propertiesProduct[key]
                        }
              }),
              rows: products.map(obj => {
                return {
                  properties: Object.keys(Product.schema.paths).map(key => {
                    return{
                        value: obj[key]
                    }
                  }),
                  actions: [{
                    label: languagePack.labelDetails,
                    link: "./"+obj._id
                    },{
                    label: languagePack.labelEdit,
                    link: "./update/"+obj._id
                    },{
                    label: languagePack.labelDelete,
                    link: "./delete/"+obj._id
                    }
                  ]}
              })

        });
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
        res.render('form', {
            title: languagePack.titleProduct,
            formTitle: languagePack.insert,
            formAction: languagePack.titleProduct,
            formMethod: "POST",
            properties: function () {
              var properties = [];
              Object.keys(Product.schema.paths).map(key => {
                if(key != "create_date" && key != "_id" && key != "__v" ){
                  var type = "text";
                  if(key == "phone")
                    type = typeof Contact.schema.tree.phone.default;
                  properties.push({type: type, name: key, nameLower: key, isDropDown: false});
                }
              })
              return properties;
            }
        });
    });
};

// Handle create Product actions
exports.new = function (req, res) {
    var product = new Product();
    product.productID = req.body.productID;
    product.name = req.body.name;
    product.quantity = req.body.quantity;
    product.weekstock = req.body.weekstock;
    product.monthstock = req.body.monthstock;
    product.animaltypeFK = req.body.animaltypeFK;
    product.producttypeFK = req.body.producttypeFK;

// save the Product and check for errors
    product.save(function (err) {
        // if (err)
        //     res.json(err);

        res.json({
            message: 'New contact created!',
            data: product
        });
    });
};
