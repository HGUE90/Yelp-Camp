const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
  for(let i = 0; i < 50; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '67202a3ef046face48903bf0',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        image: `https://picsum.photos/400?random=${Math.random()}`,
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit fugit quod architecto reiciendis sint ex, ea distinctio quisquam. Consequuntur repudiandae ut voluptatem tempora nisi quisquam labore ducimus esse veniam eius.',
        price 
    })
    await camp.save();
  }
}

seedDB().then(() => {
    mongoose.connection.close();
})