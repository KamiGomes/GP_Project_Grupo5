// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Import contact controller
var contactController = require('./controllers/contactController');
//Import product controller
var productController = require('./controllers/productController');
//Import product controller
var producttypeController = require('./controllers/producttypeController');
//Import product controller
var animaltypeController = require('./controllers/animaltypeController');
// Set default API response
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
    /*res.json({
       status: 'API Its Working',
       message: 'Hello World with Express and Nodemon',
    });*/
});
router.get('/Teste', function (req, res) {
    res.json({message: "ola"});
    /*res.json({
       status: 'API Its Working',
       message: 'Hello World with Express and Nodemon',
    });*/
});
// Contact routes
router.route('/contacts')
    .get(contactController.index);

//Route to call the Form to create a new Contact
router.route('/contacts/insert')
  .get(contactController.create)
  .post(contactController.new);

//Route to call the Delete Details
router.route('/contacts/delete/:contact_id')
  .get(contactController.deletedetails);

//Route to call the Update Form
router.route('/contacts/update/:contact_id')
  .get(contactController.updateform);

//Route to call when Update,Deleting, Details
router.route('/contacts/:contact_id')
  .get(contactController.details)
  .patch(contactController.update)
  .put(contactController.update)
  .delete(contactController.delete);

//Product routes
router.route('/products')
  .get(productController.index);

//Route to call the Form to create a new Product
router.route('/products/insert')
  .get(productController.create)
  .post(productController.new);

//Route to call the Delete Details
router.route('/products/delete/:product_id')
  .get(productController.deletedetails);

//Route to call the Update Form
router.route('/products/update/:product_id')
  .get(productController.updateform);

//route to call when Update,Deleting, details
router.route('/products/:product_id')
  .get(productController.details)
  .patch(productController.update)
  .put(productController.update)
  .delete(productController.delete);

//ProductType routes
router.route('/producttypes')
  .get(producttypeController.index);

router.route('/producttypes/dropdrown')
  .get(producttypeController.dropdrown);

//Route to call the Form to create a new Product
router.route('/producttypes/insert')
  .get(producttypeController.create)
  .post(producttypeController.new);

//Route to call the Delete Details
router.route('/producttypes/delete/:producttype_id')
  .get(producttypeController.deletedetails);

//Route to call the Update Form
router.route('/producttypes/update/:producttype_id')
  .get(producttypeController.updateform);

//route to call when Update,Deleting, details
router.route('/producttypes/:producttype_id')
  .get(producttypeController.details)
  .patch(producttypeController.update)
  .put(producttypeController.update)
  .delete(producttypeController.delete);

//Animaltype
router.route('/animaltypes')
  .get(animaltypeController.index);

router.route('/animaltypes/dropdrown')
  .get(animaltypeController.dropdrown);

//Route to call the Form to create a new Product
router.route('/animaltypes/insert')
  .get(animaltypeController.create)
  .post(animaltypeController.new);

//Route to call the Delete Details
router.route('/animaltypes/delete/:animaltypes_id')
  .get(animaltypeController.deletedetails);

//Route to call the Update Form
router.route('/animaltypes/update/:animaltypes_id')
  .get(animaltypeController.updateform);

//route to call when Update,Deleting, details
router.route('/animaltypes/:animaltypes_id')
  .get(animaltypeController.details)
  .patch(animaltypeController.update)
  .put(animaltypeController.update)
  .delete(animaltypeController.delete);
// Export API routes
module.exports = router;
