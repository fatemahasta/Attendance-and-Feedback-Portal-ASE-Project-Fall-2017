var myapp = angular.module('demoMongo1', []);

myapp.run(function ($http) {
  // Sends this header with any AJAX request
  $http.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  // Send this header only in post requests. Specifies you are sending a JSON object
  $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('EnrolledCoursesController', function ($scope, $http) {
$scope.showpopup = function () {
    console.log('Enrolled courses displyed');
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    selectedTerm = $("#term option:selected").text();
    selectedCourse1 = $("#course1 option:selected").text();
    course1StartTime = $("#course1StartTime option:selected").text();
    course1EndTime = $("#course1EndTime option:selected").text();

    selectedCourse2 = $("#course2 option:selected").text();
    course2StartTime = $("#course2StartTime option:selected").text();
    course2EndTime = $("#course2EndTime option:selected").text();

    selectedCourse3 = $("#course3 option:selected").text();
    course3StartTime = $("#course3StartTime option:selected").text();
    course3EndTime = $("#course3EndTime option:selected").text();

    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("selectedTerm", selectedTerm);
        localStorage.setItem("selectedCourse1", selectedCourse1);
	localStorage.setItem("course1StartTime", course1StartTime);
	localStorage.setItem("course1EndTime", course1EndTime);

        localStorage.setItem("selectedCourse2", selectedCourse2);
	localStorage.setItem("course2StartTime", course2StartTime);
	localStorage.setItem("course2EndTime", course2EndTime);

        localStorage.setItem("selectedCourse3", selectedCourse3);
	localStorage.setItem("course3StartTime", course3StartTime);
	localStorage.setItem("course3EndTime", course3EndTime);

	
    } else {	
        console.log('No local storage');
    }
}
})

function displayData() {
     $("#term").text(localStorage.getItem("selectedTerm"));

    $("#course1holder").text(localStorage.getItem("selectedCourse1"));
    $("#course1starttime").text(localStorage.getItem("course1StartTime"));
    $("#course1endtime").text(localStorage.getItem("course1EndTime"));

    $("#course2holder").text(localStorage.getItem("selectedCourse2"));
    $("#course2starttime").text(localStorage.getItem("course2StartTime"));
    $("#course2endtime").text(localStorage.getItem("course2EndTime"));

    $("#course3holder").text(localStorage.getItem("selectedCourse3"));
    $("#course3starttime").text(localStorage.getItem("course3StartTime"));
    $("#course3endtime").text(localStorage.getItem("course3EndTime"));
}
