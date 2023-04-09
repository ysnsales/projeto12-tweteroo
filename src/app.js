import express from "express";
import cors from "cors";

//Criação do APP Servidor
const app = express();

//Configurações do servidor
const PORT = 5000;
app.listen(PORT);
app.use(cors());
app.use(express.json())

const tweets = [];
const users = [];

app.get(`/tweets`, (req, res) => {
 
    if (tweets.length === 0){
        res.send([])
    }
    else{
    res.send(tweets)
    }
});

app.post(`/sign-up`, (req, res) => {
    const {username, avatar} = req.body
    const newUser = {username, avatar}
    users.push(newUser);
    res.send("OK");
});

app.post(`/tweets`, (req, res) => {
    const {username, tweet} = req.body
    const newTweet = {username, tweet}

	const user = users.find((u) => u.username === username);
    if (user){
        tweets.push(newTweet);
        res.send("OK");
    }else{
        res.send("UNAUTHORIZED");
    }
});
