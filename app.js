const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ToDoModel = require('./models/ToDo');
const moment = require('moment');
const connection = require('./connection/connect');
const cron = require('node-cron');


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

app.get('/list', function (req, res) {
    if (!req.query._id) {
        res.send("Parameter Missing")
    } else {
        ToDoModel.findOne({ "_id": req.query._id }).then(result => {
            return res.json({
                data: result
            })
        }).catch(error => {
            return reject(error)
        })
    }
});

cron.schedule("*/1 * * * *", async function () {
    console.log('----cron running successfully----');
    var date = new Date();
    const docs = await ToDoModel.deleteMany({ 'expiryDate': { $lte: date } }).exec();
    console.log(docs);
    return "Success"

    // , (err) => {
    //     if(err) return console.log("Error while erasing users " + err);
    //     console.log("Sucessfully Removed Data");
    // }
});


connection.connect().then().catch(error => console.log(' Db not connected.', error));
app.listen(3000, () => {
    console.log(`app listening on port 3000!`)
});
