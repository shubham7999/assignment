const express = require('express');
const mongoose = require('mongoose');
const port=8000;
const app = express();
const student = require('./schema/student');
var bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));  // body parser
const db = require('./configure/configure');

//Get request for the home page
app.get('/' , (req , res)=>
{
     res.sendFile(path.join(__dirname+'/index.html'));
    // res.send("<h1> Hello</h1>");
})


//post request for updating the sociaety of the student
app.post('/' , function(req , res)
{
    const object = req.body;

    var name = object.name;
    var id = object.id;
    console.log(name ,"sh");
    var box = []

    student.find({ _id : id}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{

            box = docs[0].society;
            console.log(docs[0].name , "yes");
            if(box==undefined){
            box=[name];
            }
            else
            {
               box.push(name);
            }

            console.log( docs.society, "society" , docs, box);
            student.findByIdAndUpdate(id, { society: box},
                function (err, docs) {
                       if (err){
                          console.log(err)
                             }
                            else{
                          console.log("Updated User : ", docs);
                             }
                        });
        }
    });

    

  
    console.log(name);
    console.log("sh");
    res.send("Got updated");

})

//Post request for adding the student into the database
app.post('/add' , function(req , res)
{
    var obj = req.body;
    let society=[obj.society];
    let subject = [obj.subject];
    var new_user = new student({
        name: obj.name,
        number : obj.number,
        subjects : subject,
        class : obj.class,
        society : society,
        year : obj.year

    })
      
    new_user.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
        }
    })

    res.send("Successfully added");
})

//Listening to port 8000
app.listen(port , function(err)
{
    if(err) console.log(err);

    console.log("Listenng at port " + port);
})
