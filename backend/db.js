const mongoose = require('mongoose');
const connectToDb=()=>{
    mongoose.connect('mongodb+srv://varshini:Varshini%40123@cluster0.gax7tov.mongodb.net/')


    console.log("connected to db")
}
module.exports = connectToDb;

