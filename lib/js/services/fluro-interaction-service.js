angular.module('fluro.interactions')
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