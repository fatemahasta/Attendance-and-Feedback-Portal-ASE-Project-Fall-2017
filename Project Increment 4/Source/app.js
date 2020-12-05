/**
 * Fatema Hasta
 */
var notp = require('notp');
var cmd=require('node-cmd');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://root:root123@ds257495.mlab.com:57495/aseprojectfatema';
const nodemailer = require('nodemailer');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var key
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

app.post('/push', function (req, res) {
    key=Math.floor(Math.random() * 10000000);
    console.log(JSON.stringify(req.body));
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'umkcattendanceportal@gmail.com',
            pass: 'umkcattendance',
        },
    });
    const mailOptions = {
        from: 'umkcattendanceportal@gmail.com',
        to: req.body.email,
        subject: 'UMKC attendance portal - OTP',
        html: "This is your otp - " +key,
    };
    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.end();
        }
        console.log('Message sent: ${info.response}');
        res.end();
    });
    console.log("mail sent  ")



});

app.post('/verify', function (req, res) {
    console.log(JSON.stringify(req.body));
    var token = req.body.otp;
    console.log(token.toString())
    console.log(key.toString())
// Check TOTP is correct (HOTP if hotp pass type)
    var login = token.toString()=== key.toString()
    console.log(login)
// invalid token if login is null
    if (login) {
        console.log('otp verified ');
    }
    else {
        console.log("otp verification failed try to generate otp again")
    }
	return res.status(200).send({
        message: "this is my message"
    });

});

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
            console.log("Inserted a student user into the collection.");
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

app.post('/student-feedback', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.status(500);
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertStudentFeedbackToDB(db, req.body,
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
var insertStudentFeedbackToDB = function (db, data, successCallback, errorCallback) {
    db.collection('student-feedback').insertOne(data, function (err, result) {
        if (err) {
            errorCallback(err);
        } else {
            console.log("Inserted a feedback document into the asedemo collection.");
            successCallback();
        }
    });
};

app.post('/enrolled-courses', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.status(500);
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertEnrolledCoursesToDB(db, req.body,
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
var insertEnrolledCoursesToDB = function (db, data, successCallback, errorCallback) {
    db.collection('enrolled-courses').insertOne(data, function (err, result) {
        if (err) {
            errorCallback(err);
        } else {
            console.log("Inserted a enrolled course document into the asedemo collection.");
            successCallback();
        }
    });
};


app.get('/hello', function (req, res) {
    console.log("hey");
        exportFaculty();
    });
// helper function for export insert
var exportFaculty = function () {

cmd.get('mongoexport --host=ds257495.mlab.com:57495 --db=aseprojectfatema --collection=student-feedback -u root -p root123 --csv --out studentfeedback.csv --fields first_name,last_name,student_id,course3,comment,feedback,loc,sentiment,score',
        function(err, data, stderr){
            console.log('File export command run');
	    console.log('Error: ' + err);
        }
    );

};

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
