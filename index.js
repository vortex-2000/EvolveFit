const express= require ('express');
const app= express();
const path = require('path');

const mongoose = require('mongoose');
const methodOverride = require('method-override')

var bodyParser = require('body-parser')

const Item = require('./models/item');
const Meal = require('./models/meal');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/fit', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })



app.set('views',path.join(__dirname,'views'));

app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const categories = ['ml', 'liter', 'kg','g','item'];
const categories2 = ['breakfast', 'lunch', 'dinner','evening snacks'];


//ITEMS

app.get('/items', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const items = await Item.find({ category })
        res.render('items/index', { items, category })
    } else {
        const items = await Item.find({})
        res.render('items/index', { items, category: 'All' })
    }
})



app.get('/items/new', (req, res) => {
    res.render('items/new', { categories })
})





app.post('/items', async (req, res) => {
    const newitem = new Item(req.body);
    await newitem.save();
    res.redirect(`/items/${newitem._id}`)
})




app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);

    res.render('items/show', { item })

})



app.get('/items/:id/edit', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    res.render('items/edit', { item, categories })
})




app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/items/${item._id}`);
})



app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    const deleteditem = await Item.findByIdAndDelete(id);
    res.redirect('/items');
})

//MEALS


app.get('/meals', async (req, res) => {
    const meals = await Meal.find()
    res.render('meals/index',{meals});

})



app.get('/meals/new', async (req, res) => {

    const items = await Item.find()
    res.render('meals/new', { items,categories2 })
})



app.post('/meals', async (req, res) => {
    // const newmeal = new Meal(req.body);
    const newmeal=new Meal();
    newmeal.name=req.body.name;
    newmeal.category=req.body.category;

    //var ObjectId = require('mongoose').Types.ObjectId;

    console.log(typeof(req.body.foodItems))

    if(typeof(req.body.foodItems) === 'string'){
        newmeal.foodItems.push(mongoose.Types.ObjectId(req.body.foodItems))
    }
    else{
        for(i of req.body.foodItems){
            newmeal.foodItems.push(mongoose.Types.ObjectId(i))

        }
    }


    await newmeal.save()

    //CHECK
    await Meal.findOne({name: newmeal.name}).populate('foodItems').then(res => {
        console.log(res)
   })
   .catch(e => {
       console.log(e)
   });

    // console.log(typeof(req.body.foodItems[1]))

     res.redirect(`/meals/${newmeal._id}`)


})







app.get('/meals/:id', async (req, resq) => {
    const { id } = req.params;
    const meal = await Meal.findById(id);

    Meal.findOne({ 'name': meal.name }).populate('foodItems').then(res => {
        var ans=[];

        for(let i of res.foodItems){
            ans.push(i)

        }

        resq.render('meals/show', { meal,ans })


   })

})



app.get('/meals/:id/edit', async (req, res) => {
    const { id } = req.params;
    const meal = await Meal.findById(id);
    const items = await Item.find()
     res.render('meals/edit', { items,meal, categories2 })
})



app.put('/meals/:id', async (req, res) => {
    const { id } = req.params;
    const meal = await Meal.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/meals/${meal._id}`);
})




app.delete('/meals/:id', async (req, res) => {
    const { id } = req.params;
    const deletedmeal = await Meal.findByIdAndDelete(id);
    res.redirect('/meals');
})


//USERS




app.get('/users', async (req, res) => {
    const users = await User.find()
    res.render('users/index',{users});

})

app.get('/users/new', async (req, res) => {

    const meals = await Meal.find();

    // var readline = require('readline-sync');

    // var num = readline.question("number of plans?");



    res.render('users/new', { meals,num})
})




app.post('/users', async (req, res) => {

    const newuser=new User();
    newuser.name=req.body.name;
    newuser.calorieRequirement=req.body.calorieRequirement;

    //empty object array element initialization
     newuser.mealPlan.push({});

     if(typeof(req.body.p1) === 'string'){
        newuser.mealPlan[0].mealPres.push(mongoose.Types.ObjectId(req.body.p1))
    }
    else{
        for(i of req.body.p1){

            newuser.mealPlan[0].mealPres.push(i);
         }
    }

      newuser.mealPlan[0].sced=(req.body.p2);


     for(i of newuser.mealPlan[0].mealPres){
        console.log(i);
     }

    console.log(newuser);

    await newuser.save()

    //CHECK
    await User.findOne({name: newuser.name}).populate('mealPlan.mealPres').then(res => {
        console.log(res)
   })
   .catch(e => {
       console.log(e)
   });

   res.redirect(`/users/${newuser._id}`)

})

app.get('/users/:id', async (req, resq) => {
    const { id } = req.params;
    const user = await User.findById(id);

    User.findOne({ 'name': user.name }).populate('mealPlan.mealPres').then(res => {
         var ans=[];

        for(let i of res.mealPlan){

            // for(let j of i.mealPres){

            //     console.log(j);
            //     ans.push(j);
            // }
            ans.push(i)


        }

         resq.render('users/show', { user,ans })

      //  console.log(res.mealPlan[0].mealPres)

   })

})


app.get('/users/:id/edit', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const meals = await Meal.find()
     res.render('users/edit', { user,meals })
})




app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/users/${user._id}`);
})



app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const deleteduser = await User.findByIdAndDelete(id);
    res.redirect('/users');
})


app.get('/main', async (req, res) => {

    res.render('main');


})

app.post('/main', async (req, res) => {

    const cal=parseInt(req.body.calorie);



    const calh=cal+100;
    const call=cal-100;





            Item.find(   function(err, result){

                if(err){
                    res.send(err)
                }
                else{

                    var ans=[];
                    const arr3=[];

                    const arr1=[];
                    const arr2=[];

                    const arr4=[];
                    const arr5=[];

                    const arr6=[];
                    const arr7=[];

                    const arr8=[];
                    const arr9=[];


                    for(i of result){


                        if(i.calories>=call && i.calories<=calh){


                            if(i.calories%1 ==0){

                                if(i.protein <= i.calories*0.3 && i.protein >= i.calories*0.2)
                                    arr1.push(i);
                                else
                                    arr2.push(i);



                            }


                            else if(i.calories%0.25 ==0){

                                if(i.protein <= i.calories*0.3 && i.protein >= i.calories*0.2)
                                    arr4.push(i);
                                else
                                    arr5.push(i);


                            }


                        }
                        else{

                            if(i.calories%1 ==0){

                                if(i.protein <= i.calories*0.3 && i.protein >= i.calories*0.2)
                                    arr6.push(i);
                                else
                                    arr7.push(i);



                            }


                            else if(i.calories%0.25 ==0){

                                if(i.protein <= i.calories*0.3 && i.protein >= i.calories*0.2)
                                    arr8.push(i);
                                else
                                    arr9.push(i);


                            }
                        }




                    }


                    ans=arr1.concat(arr2,arr6,arr7,arr4,arr5,arr8,arr9);

                    var ansf=[];
                    var c=0;

                    for(k of ans){

                        if(c==5)
                            break;

                        ansf.push(k);
                        c++;

                    }


                    res.render('main2',{ansf});
                       // res.send(ansf)
                }

                });



})




app.listen(3000, ()=>{
    console.log("APP IS LISTENING ON PORT 3000!")
})
