/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo', []);

myapp.run(function ($http) {
  // Sends this header with any AJAX request
  $http.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  // Send this header only in post requests. Specifies you are sending a JSON object
  $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('FacultyRegisterController', function ($scope, $http) {
  $scope.facultyId = '';
  $scope.emailId = '';
  $scope.password = '';
  $scope.rePassword = '';

  $scope.register = function () {
    console.log('register clicked');
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    if($scope.password !== $scope.rePassword) {
      alert('Passwords enterd are different. Please re-enter the same password');
      return;
    }
    if (regmyForm.emailId.classList.contains('ng-invalid')) {
      return;
    }
    if ($scope.facultyId == '' || $scope.emailId == '' || $scope.password == '' || $scope.rePassword == '') {
      return;
    }
    var dataParams = {
      username: $scope.facultyId,
      emailId: $scope.emailId,
      password: $scope.password
    }
    var req = $http.post('http://127.0.0.1:8081/faculty-user', dataParams);
    req.success(function (data, status, headers, config) {
      $scope.successMessage = data;
      console.log('Sign up success');
      // Success message
      $('#signup-success').html("<div class='alert alert-success'>");
      $('#signup-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#signup-success > .alert-success')
        .append("<strong>User signup successful. Please login to continue</strong>");
      $('#signup-success > .alert-success')
        .append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
    });
    req.error(function (data, status, headers, config) {
      console.warn('Sign up failed');
      alert('User creation failed. Please Please check if username or email is already used.');
    });
  }
});

myapp.controller('FacultyLoginController', function ($scope, $http) {
  $scope.username = '';
  $scope.password = '';

  $scope.login = function () {
    console.log('login clicked');
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }

    var dataParams = {
      username: $scope.username,
      password: $scope.password
    }


    if ($scope.username == '' || $scope.password == '') {
      return;
    }
    var req = $http.get('http://127.0.0.1:8081/faculty-user', {
      params: dataParams
    });
    req.success(function (data, status, headers, config) {
      $scope.successMessage = data;
      console.log('Login success');
      //setup user session here
      //

      window.location.href = 'FacultyHome.html'
    });
    req.error(function (data, status, headers, config) {
      console.warn('Login failed');
      alert('Login failed. Please check username and password');
    });
  }
});


myapp.controller('StudentRegisterController', function ($scope, $http) {
  $scope.studentId = '';
  $scope.emailId = '';
  $scope.contactNumber = '';
  $scope.password = '';
  $scope.rePassword = '';

  $scope.register = function () {
    console.log('register clicked');
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }

    if ($scope.password !== $scope.rePassword) {
      alert('Passwords enterd are different. Please re-enter the same password');
      return;
    }
    if (regmyForm.email.classList.contains('ng-invalid')) {
      return;
    }
    if ($scope.studentId == '' || $scope.emailId == '' || $scope.password == '' || $scope.rePassword == '' || $scope.contactNumber == '') {
      return;
    }
    var dataParams = {
      username: $scope.studentId,
      emailId: $scope.emailId,
      password: $scope.password,
      contactNumber: $scope.contactNumber
    }
    var req = $http.post('http://127.0.0.1:8081/student-user', dataParams);
    req.success(function (data, status, headers, config) {
      $scope.successMessage = data;
      console.log('Sign up success');
      // Success message
      $('#signup-success').html("<div class='alert alert-success'>");
      $('#signup-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#signup-success > .alert-success')
        .append("<strong>User signup successful. Please login to continue</strong>");
      $('#signup-success > .alert-success')
        .append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");

      window.location.href = 'StudentEnrolledForm.html'
    });
    req.error(function (data, status, headers, config) {
      console.warn('Sign up failed');
      alert('User creation failed. Please Please check if username or email is already used.');
    });
  }
});

myapp.controller('StudentLoginController', function ($scope, $http) {
  $scope.username = '';
  $scope.password = '';
  $scope.emailid = '';

  $scope.getOTP= function () {
      var d = {};
      d.email =$scope.emailid;
      document.getElementById("studentsignin").disabled=false;
      $http.post('http://127.0.0.1:8081/push',d).then(function (response) {
          console.log(response.data);
      });
  }
  $scope.verifyOTP=function () {
      var s={};
      s.otp=$scope.otp
      $http.post('http://127.0.0.1:8081/verify',s).then(function (response) {
          console.log(response.data);
	window.location.href = 'home.html'
      });
  }
  $scope.login = function () {
    console.log('login clicked');
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var dataParams = {
      username: $scope.username,
      password: $scope.password,
      emailId:  $scope.emailid
    }
    if ($scope.username == '' || $scope.password == '') {
      return;
    }
    var req = $http.get('http://127.0.0.1:8081/student-user', {
      params: dataParams
    });
    req.success(function (data, status, headers, config) {
      $scope.successMessage = data;
      console.log('Login success');
      //setup user session here
      //

      window.location.href = 'home.html'
    });
    req.error(function (data, status, headers, config) {
      console.warn('Login failed');
      alert('Login failed. Please check username and password');
    });
  }
});

myapp.controller('ContactMeController', function ($scope, $http) {
  $scope.name = '';
  $scope.email = '';
  $scope.phoneNumber = '';
  $scope.message = '';

  $scope.submitContactMe = function () {
    console.log('Contact me submit clicked by: ' + $scope.name);
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var dataParams = {
      name: $scope.name,
      email: $scope.email,
      phoneNumber: $scope.phoneNumber,
      message: $scope.message
    }
    var req = $http.post('http://127.0.0.1:8081/contact-me', dataParams);
    req.success(function (data, status, headers, config) {
      $scope.successMessage = data;
      console.log('Contact me submit success');
      // Success message
      $('#success').html("<div class='alert alert-success'>");
      $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-success')
        .append("<strong>Your message has been sent. </strong>");
      $('#success > .alert-success')
        .append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
    });
    req.error(function (data, status, headers, config) {
      console.warn('Contact me submit failed');
      // Fail message
      $('#success').html("<div class='alert alert-danger'>");
      $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-danger').append($("<strong>").text("Sorry " + $scope.name + ", it seems that there is some issue with the server. Please try again later!"));
      $('#success > .alert-danger').append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
    });
  };
});

myapp.controller('Feedbackcontroller', function ($scope, $http) {
  $scope.saveFeedback = function () {
console.log("Hello");

            var lat, lang;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
            function showPosition(position) {
                lat = position.coords.latitude;

                lang = position.coords.longitude;

                // Added for api calling
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lang).success(function (data) {
                    console.log(data);
                    $scope.loc = data.results[0].formatted_address;
                    console.log($scope.loc);
                    document.getElementById('loc').value = $scope.loc;
                    var sentiment = document.getElementById('feedback').value;
                    $http.get('http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8&outputMode=json&text='+sentiment).success(function (analysis) {
                        console.log(analysis);
                        $scope.sentiment = analysis.docSentiment.type;
			$scope.score = analysis.docSentiment.score;
                        console.log($scope.sentiment);
                        document.getElementById('sentiment').value = $scope.sentiment;
			document.getElementById('score').value = $scope.score;

			console.log('Feedback submit clicked by: ' + $scope.fname);
    			var config = {
      				headers: {
        				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      				}
    			}
if(document.getElementById('c1').checked)
{
	$scope.course1 = localStorage.getItem("selectedCourse1");
}
else if(document.getElementById('c2').checked)
{
	$scope.course2 = localStorage.getItem("selectedCourse2")
}
else(document.getElementById('c3').checked)
{
	$scope.course3 = localStorage.getItem("selectedCourse3")
}
    var dataParams = {
      first_name: $scope.fname,
      last_name: $scope.lname,
      student_id: $scope.sId,
	course1: $scope.course1,
	course2: $scope.course2,
	course3: $scope.course3,
      comment: $scope.comment,
	feedback: $scope.feedback,
	loc: $scope.loc,
	sentiment: $scope.sentiment,
	score: $scope.score
    }
    var req = $http.post('http://127.0.0.1:8081/student-feedback', dataParams);
    req.success(function (data, status, headers, config) {
      $scope.successMessage = data;
      console.log('Student Feedback submit success');
      // Success message
      $('#success').html("<div class='alert alert-success'>");
      $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-success')
        .append("<strong>Your message has been sent. </strong>");
      $('#success > .alert-success')
        .append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
    });
    req.error(function (data, status, headers, config) {
      console.warn('Feedback Form submit failed');
      // Fail message
      $('#success').html("<div class='alert alert-danger'>");
      $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-danger').append($("<strong>").text("Sorry " + $scope.fname + ", it seems that there is some issue with the server. Please try again later!"));
      $('#success > .alert-danger').append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
    });
                    })
                })
            }

 //$scope.fname = '';
  //$scope.lname = '';
  //$scope.sId = '';
  //$scope.comment = '';
//$scope.feedback = '';
//$scope.loc = '';
//$scope.sentiment = '';

    
  };
});

myapp.controller('EnrolledCoursesController', function ($scope, $http) {
  //$scope.term = '';
  //$scope.course1 = '';
//$scope.s1 = '';
//$scope.e1 = '';
  //$scope.course2 = '';
//$scope.s2 = '';
//$scope.e2 = '';
  //$scope.course3 = '';
//$scope.s3 = '';
//$scope.e3 = '';
  

  $scope.saveData = function () {
    console.log('Contact me submit');
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var dataParams = {
    term:  $scope.term ,
  course1: $scope.course1,
course1starttime: $scope.s1,
course1endtime: $scope.e1,
  course2: $scope.course2,
course2starttime: $scope.s2,
course2endtime: $scope.e2,
  course3: $scope.course3,
course3starttime: $scope.s3,
course3endtime: $scope.e3
    }
    var req = $http.post('http://127.0.0.1:8081/enrolled-courses', dataParams);
    req.success(function (data, status, headers, config) {
      $scope.successMessage = data;
      console.log('Enrolled Courses submit success');
      // Success message
      $('#success').html("<div class='alert alert-success'>");
      $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-success')
        .append("<strong>Your message has been sent. </strong>");
      $('#success > .alert-success')
        .append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
    });
    req.error(function (data, status, headers, config) {
      console.warn('Enrolled Courses submit failed');
      // Fail message
      $('#success').html("<div class='alert alert-danger'>");
      $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-danger').append($("<strong>").text("Sorry " + $scope.name + ", it seems that there is some issue with the server. Please try again later!"));
      $('#success > .alert-danger').append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
    });
  };
});


myapp.controller('exportController', function ($scope, $http) {

$scope.exportForm = function () {
    console.log('button clicked');
var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }


var req = $http.get('http://127.0.0.1:8081/hello');
    req.success(function (data, status, headers, config) {
      $scope.successMessage = data;
      console.log('export submit success');
      // Success message
      $('#success').html("<div class='alert alert-success'>");
      $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-success')
        .append("<strong>Your message has been sent. </strong>");
      $('#success > .alert-success')
        .append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
    });
    req.error(function (data, status, headers, config) {
      console.warn('export submit failed');
      // Fail message
      $('#success').html("<div class='alert alert-danger'>");
      $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-danger').append($("<strong>").text("Sorry " + $scope.name + ", it seems that there is some issue with the server. Please try again later!"));
      $('#success > .alert-danger').append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
    });
  };
});


