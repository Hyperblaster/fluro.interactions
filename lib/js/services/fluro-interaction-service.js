angular.module('fluro.interactions')


.service('FluroInteraction', function(Fluro, FluroContent) {

    var controller = {};
    
    //////////////////////////////////////////////////

    controller.interact = function(title, key, interactionData, payment, event) {



        /////////////////////////////////////////////

        //Create a submission to send to our interaction endpoint
        var submission = {};

        /////////////////////////////////////////////

        //Add the title
        submission.title = title;

        /////////////////////////////////////////////

        //ID the definition used to translate this interaction
        submission.key = key;

        //Link to a specified event
        if(event && event.length) {
           submission.event = event;
        }

        /////////////////////////////////////////////

        if(payment) {
            submission.payment = payment;
        }

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

        /**
         * _contacts
         * _contacts can be provided as an array of objects or _id's of existing contacts
         */
        if(interactionData._contacts) {
            submission.contacts = interactionData._contacts;
        } else {
            submission.contacts = [];
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