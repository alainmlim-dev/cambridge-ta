import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
import { jwtDecode } from "jwt-decode";
import bodyParser from 'body-parser';


const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);
let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}
let db = conn.db("code_db");


const app = express();
app.use(cors())
app.use(bodyParser.json())


app.get('/getusers', async (req, res) => {

    try {

        let collection = await db.collection("users");
        let results = await collection.find({})
            .limit(100)
            .toArray();
        res.send(results).status(200);


    } catch (error) {
        console.log(error)
    }

});

app.get('/userinfo', async (req, res) => {

    try {

        const token = req.headers.token
        let decodedToken = jwtDecode(token);
        let userid = decodedToken.userId

        let collection = await db.collection("users");
        let results = await collection.findOne({ _id: new ObjectId(userid) })
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

});

app.get('/codes/all', async (req, res) => {

    try {

        let collection = await db.collection("codes");
        let results = await collection.find({}).sort({ dateAdded: -1 }).limit(100).toArray()
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

});

app.get('/code', async (req, res) => {

    try {

        var id = req.headers.id
        let collection = await db.collection("codes");
        let results = await collection.findOne({ codeId: Number(id) })
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

});

app.post('/code/add', async (req, res) => {

    try {

        let collection = await db.collection("codes");
        let results = await collection.insertOne(
            {
                title: req.body.title,
                language: req.body.language,
                owner: req.body.owner,
                code: req.body.code,
                dateAdded: req.body.dateAdded
            }
        )
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

});

app.get('/notes/all', async (req, res) => {

    try {

        const pageSize = Number(req.headers.pagesize)
        const page = Number(req.headers.page)
        const owner = req.headers.owner

        console.log(owner)

        let collection = await db.collection("notes");

        let results = await collection
            .find({})
            .skip((page - 1) * pageSize)
            .sort({ dateAdded: -1 })
            .limit(pageSize)
            .filter({ owner: owner })
            .toArray()

        let dataLength = await collection
            .find({})
            .filter({ owner: owner })
            .toArray()

        res.send(
            {
                data: {
                    total: dataLength.length,
                    notes: results
                }
            }
        ).status(200);

    } catch (error) {
        console.log(error)
    }

});

app.post('/note/add', async (req, res) => {

    try {

        let collection = await db.collection("notes");
        let results = await collection.insertOne(
            {
                title: req.body.title,
                owner: req.body.owner,
                note: req.body.note,
                type: req.body.type,
                dateAdded: req.body.dateAdded
            }
        )
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

});

app.get('/note', async (req, res) => {

    try {

        var id = req.headers.noteid
        let collection = await db.collection("notes");
        let results = await collection.findOne({ notesId: Number(id) })
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

});

app.delete('/code/delete', async (req, res) => {

    try {

        let collection = await db.collection("codes");
        let results = await collection.deleteOne({ codeId: Number(req.headers.id) })
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

})

app.delete('/note/delete', async (req, res) => {

    try {

        let collection = await db.collection("notes");
        let results = await collection.deleteOne({ notesId: Number(req.headers.id) })
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

})

app.put('/note/update', async (req, res) => {

    try {

        console.log(req)
        let collection = await db.collection("notes");
        let results = await collection.updateOne(
            { notesId: Number(req.headers.id) },
            {
                $set:
                {
                    "title": req.body.title,
                    "dateAdded": req.body.dateAdded,
                    "note": req.body.note,
                    "type": req.body.type
                }
            }
        )
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

})

app.get('/notes/search', async (req, res) => {

    try {

        var query = req.headers.query
        let collection = await db.collection("notes");
        let results = await collection.find({ title: { $regex: query, $options: "i" } }).sort({ codeId: -1 }).limit(100).toArray()
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

});

app.get('/codes/search', async (req, res) => {

    try {

        var query = req.headers.query
        let collection = await db.collection("codes");
        let results = await collection.find({ title: { $regex: query, $options: "i" } }).sort({ codeId: -1 }).limit(100).toArray()
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

});

app.put('/code/update', async (req, res) => {

    try {

        let collection = await db.collection("codes");
        let results = await collection.updateOne(
            { codeId: Number(req.headers.id) },
            {
                $set:
                {
                    "title": req.body.title,
                    "language": req.body.language,
                    "dateAdded": req.body.dateAdded,
                    "code": req.body.code
                }
            }
        )
        res.send(results).status(200);

    } catch (error) {
        console.log(error)
    }

})

// ----
app.get('/cambridge/users', async (req, res) => {

    try {

        var username = req.headers.username;
        var password = req.headers.password;

        console.log(username, password)

        const fetchResult = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'get'
        });
        if (!fetchResult.ok) {
            console.log(fetchResult);
        } else {
            const jsonData = await fetchResult.json()
            // console.log(jsonData)

            let user = jsonData.find(u => u.username === username);
            console.log(user)

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

    //    axios.get('https://jsonplaceholder.typicode.com/users')
    //         .then(async function (response) {
    //             // handle success
    //             // console.log(response);

    //             // let user = response.map(u => u.username === "Bret")
    //             // console.log(user)

    //             const fetchResult = await fetch(process.env.REACT_APP_API_NOTEDATA, {
    //                 method: 'get',
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "noteid": noteId
    //                 }
    //             });
    //             if (!fetchResult.ok) {
    //                 console.log(fetchResult);
    //             } else {
    //                 const jsonData = await fetchResult.json()
    //                 setNoteData(jsonData)
    //                 setIsLoadingNotes(false)
    //             }

    //             res.send("test").status(200)
                

                
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    //         .finally(function () {
    //             // always executed
    //         });



        

    } catch (error) {
        console.log(error)
    }

})


app.listen(3012, () =>
    console.log("API is running on port 3012")
)