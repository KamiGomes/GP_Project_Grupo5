// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Import contact controller
var contactController = require('./controllers/contactController');
// Set default API response
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
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

// Export API routes
module.exports = router;
