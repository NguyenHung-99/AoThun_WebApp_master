const mongoose = require('mongoose');
const URI = "mongodb+srv://dbUser:dbUser@database-shop.gqq2f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = () => {
    mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('Connect thanh cong ... !');
}

module.exports = connectDB;