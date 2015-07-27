angular.module('fluro.interactions')


.service('FluroInteraction', function(Fluro, FluroContent) {

    var controller = {};
    
    //////////////////////////////////////////////////

    controller.interact = function(title, definitionKey, interactionData) {

        /////////////////////////////////////////////

        //Create a submission to send to our interaction endpoint
        var submission = {};

        /////////////////////////////////////////////

        //ID the definition used to translate this interaction
        submission.key = definitionKey;

        /////////////////////////////////////////////

        //Create the contact information
        submission.contact = {

        }

        /////////////////////////////////////////////

        //And include the interaction data
        submission.interaction = interactionData;


        //Return the promise
        return FluroContent.endpoint('interact').save(submission).$promise;
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