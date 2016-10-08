import {
    Meteor
} from 'meteor/meteor';

Images = new Mongo.Collection("images");

Meteor.startup(function () {
    if (Images.find().count() == 0) {
        Images.insert({
            img_src: "free.jpg",
            img_alt: "Happy and Free"
        });
        Images.insert({
            img_src: "consciousness.jpg",
            img_alt: "Consciousness"
        });
        Images.insert({
            img_src: "infinity.jpg",
            img_alt: "Infinity"
        });
    }
    console.log("Number of images: " + Images.find().count());
});