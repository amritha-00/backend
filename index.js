// adding the express to the code
import express from "express";
const app = express()

// Coonecting my mongo db
import {MongoClient ,ObjectId} from "mongodb";
// "mongodb://127.0.0.1:27017" from your laptop
const url = "mongodb+srv://amrithavnsl:aSRmaq8EjcJ2Evol@cluster0.kfsqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
import cors from "cors";
const client = new MongoClient(url)
const db = client.db("ecomm")
app.use(cors())
app.use(express.json());
//apis are below

app.listen(8080,() =>{
    console.log("Server started at port 8080")
})

// data from the mongobd will appear
app.get("/", async (req,res)=>{
    const items = await db.collection("Products").find().toArray()
    res.status(200).json(items);
});

app.post("/", async (req, res) => {
    const { name, price,desc,url } = req.body;
    const data = {
      name: name,
      price: price,
      desc: desc,
      url: url
    };
    const newProduct = await db.collection("Products").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const newProduct = await db.collection("Products").deleteOne({_id:new ObjectId(id)});
    res.status(200).json(newProduct);
});
    

app.get("/home",(req,res) => {
    res.send("This is an api")
});

app.get("/",(req,res) => {
    let products = [
        {
        "name":"Product1",
        "price":34
        }
    ]
    res.json(products)
});
app.get("/customers",(req,res) => {
    let customers = [
        {
            "name" : "Amritha",
            "email": "amrithavemuri@gmail.com",
            "city" : "Vijayawada"
    }
    
]
res.json(customers)
});


    

