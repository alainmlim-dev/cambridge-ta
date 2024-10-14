import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser';


const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);
let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}
let db = conn.db("cambridge_ta");

const app = express();
app.use(cors())
app.use(bodyParser.json())

// ----

app.get('/cambridge/users', async (req, res) => {

    try {

        var username = req.headers.username;
        var password = req.headers.password;


        const fetchResult = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'get'
        });
        if (!fetchResult.ok) {
            console.log(fetchResult);
        } else {
            const jsonData = await fetchResult.json()
            let user = jsonData.find(u => u.username === username);

            if (user !== undefined) {
                if (user.email === password) {
                    console.log('Password correct!')
                    res.send({"login": true}).status(200)
                } else {
                    console.log('Password incorrect!')
                    res.send({"login": false}).status(200)
                }
            } else {
                res.send({"login": false}).status(200)
            }

            

            
        }


    } catch (error) {
        console.log(error)
    }

})

app.get('/articles', async (req, res) => {

    try {

        let collection = await db.collection("articles");
        let results = await collection.find({}).sort({ id: -1}).limit(100).toArray()

        setTimeout(() => {
            res.send(results).status(200);
        }, 800)
        

    } catch (error) {
        console.log(error)
    }

});

app.get('/get/article', async (req, res) => {

    try {

        var id = req.headers.id
        let collection = await db.collection("articles");
        let results = await collection.findOne({ id: Number(id) })
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

});

app.post('/post/article', async (req, res) => {

    try {

        var title = req.body.title
        var body = req.body.body
        console.log(title, body)

        let collection = await db.collection("articles");
        let results = await collection.insertOne(
            {
                userId: 1,
                title: req.body.title,
                body: req.body.body
            }
        )

        console.log(results)

        setTimeout(() => {
            res.send(results).status(200);
        }, 1000)
        

    } catch (error) {
        console.log(error)
    }

});

app.put('/update/article', async (req, res) => {

    try {

        let collection = await db.collection("articles");
        
        let results = await collection.updateOne(
            { id: Number(req.body.id) },
            {
                $set:
                {
                    "title": req.body.title,
                    "body": req.body.body
                }
            }
        )

        setTimeout(() => {
            res.send(results).status(200);
        }, 1000)
        
    } catch (error) {
        console.log(error)
    }

});




app.listen(3012, () =>
    console.log("API is running on port 3012")
)