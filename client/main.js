Images = new Mongo.Collection("images");
console.log("Number of images: " + Images.find().count());

Template.images.helpers({
    images: Images.find()
});

Template.images.events({
    'click .js-image': function (event) {
        $(event.target).css("width", "50px");
    },
    'click .js-del-image': function (event) {
        var image_id = this._id;
        // this referes to the data the template was displaying (an image)
        // _id refers to a unique identifier for an item in a Mongo collection
        $('#' + image_id).hide('slow', function () {
            Images.remove({
                "_id": image_id
            }); // Mongo filter  
        })
    }
});
