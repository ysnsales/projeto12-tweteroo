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
        return  
    }

    const getTweets = tweets.slice(-10);
    const showTweets = getTweets.map(tweet => {
        const user = users.find(user => user.username === tweet.username);
        if (user){
            return (
            {...tweet, 
                    avatar: user.avatar
            }
            )
        }
    })
    res.send(showTweets);
});

app.post(`/sign-up`, (req, res) => {
    const {username, avatar} = req.body;

    if (!username || !avatar || !isNaN(username) || !isNaN(avatar)) {
        res.status(400).send("Todos os campos são obrigatórios");
        return 
    };
    const newUser = {username, avatar};

    users.push(newUser);
    res.status(201).send("OK");
});

app.post(`/tweets`, (req, res) => {
    const {username, tweet} = req.body;

    if (!username || !tweet || !isNaN(username) || !isNaN(tweet)) {
        res.status(400).send("Todos os campos são obrigatórios");
        return
    }

    const newTweet = {username, tweet};

	const user = users.find((u) => u.username === username);
    if (user){
        tweets.push(newTweet);
        res.status(201).send("OK");
    }else{
        res.status(401).send("UNAUTHORIZED");
    }
});

app.get(`/tweets/:USERNAME`, (req, res) => {
    const {USERNAME} = req.params;

    const userTweets = tweets.filter(tweet => tweet.username === USERNAME);

    if (userTweets.length === 0) {
        res.status(200).send([]);
        return
    }

    const showTweets = userTweets.map(tweet => {
        const user = users.find(user => user.username === tweet.username);
        if (user){
            return (
            {...tweet, 
                    avatar: user.avatar
            }
            )
        }
    })

    res.status(200).send(showTweets);

})
