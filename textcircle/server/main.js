import { Meteor } from 'meteor/meteor';

this.Documents = new Mongo.Collection("documents");
// if we write this.Documents, then Documents is accesible from outside.

Meteor.startup(() => {
  if (! Documents.findOne()) {
      // no documents yet
      Documents.insert({title: "My New Document"});
  }
});
