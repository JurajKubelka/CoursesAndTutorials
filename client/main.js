var image_data = [
    {
        img_src: "free.jpg",
        img_alt: "Happy and Free"
    },
    {
        img_src: "consciousness.jpg",
        img_alt: "Consciousness"
    },
    {
        img_src: "infinity.jpg",
        img_alt: "Infinity"
    }
];

Template.images.helpers({ images: image_data });

Template.images.events({
   'click .js-image': function(event) {
      $(event.target).css("width", "50px");
   } 
});
