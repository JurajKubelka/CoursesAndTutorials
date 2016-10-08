import {
    Meteor
} from 'meteor/meteor';

Images = new Mongo.Collection("images");

Meteor.startup(function () {
    if (Images.find().count() == 0) {
        for(var index = 1; index < 23; index++) {
            Images.insert({
                img_src: 'img_' + index + '.jpg',
                img_alt: 'Image number ' + index
            })
        }
    }
    console.log("Number of images: " + Images.find().count());
});