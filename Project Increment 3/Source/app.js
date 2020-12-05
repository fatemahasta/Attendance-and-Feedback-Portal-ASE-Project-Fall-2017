/**
 * Fatema Hasta
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://root:root123@ds257495.mlab.com:57495/aseprojectfatema';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// receive request to insert data
app.post('/contact-me', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.status(500);
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertContactMeToDB(db, req.body,
            function () {
                res.write("Successfully inserted");
                res.end();
            },
            function (err) {
                res.status(500);
                res.write("Insert failed with error " + err);
                res.end();
            }
        );
    });
})
// helper function for data insert
var insertContactMeToDB = function (db, data, successCallback, errorCallback) {
    db.collection('contact-me').insertOne(data, function (err, result) {
        if (err) {
            errorCallback(err);
        } else {
            console.log("Inserted a document into the asedemo collection.");
            successCallback();
        }
    });
};

// receive request to insert faculty user data
app.post('/faculty-user', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.status(500);
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        inserFacultyUserToDB(db, req.body,
            function () {
                res.write("Successfully inserted");
                res.end();
            },
            function (err) {
                res.status(500);
                res.write("Insert failed with error " + err);
                res.end();
            }
        );
    });
})
// helper function for faculty user data insert
var inserFacultyUserToDB = function (db, data, successCallback, errorCallback) {
    db.collection('faculty-user').insertOne(data, function (err, result) {
        if (err) {
            errorCallback(err);
        } else {
            console.log("Inserted a faculty user into the collection.");
            successCallback();
        }
    });
};

// receive request to get faculty data
app.get('/faculty-user', function (req, res) {
    var userParams = {
        "emailId": req.query.username,
        "password": req.query.password
    };
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.status(500);
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        // retrieve the record here
        findFacultyUserFromDb(db, userParams,
            function (result) {
                if(result != null) {
                    res.send(result);
                } else {
                    res.status(500);
                    res.send("Invalid username or password");
                }
            },
            function (result) {
                res.status(500);
                res.send("Failed to fetch data");
            }
        );
    });
})
// helper function to find faculty data
var findFacultyUserFromDb = function (db, userParams, successCallback, errorCallback) {
    var userResult = db.collection('faculty-user').findOne(
        { "emailId": userParams['emailId'], "password": userParams['password'] }
    );
    userResult.then(function (data) {
        successCallback(data);
    }).catch(function (err) {
        errorCallback(err);
    })
};

// receive request to insert user data
app.post('/student-user', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.status(500);
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        inserStudentUserToDB(db, req.body,
            function () {
                res.write("Successfully inserted");
                res.end();
            },
            function (err) {
                res.status(500);
                res.write("Insert failed with error " + err);
                res.end();
            }
        );
    });
})
// helper function for user data insert
var inserStudentUserToDB = function (db, data, successCallback, errorCallback) {
    db.collection('student-user').insertOne(data, function (err, result) {
        if (err) {
            errorCallback(err);
        } else {
            console.log("Inserted a faculty user into the collection.");
            successCallback();
        }
    });
};

// receive request to get faculty data
app.get('/student-user', function (req, res) {
    var userParams = {
        "studentId": req.query.username,
        "password": req.query.password
    };
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.status(500);
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        // retrieve the record here
        findStudentUserFromDb(db, userParams,
            function (result) {
                if (result != null) {
                    res.send(result);
                } else {
                    res.status(500);
                    res.send("Invalid username or password");
                }
            },
            function (result) {
                res.status(500);
                res.send("Failed to fetch data");
            }
        );
    });
})
// helper function to find faculty data
var findStudentUserFromDb = function (db, userParams, successCallback, errorCallback) {
    var userResult = db.collection('student-user').findOne(
        { "username": userParams['studentId'], "password": userParams['password'] }
    );
    userResult.then(function (data) {
        successCallback(data);
    }).catch(function (err) {
        errorCallback(err);
    })
};

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
