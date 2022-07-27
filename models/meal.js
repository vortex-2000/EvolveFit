const mongoose = require('mongoose');
Schema = mongoose.Schema




const mealSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner','evening snacks']
    },

    foodItems:[
        // type: [String],


            { type: Schema.Types.ObjectId, ref: 'Item' },


    ]


})




const Meal = mongoose.model('Meal', mealSchema);


module.exports = Meal;
