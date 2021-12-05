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

    ///check if data exists or if date has changed. Create new if no
    let checkCalandar = localStorage.getItem("calandar74657");
    if (checkCalandar == null ) {
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
///////////////////////////////////////
function updatePagetext() {
    let calData = loadCalandar();
    let timeArray = ['nine', 'ten', 'eleven', 'twelve', 'one', 'two', 'three', 'four', 'five'];
    for (i = 0; i < 9; i++) {
        let time = timeArray[i];
        let text = calData[0][time];
      
        let slot = document.querySelector('.timeSlot[data-time="'+ time +'"]');
    
        slot.querySelector('p').textContent = text;
    }
    return;
}
//////////////////////////////////////
function updateArray(time, newText) {
    array = loadCalandar();
    array[0][time] = newText;
    saveCalandar(array);
    return;

}

////////////////////check click on task
$('#toDoList').on("click", "#textSlot", function () {

    let text = $(this).text().trim();
    let textInput = $('<input>');
    textInput.addClass("col-9");
    textInput.val(text);

    $(this).replaceWith(textInput);
    $(textInput).trigger('focus');
    textInput.select();

});
///check if click outside of text space
$('.timeSlot').on("submit", function (event) {
    event.preventDefault();
    let element = $(this).find('input');
    //check if an input elemnt exists here
    if (element.length) {
        let newText = document.createElement("p");
        newText.id = "textSlot";
        newText.className = "col-9";
        let text = element.val().trim();
        newText.textContent = text;
        element.replaceWith(newText);
        updateSingleLine(newText);
    }
});
///////
function updateSingleLine(element) {
    
    let time = element.parentElement.dataset.time;
    let text = element.textContent;
    updateArray(time, text);
    return;
};


function main() {
    

    let tasksArray = initData();
    ///set current date to last date saved by user
    let currentDisplayDate = tasksArray[0].date;
    $('#currentDay').text("Todays is: " + currentDisplayDate);
    colorByTime();
   return;
    //////////////////////////////////////////////////////////////////
}


main();

////check if time passed each min
function colorByTime(){
    const getTime = new Date();
    const curTime = getTime.getHours()
    let timeArray = ['nine', 'ten', 'eleven', 'twelve', 'one', 'two', 'three', 'four', 'five'];
    for (i = 0; i < 9; i++) {
        let time = timeArray[i];
        let slot = document.querySelector('.timeSlot[data-time="'+ time +'"]');
        slotTime = slot.querySelector('.daySlot').dataset.num;
        


        if (slotTime>curTime){
            slot.style.backgroundColor  = "#313A75";
        }else if (slotTime < curTime){
            slot.style.backgroundColor = "#A9383B";
        }
        else {slot.style.backgroundColor = "#408E2F";}
    }
    console.log("COLOR");
    return;
}

//check colors every min
setInterval(colorByTime, 60500);