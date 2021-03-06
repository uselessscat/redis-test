var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var redis = require("redis"),
        client = redis.createClient({
            host: 'redis'
        });

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    client.set("string key", "string val", redis.print);
    client.hset("hash key", "hashtest 1", "some value", redis.print);
    client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
    client.hkeys("hash key", function (err, replies) {
        console.log(replies.length + " replies:");
        replies.forEach(function (reply, i) {
            console.log("    " + i + ": " + reply);
        });
        client.quit();
    });

    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});