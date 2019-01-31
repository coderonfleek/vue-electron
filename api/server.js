const express = require("express");
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const env = require("./env");
var cors = require('cors');

// App
const app = express();

//Use cors
app.use(cors());

// Set port
const port = process.env.PORT || "1337";
app.set("port", port);

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${env.auth0Domain}/.well-known/jwks.json`
  }),
  audience: env.apiIdentifier,
  issuer: `https://${env.auth0Domain}/`,
  algorithms: ["RS256"]
});

app.use(jwtCheck);

// Routes
require("./routes")(app);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
