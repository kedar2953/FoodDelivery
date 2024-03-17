const mongoose = require('mongoose');
require('dotenv').config();
const database = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected");

        const FoodItem = mongoose.model('food_items', new mongoose.Schema({}));
        const FoodCategory = mongoose.model('food_category', new mongoose.Schema({
            CategoryName: String
        }));

        const foodItemsData = await FoodItem.find({});
        global.food_items = foodItemsData;

        const foodCategoryData = await FoodCategory.find({}).exec();
        global.foodCategory = foodCategoryData;
        console.log("this is my data",global.foodCategory)
        console.log("Data loaded successfully");
    } catch (err) {
        console.log("Error while connecting:", err.message);
    }
};

module.exports = database;
