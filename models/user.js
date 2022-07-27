const mongoose = require('mongoose');

const Meal = require('./meal');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    calorieRequirement: {
        type: Number,
    },

    mealPlan: [
        {
            type:

                {
                    mealPres: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
                    sced: Date
                }

        },
    ],

})
const User = mongoose.model('User', userSchema);




module.exports = User;