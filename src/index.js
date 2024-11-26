const express = require('express')
const path = require('path')
const collection = require('./mongo')


const app = express()
app.use(express.json())
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,resp){
    resp.render('login')   // this is "login.ejs"
})

app.get('/signup',function(req,resp){
    resp.render('signup')   // this is "signup.ejs"
})

app.post('/signup',async function(req,resp){
    const data = {
        name : req.body.name,
        password : req.body.password
    }
    await collection.insertMany([data])
    resp.render('login')

})

app.post('/login',async function(req,resp){
    try{
        const check = await collection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            resp.render('home')
        }
        else{
            resp.send("Wrong Password")
        }
    }
    catch{
        resp.send("Wrong Details")
    }
})

app.get('/logout',function(req,resp){
    resp.redirect('/');
})

app.listen(5600,()=>{
    console.log('Port connected succesfully !')
})