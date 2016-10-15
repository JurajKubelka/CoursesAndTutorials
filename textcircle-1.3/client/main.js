this.Documents = new Mongo.Collection("documents");
// if we write this.Documents, then Documents is accesible from outside.

Template.editor.helpers({
    docid: function () {
        var doc = Documents.findOne();
        if (doc) {
            return doc._id;
        } else {
            return null;
        }
    }
});

Template.date_display.helpers({
    current_date: function () {
        return Session.get("current_date");
    }
});
