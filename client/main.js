Images = new Mongo.Collection("images");
console.log("Number of images: " + Images.find().count());

Template.images.helpers({
    images: Images.find({}, {sort: {rating: -1}})
    // first argument is filter (all images)
    // second argument is says we want revers sorted images by rating
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
    },
    'click .js-star-image': function (event) {
        var rating = $(event.currentTarget).data("userrating");
        var image_id = this.id; // image id
        Images.update({_id: image_id}, {$set: {rating: rating}});
        // first argument is filter, second argument is about what I want to change
    }
});
