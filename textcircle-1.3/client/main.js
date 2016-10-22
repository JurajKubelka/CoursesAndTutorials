// this collection stores all the documents 
// if we write this.Documents, then Documents is accesible from outside the file.
this.Documents = new Mongo.Collection("documents");
// this collection stores sets of users that are editing documents
EditingUsers = new Mongo.Collection("editingUsers");


Template.editor.helpers({
    // return the id of the first document you can find
    docid: function () {
        // we pass a shared document once it is available
        var doc = Documents.findOne();
        if (doc) {
            return doc._id;
        } else {
            return undefined;
        }
    },
    // configure the CodeMirror editor
    config: function () {
        return function (editor) {
            // here we get access to the ShareJS editor.
            editor.setOption("lineNumbers", true);
            editor.setOption("theme", "cobalt");
            // set a callback that gets triggered whenever the user
            // makes a change in the code editing window
            editor.on("change", function (cm_editor, info) {
                // send the current code over to the iframe for rendering
                $("#viewer_id").contents().find("html").html(cm_editor.getValue());
                // add editing user to the database collection
                Meteor.call("addEditingUser");
            });
        };
    }
});

Template.editingUsers.helpers({
    // retrieve a set of users that are editing this document
    users: function () {
        var doc, editingUsers, users;
        doc = Documents.findOne();
        if (!doc) {
            return;
        } // give up
        editingUsers = EditingUsers.findOne({
            docid: doc._id
        });
        if (!editingUsers) {
            return;
        } // give up
        users = new Array();
        var i = 0;
        for (var user_id in editingUsers.users) {
            users[i] = fixObjectKeys(editingUsers.users[user_id]);
            i++;
        }
        return users;
    }
})

// this renames object keys by removing hyphens to make the compatible 
// with spacebars. 
function fixObjectKeys(obj) {
    var newObj = {};
    for (key in obj) {
        var key2 = key.replace("-", "");
        newObj[key2] = obj[key];
    }
    return newObj;
}
