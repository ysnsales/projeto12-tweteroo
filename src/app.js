import express from "express";

const app = express();
const PORT = 5000;

app.listen(PORT);

const tweets = [
	{
		username: "bobesponja",
		avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
		tweet: "Eu amo hambúrguer de siri!"
	}
]

app.get(`/tweets`, (req, res) => {
    res.send(tweets)
})