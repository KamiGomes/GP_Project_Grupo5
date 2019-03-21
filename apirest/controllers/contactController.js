// contactController.js
// Import contact model
Contact = require('../models/contactModel');
// Get Parent Path
var path = require("path");
var parentPath = path.resolve(__dirname,'..');
// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        //res.json({data: contacts});
        res.render('listall', {
              title: 'Teste',
              welcomeMessage: 'Exemplo de Listagem com tabela',
              columns: Object.keys(Contact.schema.paths).map(key => {
                      return {
                          name: key
                      }
              }),
              rows: contacts.map(obj => {
                return {
                  properties: Object.keys(Contact.schema.paths).map(key => {
                    return{
                        value: obj[key]
                    }
                  })
                }
              })
        });
    });
};
exports.create = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err){
          res.json({
              status: "error",
              message: err,
          });
        }
        //
        res.render('form', {
            title: "Contact",
            formTitle: "Contact",
            formAction: "New",
            formMethod: "POST",
            properties: function () {
              var properties = [];
              Object.keys(Contact.schema.paths).map(key => {
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
}

// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    console.log(req.body.name);
    console.log(req.body.gender);
    console.log(req.body.email);
    console.log(req.body.phone);
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

// save the contact and check for errors
    contact.save(function (err) {
        // if (err)
        //     res.json(err);

res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {

Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);

contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;

// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);

res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};
