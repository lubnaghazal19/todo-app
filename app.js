const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



connection.connect().then().catch(error => console.log(' Db not connected.', error));
app.listen(3000, () => {
    console.log(`app listening on port 3000!`)
});
