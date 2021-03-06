// contactController.js
// Import contact model
Contact = require('../models/contactModel');
// Get Parent Path
var path = require('path');
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
              title: 'Contactos',
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
                  }),
                  actions: [{
                    label: "Detalhes",
                    link: "./"+obj._id
                    },{
                    label: "Editar",
                    link: "./update/"+obj._id
                    },{
                    label: "Eliminar",
                    link: "./delete/"+obj._id
                    }
                  ]}
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
exports.details = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.render('details', {
          title: "Detalhes",
          delete: false,
          properties: Object.keys(Contact.schema.paths).map(key => {
                            return {
                              name: key,
                              value: contact[key]
                            }
                  })
        });
    });
};
//Handle update form
exports.updateform = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if(err)
          res.send(err);

        res.render('form', {
              title: "Contact",
              formTitle: "Contact",
              formAction: "Update",
              formMethod: "POST",
              update: true,
              updatelink: req.params.contact_id,
              properties: function () {
                var properties = [];
                Object.keys(Contact.schema.paths).map(key => {
                  if(key != "create_date" && key != "_id" && key != "__v" ){
                    var type = "text";
                    if(key == "phone")
                      type = typeof Contact.schema.tree.phone.default;
                    properties.push({type: type, name: key, value: contact[key], nameLower: key, isDropDown: false});
                  }
                })
                return properties;
              }
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
//Handle delete confirmation
exports.deletedetails = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
      if (err)
          res.send(err);
      res.render('details', {
        title: "Eliminar",
        delete: true,
        deletelink: req.params.contact_id,
        properties: Object.keys(Contact.schema.paths).map(key => {
                          return {
                            name: key,
                            value: contact[key]
                          }
                })
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
            status: true,
            message: 'Contact deleted'
        });
    });
};
