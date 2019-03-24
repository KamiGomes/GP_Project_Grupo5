
exports.listAll = function (titleUse,welcomeMessage,plusUse,SchemaClass,objects,propertiesUse,link,labelDetails,labelEdit,labelDelete) {
  return {
        title: titleUse,
        welcomeMessage: welcomeMessage,
        plus: plusUse,
        columns: Object.keys(SchemaClass.schema.paths).map(key => {
                  return {
                      name: propertiesUse[key]
                  }
        }),
        rows: objects.map(obj => {
          return {
            properties: Object.keys(SchemaClass.schema.paths).map(key => {
              return{
                  value: obj[key]
              }
            }),
            actions: [{
              label: labelDetails,
              link: "./"+link+"/"+obj._id
              },{
              label: labelEdit,
              link: "./"+link+"/update/"+obj._id
              },{
              label: labelDelete,
              link: "./"+link+"/delete/"+obj._id
              }
            ]}
        })

  }
};

exports.createForm = function (propertiesUse,SchemaClass,titleUse,formTitle,method,created = false, message = "", update = false, object = null){
  var toReturn = {}

  return {
      title: titleUse,
      formTitle: formTitle,
      formAction: titleUse,
      created: created,
      update: update,
      message: message,
      formMethod: method,
      properties: function () {
        var properties = [];
        Object.keys(SchemaClass.schema.paths).map(key => {
          if(key != "_id" && key != "__v" ){
            if(object == null) {
              properties.push({type: SchemaClass.schema.paths[key].instance, name: propertiesUse[key], nameLower: key, isDropDown: false});
            }
            else {
              properties.push({type: SchemaClass.schema.paths[key].instance, name: propertiesUse[key], value: object[key],nameLower: key, isDropDown: false});
            }
          }
        })
        return properties;
      }
  }
};

exports.detailList = function (title,id,SchemaClass,properties,object, toDelete = false) {
  return {
      title: title,
      delete: toDelete,
      updateLink: id,
      deletelink: id,
      properties: function () {
        var propertiesToReturn = [];
        Object.keys(SchemaClass.schema.paths).map(key => {
              if(key != "_id" && key != "__v" )
              propertiesToReturn.push({
                          name: properties[key],
                          value: object[key]
                        });
              }
            );
        return propertiesToReturn;
    }
  }
};
