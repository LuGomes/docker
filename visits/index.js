const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();
const client = redis.createClient({
    host: 'redis-server', // service defined in docker-compose.yml
    port: 6379 // redis default port
});
client.set("visits", 0);

app.get("/", (req, res) => {
  // process.exit(0); // 0 means everything is ok, I exited on purporse
  client.get("visits", (err, visits) => {
    res.send("Number of visits is " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 4001");
});
