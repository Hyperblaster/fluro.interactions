

angular.module('fluro.interactions', [
	'fluro.util',
	'fluro.content',
]);
angular.module('fluro.interactions')


.service('FluroInteraction', function(Fluro, FluroContent) {

    var controller = {};
    
    //////////////////////////////////////////////////

    controller.interact = function(title, key, interactionData) {


        /////////////////////////////////////////////

        //Create a submission to send to our interaction endpoint
        var submission = {};

        /////////////////////////////////////////////

        //Add the title
        submission.title = title;

        /////////////////////////////////////////////

        //ID the definition used to translate this interaction
        submission.key = key;

        /////////////////////////////////////////////

        /**
         * _contact
         * _contact can be provided as a full object or an id of an existing contact
         */
        if(interactionData._contact) {
            submission.contact = interactionData._contact;
        } else {
            submission.contact = {};
        }

        /////////////////////////////////////////////
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        
        //First Name
        if(interactionData._firstName) {
            submission.contact.firstName = interactionData._firstName;
        }

        //Last Name
        if(interactionData._lastName) {
            submission.contact.lastName = interactionData._lastName;
        }

        //Email Address
        if(interactionData._email) {
            submission.contact.emails = [interactionData._email];
        }

        //Email Address (Multiple)
        if(interactionData._emails) {
            submission.contact.emails = interactionData._emails;
        }

        //Phone Number
        if(interactionData._phoneNumber) {
            submission.contact.phoneNumbers = [interactionData._phoneNumber];
        }

        //Phone Number (Multiple)
        if(interactionData._phoneNumbers) {
            submission.contact.phoneNumbers = interactionData._phoneNumbers;
        }

        //Date of birth
        if(interactionData._dob) {
            submission.contact.dob = interactionData._dob;
        }

        //Gender
        if(interactionData._gender) {
            submission.contact.gender = interactionData._gender;
        }

        /////////////////////////////////////////////
        /////////////////////////////////////////////

        //And include the interaction data
        submission.interaction = interactionData;

        /////////////////////////////////////////////
        
        console.log('Submit interaction', title, key, submission)

        /////////////////////////////////////////////

        //Return the promise
        return FluroContent.endpoint('interact/' + key).save(submission).$promise;
    }

    //////////////////////////////////////////////////

    return controller;
});
/*
.service('FluroInteractionService', function(Fluro, FluroContent) {

    //////////////////////////////////////////////////

    var controller = {}

    //////////////////////////

    //Submit and send back the user
    controller.createInteraction = function(title, contact, definitionKey, submission) {
        console.log('Submit interaction', definitionKey, contact, submission)

        var interaction = {}
        interaction.title = title;
        if(contact) {
            interaction.contact = contact;
        }
        interaction.data = submission;
        interaction.key =
        interaction.definition = definitionKey;

        //Save
        return FluroContent.resource(definitionKey).save(interaction).$promise;
    }


    //////////////////////////////////////////////////

    return controller;


});

*/
angular.module('fluro.interactions')
.service('FluroValidate', function() {

    var controller = {};

    /////////////////////////////////////////////////////

    controller.validate = function(entry, field) {

        //Required
        if (field.minimum > 0 && !entry) {
            //console.log(field.key, 'is required', entry)
            return false;
        }

        //Check if the value is an array or a value
        if (_.isArray(entry)) {

            //Run tests on array
            var array = entry;



            if (field.minimum == 1 && field.maximum == 1 && field.type != 'array') {
                //console.log(field.key, 'array provided when a single value was expected')
                return false; //Require a singular value not an array
            }

            if (array.length < field.minimum) {
                //console.log(field.key, 'requires at least', field.minimum, 'values')
                return false;
            }

            if(field.maximum) {
                if (array.length > field.maximum) {
                    //console.log(field.key, 'requires less than', field.maximum, 'values')
                    return false;
                }
            }

            /////////////////////////////

            var invalidEntries = _.filter(array, function(obj) {

                var allowed = true;

                //If there is a specified list of allowed values
                if (field.allowedValues && field.allowedValues.length) {
                    allowed = _.contains(field.allowedValues, obj);
                }

                //Check if each entry is a valid value
                var correctType = controller.validateType(obj, field.type);

                if (allowed && correctType) {
                    //console.log('CORRECT TYPE', allowed, correctType)
                    return false;
                } else {
                    //console.log(obj, 'is not a valid value for ', field.key, 'TESTING', allowed, field.type)
                    return true;
                }
            });


            if (invalidEntries.length) {
                //console.log('Invalid', invalidEntries.length)
                return false;
            }

        } else {

            //Check against singular value
            if (field.minimum > 1) {
                //console.log(field.key, 'Must be provided as an array type value')
                //Must have an array
                return false;
            }

            if (field.minimum > 0) {
                var correctType = controller.validateType(entry, field.type);
                if (!correctType) {
                    ////console.log(field.key, 'Must be provided as an ' + field.type + ' type value')
                    return false;
                }
            }

            //If there is a specified list of allowed values
            if (field.allowedValues && field.allowedValues.length) {
                var allowed = _.contains(field.allowedValues, entry);

                if (!allowed) {
                    //console.log(entry, 'is not a valid value for field', field.key)
                    return false;
                }
            }
        }


        return true;

    }

    /////////////////////////////////////////////////////

    controller.validateType = function(field, fieldType) {
        switch (fieldType.toLowerCase()) {
            case 'reference':
                if (_.isString(field)) {
                    return validator.isMongoId(field);
                } else {
                    return validator.isMongoId(field._id);
                }
                break;
            case 'email':
                return validator.isEmail(field);
                break;
            case 'url':
                return validator.isURL(field);
                break;
            case 'array':
                return _.isArray(field);
                break;
            case 'number':
                return validator.isNumeric(field);
                break;
            case 'integer':
                return validator.isInt(field);
                break;
            case 'float':
                return validator.isFloat(field);
                break;
            case 'string':
                return _.isString(field);
                break;
            case 'object':
                return _.isObject(field);
                break;
            case 'date':
                return _.isDate(field);
                break;
            case 'boolean':
                return _.isBoolean(field);
                break;
        }
    }

    /////////////////////////////////////////////////////
    return controller;


});