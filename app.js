const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/add', function (req, res) {
    let taskName = req.body.task_name;
    let creator = req.body.creator;
    let duration = req.body.duration;
    let data = req.body;
    console.log('------logging data----', data);
    if (!taskName || !creator) {
        res.send("Parameter Missing")
    } else {
        let momentOfTime = new Date();
        let myTimeSpan = duration * 60 * 1000;
        let expiry_at = momentOfTime.setTime(momentOfTime.getTime() + myTimeSpan);
        let expiryDate = new Date(expiry_at);
        data.expiryDate = expiryDate;
        console.log('-----logging expiryDate----', expiryDate);
        ToDoModel(data).save().then((saveresult) => {
            return res.json({
                success: true
            })
        }).catch(error => {
            return reject(error)
        })
    }
});


connection.connect().then().catch(error => console.log(' Db not connected.', error));
app.listen(3000, () => {
    console.log(`app listening on port 3000!`)
});
