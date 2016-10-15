this.Documents = new Mongo.Collection("documents");
// if we write this.Documents, then Documents is accesible from outside.

Template.editor.helpers({
    docid: function () {
        // we pass a shared document once it is available
        var doc = Documents.findOne();
        if (doc) {
            return doc._id;
        } else {
            return null;
        }
    },

    config: function () {
        return function (editor) {
            // here we get access to the ShareJS editor.
            editor.on("change", function (cm_editor, info) {
                // we inject new code to the iframe
                $('#viewer_id').contents().find("html").html(cm_editor.getValue());
            })
        }
    }
});
