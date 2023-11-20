//Model 
const warningMessages = document.querySelectorAll('.warning-message');
const labels = document.querySelectorAll('label');
const inputFields = document.querySelectorAll('input');
const dayField = document.getElementById('day-input');
const monthField = document.getElementById('month-input');
const yearField = document.getElementById('year-input');
const yearOutput = document.getElementById('year-output');
const monthOutput = document.getElementById('month-output');
const dayOutput = document.getElementById('day-output');
const d = new Date();

//View 
function errorEmptyChanges(num, errorMessage){
    //warning message
    warningMessages[num].textContent = errorMessage;
    warningMessages[num].classList.add('required');
    //labels
    labels[num].style.color = 'hsl(0, 100%, 67%)';
    //InputFields
    inputFields[num].style.borderColor = 'hsl(0, 100%, 67%)';
}

function errors(){
    //Field's values being numbered
    let yearFieldValue = Number(yearField.value);
    let monthFieldValue = Number(monthField.value);
    let dayFieldValue = Number(dayField.value);
    //Creating a day to be used later
    const inputDate = new Date(`${yearFieldValue}-${monthFieldValue}-${dayFieldValue}`);

    //Handling the error states
    if(dayField.value === ''){
        errorEmptyChanges(0, 'This field is requried');
    } if(monthField.value === ''){
        errorEmptyChanges(1, 'This field is requried');
    } if(yearField.value === ''){
        errorEmptyChanges(2, 'This field is requried');
    } if(dayField.value > 31){
        errorEmptyChanges(0, 'Must be a valid day');
    } if(monthFieldValue > 12){
        errorEmptyChanges(1, 'Must be a valid month');
    } if(yearFieldValue > d.getFullYear()){
        errorEmptyChanges(2, 'Must be in the past');
    } if(d instanceof Date && !isNaN(inputDate.valueOf()) === false){
        errorEmptyChanges(0, 'Must be a valid date');
    } 
    //Rendering the calculation onto the page depending on different situations
    else {
        const preMonthDays = new Date(d.getFullYear(), d.getMonth()-1, 0).getDate();
        if(d.getDate() < dayFieldValue){
            dayOutput.textContent = d.getDate()+preMonthDays-dayFieldValue;
            if(d.getMonth < monthFieldValue){
                monthOutput.textContent = (d.getMonth()+13)-monthFieldValue;
                yearOutput.textContent = d.getFullYear()-yearFieldValue;
            } else {
                monthOutput.textContent = d.getMonth()-monthFieldValue;
                yearOutput.textContent = d.getFullYear()-yearFieldValue;
            }
        } else if(d.getMonth()+1 < monthFieldValue){
            dayOutput.textContent = d.getDate()-dayFieldValue;
            monthOutput.textContent = (d.getMonth()+13)-monthFieldValue;
            yearOutput.textContent = (d.getFullYear()-yearFieldValue)-1;
        } else {
            dayOutput.textContent = d.getDate()-dayFieldValue;
            monthOutput.textContent = d.getMonth()+1-monthFieldValue;
            yearOutput.textContent = d.getFullYear()-yearFieldValue;
        }
    }
}

//Refereshing the page after correcting the errors
window.addEventListener('change', ()=>{
    if(!(dayField.value === '' && monthField.value === '' && yearField.value === '')){
        warningMessages.forEach((warningMessage)=>{
            warningMessage.textContent = '';
            warningMessage.classList.remove('required');
        });

        labels.forEach((label)=>{
        label.style.color = 'hsl(0, 1%, 44%)';     
        });

        inputFields.forEach((inputField)=>{
            inputField.style.borderColor = '#e4e4e4';
        });
    }
})

//Controller
const submitBtn = document.querySelector('.arrow-wrapper');
submitBtn.addEventListener('click', errors);