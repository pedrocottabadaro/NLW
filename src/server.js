const express= require("express");

const server=express();
const nunjucks=require("nunjucks");

//banco de dados
const db=require("./database/db");


//procurar dentro da pasta public os arquivos
server.use(express.static("public"))

//habiltar uso do req body
server.use(express.urlencoded({extended:true}));

//template engine
nunjucks.configure("src/views",{
    express:server,
    noCache:true,
})





server.get('/',(req,res)=>{
    return res.render("index.html");
});

server.get('/create-point',(req,res)=>{

    //req.query mostra todos dados na url

    
    return res.render("create-point.html");


});

server.post('/savepoint',(req,res)=>{

    
    
    
    //req.body = corpo do formulario

    const query= `
         INSERT INTO places (
             image,
             name,
             address,
             address2,
             state,
             city,
             items
         ) VALUES (?,?,?,?,?,?,?);
     `

    const values=[
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
        
     ]

     function afterInsertData(err){
        
            if(err){
                console.log(err);
                return res.render("create-point.html",{error:true});
                
            }
    
            console.log("Cadastrado com sucesso");
            console.log(this);

            return res.render("create-point.html",{saved:true})
        
     }
     
    db.run(query,values,afterInsertData)
    
   




});



server.get('/search',(req,res)=>{

    const search=req.query.search

    if(search==""){

        db.all("SELECT * FROM places",function(err,rows){

            if(err){
                return console.log(err);
            }
    
            const total=rows.length;
            //pagina html com dados do banco de dados
            return res.render("search-results.html",{places:rows,total});
    
        })
    }
    else{
    
        
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err,rows){

            if(err){
                return console.log(err);
            }
    
            const total=rows.length;
            //pagina html com dados do banco de dados
            return res.render("search-results.html",{places:rows,total});
    
        })
    }
    
    
    
});



server.listen(3000);