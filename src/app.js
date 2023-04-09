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
const user = [];

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
    user.push(newUser);
    res.send("OK");
})