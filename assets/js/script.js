function initData() {

    //this gets the current date, simplifies it then cutts off what we dont need
    const curDate = new Date().toLocaleDateString('en-US');
    let taskTrackerArray = [
        {
            date: curDate,
            nine: '',
            ten: '',
            eleven: '',
            twelve: '',
            one: '',
            two: '',
            three: '',
            four: '',
            five: ''
        }];

    $('#currentDay').text(curDate);

    ///check if data exists or if date is different. Create new if no
    let checkCalandar = localStorage.getItem("calandar74657");
    if (checkCalandar == null || checkCalandar[0].date != taskTrackerArray[0].date ) {
        //save empty array to local storage
        saveCalandar(taskTrackerArray);
    }
   
    // use load calandar to get parsed data from localStorage
    taskTrackerArray = loadCalandar();
   
    updatePagetext();
   
    return taskTrackerArray;


}
///////////////////////////////////////
function saveCalandar(newData) {
    localStorage.setItem("calandar74657", JSON.stringify(newData));
    return;
}

/////////////////////////////////////////
function loadCalandar() {
    let calData = JSON.parse(localStorage.getItem("calandar74657"));

 return calData;  
}
  

function main() {

    let tasksArray = initData();
    ///set current date to last date saved by user
    let currentDisplayDate = tasksArray[0].date;
    $('#currentDay').text("Todays is: " + currentDisplayDate);
    //////////////////////////////////////////////////////////////////
}


main();