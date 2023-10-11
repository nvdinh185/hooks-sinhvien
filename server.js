const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors());
app.use(express.json());

const route = require('./routes');

app.use(express.static(__dirname + "/client"));

// Router init
route(app);

// start server
const port = 3001;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));