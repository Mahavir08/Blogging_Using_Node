const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogModel = require("./model/schema");

const app = express();


mongoose.connect('mongodb://localhost:27017/contents',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true,
})
.then((result)=>{console.log("Connected To Database")})
.catch((err)=>{console.log(err)});

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.json());

//if( !mongoose.Types.ObjectId.isValid(id) ) return false


app.get('/',(req,res)=>{
    
    blogModel.find().sort({createdAt:'-1'})
    .then((result)=>{
      res.render("home",{result});
    })
    .catch(err=>console.log(err));
    
});

app.get('/contact-us',(req,res)=>{
    res.render("contact");
});

app.get('/blogs/create-blogs',(req,res)=>{
    res.render("create");
});

app.get("/:id",(req,res)=>{
    const id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ) return false;
    blogModel.findById(id)
    .then((result)=>{
        res.render('details',{result})
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.delete("/:id",(req,res)=>{
    const id = req.params.id;

    blogModel.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/'});
    })
    .catch(err=>console.log(err));
});

// app.get("/add",(req,res)=>{
//     const bloged = new blogModel({
//         title:"Naruto : Shippuden",
//         snippet:"Characters Of Naruto",
//         body:"Hatake Kakashi, Uchiha Madara,",
//     });

//     bloged.save()
//     .then((result)=>{
//         console.log(result);
//     })
//     .catch(err => console.log(err));
// });

app.post("/",(req,res)=>{
    const blogs = new blogModel(req.body);

    blogs.save()
    .then((result)=>{
       res.redirect('/');
    })
    .catch((err)=>{console.log(err)});
});

app.listen(8000);

app.use((req,res)=>{
    res.send("404 Error");
});
