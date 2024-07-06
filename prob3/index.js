const http=require("http")

const server=http.createServer((req,res)=>{
    if(req.url==="/home" && req.method==="GET"){
        res.write("getting something from home page hello")
        res.end()
    }
    else if(req.url==="/cart"){
        res.write("welcome to cart page")
        res.end()
    }
    else{
        res.write("port 404 not fount")
        res.end()
    }
})
server.listen(7071,()=>{
    console.log("server is starte from prot")
})