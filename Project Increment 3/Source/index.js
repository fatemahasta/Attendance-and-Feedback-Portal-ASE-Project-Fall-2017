/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo', []);

myapp.run(function ($http) {
  // Sends this header with any AJAX request
  $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
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

      window.location.href = 'home.html'
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