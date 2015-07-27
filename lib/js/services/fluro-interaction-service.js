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

        //Phone Number
        if(interactionData._phoneNumber) {
            submission.contact.phoneNumbers = [interactionData._phoneNumber];
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