const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('makeUpper',(text)=>{
    return text.toUpperCase();
});

app.set('view engine','HBS');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=>{
    var now = new Date().toString();
    var baseurl = req.baseUrl;
    //console.log(`Access baseurl ${req.url} at ${now}`);
    var log = `Access baseurl ${req.url} at ${now}`;
    fs.appendFile('server.log', log+'\n',(err)=>{
        if(err){
            console.log('error has occurred during logging ');
        }
    });
    next();
});

app.get("/",(req, response)=>{

    //response.send("Hello this is for testing");
    // response.send(
    //     {
    //         Name: "Shyju",
    //         likes: [
    //             'bikes',
    //             'books',
    //             'Sydney'
    //         ]
    //     }
    // );

    response.render('home.hbs',{
        titleBar: 'Server Home',
        currentYear: new Date().getFullYear(),
        pageTitle: 'This is a home page.'
    });

});

app.get("/about",(req,res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get("/bad",(req,res)=>{

    res.send({
        Error: "Unable to process this request"
    });
});

app.get("/projects",(req,res)=>{
    res.render('projects.hbs',{
        pageTitle: 'Projects working page'
    });
});


app.listen(port,()=>{
    console.log(`server started on port ...${port}`)
});