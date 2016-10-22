import {
    Meteor
} from 'meteor/meteor';

this.Documents = new Mongo.Collection("documents");
// if we write this.Documents, then Documents is accesible from outside the file.
EditingUsers = new Mongo.Collection("editingUsers");

Meteor.startup(() => {
    if (!Documents.findOne()) {
        // no documents yet
        Documents.insert({
            title: "My New Document"
        });
    }
});

// methods that provide write access to the data
// we have to use it once we remove insecure package
Meteor.methods({
    // allows changes to the editing users collection 
    addEditingUser: function () {
        var doc, user, editingUsers;
        doc = Documents.findOne();
        if (!doc) {
            return;
        } // no doc give up
        if (!this.userId) {
            return;
        } // no logged in user give up
        // now I have a doc and possibly a user
        user = Meteor.user().profile;
        editingUsers = EditingUsers.findOne({
            docid: doc._id
        });
        if (!editingUsers) { // no editing users have been stored yet
            editingUsers = {
                docid: doc._id,
                users: {},
            };
        }
        user.lastEdit = new Date();
        editingUsers.users[this.userId] = user;
        // upsert Mongo command: insert or update if filter matches
        EditingUsers.upsert({
            _id: editingUsers._id
        }, editingUsers);
    }
})
