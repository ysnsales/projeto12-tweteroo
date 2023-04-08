import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.listen(PORT);
app.use(cors());

const tweets = []

app.get(`/tweets`, (req, res) => {
    if (tweets.length === 0){
        res.send([])
    }
    else{
    res.send(tweets)
    }
})