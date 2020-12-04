window.onload = function(){

    const date = prompt("Введите месяц и год в формате месяц.год");

    let text;
    let month;
    let year;
    
    [text,month,year] = [...checkEnteredDate(date)];
    let dateElement = document.getElementById("currentDate");

    if( text === null ){
        dateElement.innerText = "Введена неверная дата!";
        return;
    }
    else{
        dateElement.innerText = text;
        let tableDiv = document.getElementById("calendarContainer");
        createCalendar(tableDiv,month, year);
    }
}

function isInvalidDate(month, year)
{
    const isNumeric = function(x) {
        if(x === undefined || isNaN(x)) return false;
        return parseFloat(x).toString() === x.toString();
    }
    return !isNumeric(month) || month < 1 || month > 12 || !isNumeric(year);
}

function checkEnteredDate(date)
{
    let dateText = ""
    if (date === null) {
        return [null,null,null];
    }

    const args = date.split(".");
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    const month = args[0];
    const year = args[1];

    if(isInvalidDate(month, year) || args.length!==2){
        dateText = null;
    } else{
        dateText = `${monthNames[month - 1]} ${year}-го года`;
    }
    return [dateText, month, year]; 
}

function findDayNumber(date) { 
    let day = date.getDay();
    if (day == 0){
        return 6;      
    } 
    else{
        return day - 1;
    } 
}

function createCalendar(elem, month, year)
{
    let dateObject = new Date(year, month - 1);
    let table = "<table>";
    const header = "<tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>";
    table+=header;

    //заполнение пустыми ячейками до первого дня месяца
    for (let i = 0; i < findDayNumber(dateObject); i++) {
      table += '<td></td>';
    }

    //пока ещё не закончился месяц
    while (dateObject.getMonth() == month - 1) {
      table += '<td>' + dateObject.getDate() + '</td>';
      //если воскресение - новая строка
      if (findDayNumber(dateObject) % 7 == 6) { 
        table += '</tr><tr>';
      }
      dateObject.setDate(dateObject.getDate() + 1);
    }

    const day = findDayNumber(dateObject);

    if (day != 0) {
      for (let i = day; i < 7; i++) {
        table += '<td></td>';
      }
    }

    table += '</tr></table>';

    elem.innerHTML = table;
    elem.style.visibility = "visible";
}


