

const express = require('express');
const twit = require('twitter');
const router = express.Router();
const path = require('path');
const appDir = path.dirname(require.main.filename);


require('dotenv').config({path: appDir+'/config/.env'  });

var twitter = new twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

router.get('/tweets', (req, res, next) => {
    
    twitter.get('search/tweets', { q: 'Donald J. Trump'}, (error, tweets, response) => {
        if(error) throw error;
        res.send(tweets);
    });
});

router.get('/trump', (req, res, next) => {
    twitter.get('statuses/user_timeline', {screen_name: 'realDonaldTrump', count: 40 }, (error, tweets, response) => {
        if (!error) {
            res.send(tweets);
            //res.status(200).render('index', { title: 'Express', tweets: tweets });
        } else {
            res.status(500).json({ error: error });
        }
    });
});


router.get('/stream', (req, res, next) => {
    twitter.stream('status/filter', {track: 'NYC'}, (stream) => {
        stream.on('data', (tweet) => {
            console.log(tweet.text);
        });

        stream.on('error', (error) => {
            throw error;
        });
    });
});


module.exports = router;