function saveData() {
    selectedTerm = $("#term option:selected").text();
    selectedCourse1 = $("#course1 option:selected").text();
    selectedCourse2 = $("#course2 option:selected").text();
    selectedCourse3 = $("#course3 option:selected").text();

    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("selectedTerm", selectedTerm);
        localStorage.setItem("selectedCourse1", selectedCourse1);
        localStorage.setItem("selectedCourse2", selectedCourse2);
        localStorage.setItem("selectedCourse3", selectedCourse3);
    } else {
        console.log('No local storage');
    }
}

function displayData() {
    $("#course1holder").text(localStorage.getItem("selectedCourse1"));
    $("#course2holder").text(localStorage.getItem("selectedCourse2"));
    $("#course3holder").text(localStorage.getItem("selectedCourse3"));
}