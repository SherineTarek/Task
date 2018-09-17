const mongodb = require('mongodb');
const db = require('../db').get();
const moment = require('moment');

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('./client/index.html');
    });
    app.get('/login', (req, res) => {
        res.render('login');
    });
    // app.get('/att', (req, res) => {
    // db.collection('Attendance')
    //     .insertOne({
    //         day: new Date(),
    //         hours: 8,
    //         Employee_id: '5b9e20dbbc2122893be092c4',
    //         status: 'Present'
    //     })
    // .then(() => {
    //     db.collection('Employee')
    //         .find({})
    //         .toArray()
    //         .then(result =>
    //             res.render('portal', {
    //                 employee: result
    //             })
    //         )
    //         .catch(error => console.log(error));
    // })
    //     .catch(err => console.log(err));
    //     db.collection('Attendance')
    //         .find({})
    //         .toArray()
    //         .then(result =>
    //             res.render('att', {
    //                 att: result
    //             })
    //         )
    //         .catch(error => console.log(error));
    // });
    app.post('/attendance', (req, res) => {
        var objForUpdate = {};
        // var date = .day;
        console.log(req.body);
        db.collection('Attendance')
            .updateOne(
                {
                    Employee_id: req.body.att[1],
                    day: req.body.day
                },
                { $set: { status: req.body.att[0] } }
            )
            .then(result => console.log(result))
            .catch(err => console.log(err));
    });

    app.post('/login', (req, res) => {
        db.collection('EmployeeHR')
            .find({
                name: req.body.User.name,
                password: req.body.User.password
            })
            .toArray()
            .then(result => {
                if (result.length != 0) {
                    db.collection('Employee')
                        .find({})
                        .toArray()
                        .then(result =>
                            res.render('portal', {
                                employee: result
                            })
                        )
                        .catch(error => console.log(error));
                } else {
                    console.log(result);
                    res.send('Incorrect username or password');
                }
            })
            .catch(error => console.log(error));
    });
    app.post('/view', (req, res) => {
        db.collection('Employee')
            .find({})
            .toArray()
            .then(result =>
                res.render('portal', {
                    employee: result
                })
            )
            .catch(error => console.log(error));
    });

    app.post('/report', (req, res) => {
        console.log(req.body);
        db.collection('Attendance')
            .find({
                Employee_id: req.body.User.id
                // day: {
                //     $gte: new Date('2013-11-19T14:00:00Z').toISOString(),
                //     $lt: new Date('2019-11-19T20:00:00Z').toISOString()
                // }
            })
            .toArray()
            .then(result =>
                res.render('att', {
                    report: result
                })
            )
            .catch(error => console.log(error));
    });

    app.post('/add', (req, res) => {
        db.collection('Employee')
            .insertOne({
                name: req.body.User.name,
                email: req.body.User.email,
                mobile: req.body.User.mobile,
                hireDate: req.body.User.hireDate
            })
            .then(() => {
                db.collection('Employee')
                    .find({})
                    .toArray()
                    .then(result =>
                        res.render('portal', {
                            employee: result
                        })
                    )
                    .catch(error => console.log(error));
            })
            .catch(err => console.log(err));
    });
    app.post('/edit', (req, res) => {
        // var name = req.body.User.name ? req.body.User.name : req.body.User.name;
        var objForUpdate = {};

        if (req.body.User.name) objForUpdate.name = req.body.User.name;
        if (req.body.User.email) objForUpdate.email = req.body.User.email;
        if (req.body.User.mobile) objForUpdate.mobile = req.body.User.mobile;
        if (req.body.User.hireDate)
            objForUpdate.hireDate = req.body.User.hireDate;

        // var setObj = { $set: objForUpdate };

        console.log(objForUpdate);

        db.collection('Employee')
            .updateOne(
                { _id: new mongodb.ObjectID(req.body.User.id) },
                { $set: objForUpdate }
            )
            .then(() => {
                // console.log(req.body.User.id);
                db.collection('Employee')
                    .find({})
                    .toArray()
                    .then(result =>
                        res.render('portal', {
                            employee: result
                        })
                    )
                    .catch(error => console.log(error));
            })
            .catch(err => console.log(err));
    });
    app.post('/delete', (req, res) => {
        db.collection('Employee')
            .deleteOne({
                _id: new mongodb.ObjectID(req.body.User.id)
            })
            .then(() => {
                // console.log(req.body.User.id);
                db.collection('Employee')
                    .find({})
                    .toArray()
                    .then(result =>
                        res.render('portal', {
                            employee: result
                        })
                    )
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    });
};
