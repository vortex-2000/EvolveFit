const mongoose = require('mongoose');
const Item= require('./models/item');
const Meal= require('./models/meal');
const User= require('./models/user');

mongoose.connect('mongodb://localhost:27017/fit', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })



    const seedDB = async () => {

        //  await Item.deleteMany({});
        //  await Meal.deleteMany({});
        await User.deleteMany({});


        // const seedItems = [
        //     {
        //         name: 'Milk',
        //         calories: 65,
        //         protein: 3.3,
        //         carb: 5,
        //         fat: 4,
        //         acceptedUnits: 'liter',
        //         itemWeight: 50

        //     },
        //     {
        //         name: 'Butter',
        //         calories: 740,
        //         fat: 82,
        //         acceptedUnits: 'g',
        //         itemWeight: 500

        //     },

        // ]

         // await Item.insertMany(seedItems)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(e => {
        //         console.log(e)
        //     })



    //     const mealItems =[
    //         {
    //             name: 'Meal 1',
    //             category: 'breakfast',
    //             foodItems:  ["62df5dbf3c58eabcd795061c","62df5dbf3c58eabcd795061b"]

    //         },
    //         {
    //             name: 'Meal 2',
    //             category: 'dinner',
    //             foodItems:  ["62df5dbf3c58eabcd795061c",]

    //         },
    //     ]

    //     await Meal.create(mealItems)
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(e => {
    //         console.log(e)
    //     })



    //     await Meal.find().populate('foodItems').then(res => {
    //         console.log(res)
    //    })
    //    .catch(e => {
    //        console.log(e)
    //    });
    // console.log(Meal.findOne({ 'name': 'Meal 1' }))


    const userItems =[
        {
            name: 'Rohan',
            calorieRequirement: 50,


            mealPlan:[
                {
                    mealPres:["62dfef9089b6c6ed86ce12c2","62dfef9089b6c6ed86ce12c3"],
                    sced: new Date('December 25, 1995')
                },

                {
                    mealPres:["62dfef9089b6c6ed86ce12c3"],
                    sced: new Date('January 1, 2000')
                }

            ]

        },
        {
            name: 'Rahul',
            calorieRequirement: 100,


            mealPlan:[
                {
                    mealPres:["62dfef9089b6c6ed86ce12c2"],
                    sced: new Date('March 21, 1998')
                }

            ]

        },

    ]

        await User.create(userItems)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })


    await User.find().populate('mealPlan').then(res => {
            console.log(res)
       })
       .catch(e => {
           console.log(e)
       });







    }






    seedDB().then(() => {
        mongoose.connection.close();
    })



