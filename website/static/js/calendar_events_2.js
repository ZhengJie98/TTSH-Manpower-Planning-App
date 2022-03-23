let nav = 0;
let clicked = null;
// let events = seperated_into_each_day // From calendar.html, an object of individual dates
let events = approved_total_leave_by_roles_obj
// console.log(events)

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const new_leave_application = document.getElementById("new_leave_application");
const approve_leave_application = document.getElementById("approve_leave_application");
const my_leaves_div = document.getElementById("my_leaves_div")


// function openModal(date) {
//   clicked = date;
//   // console.log("you have clicked: ", clicked)

//   const eventForDay = events.find(e => e.date === clicked);

//   // if (eventForDay) {
//   //   console.log("WE ARE DELETING EVENT NOW")
//   //   document.getElementById('eventText').innerText = eventForDay.title;
//   //   deleteEventModal.style.display = 'block';
//   // } else {
//   //   console.log("WE ARE ADDING EVENT NOW")
//   //   newEventModal.style.display = 'block';
//   // }
//   // console.log("WE ARE ADDING EVENT NOW")
//   newEventModal.style.display = 'block';
//   // console.log (eventForDay)

//   backDrop.style.display = 'block';
// }


function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-GB', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    var events_for_day_array = []
    const dayString = `${i - paddingDays}/${month + 1}/${year}`;
    // console.log("daystring: ", dayString)

    if (i > paddingDays) {
      // console.log('paddingDays: ', paddingDays)
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);
      // console.log("eventForDay: ", eventForDay)
      for (each_event of events){
        // console.log(each_event)
        if (each_event.date == dayString){
          events_for_day_array.push(each_event)
        }
      }
      

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
        // console.log('daysquare: ', daySquare)
      }

      // if (eventForDay) {
      //   const eventDiv = document.createElement('div');
      //   console.log('eventDiv: ', eventDiv)
      //   eventDiv.classList.add('event');
      //   eventDiv.innerText = eventForDay.title;
      //   console.log('eventForDay.title: ', eventForDay.title)

      //   daySquare.appendChild(eventDiv);
      // }
      var event_index = 0
      // console.log(events_for_day_array)
      if (events_for_day_array.length > 0 ) {
        for (each_event of events_for_day_array){
          // console.log(each_event)

          if (each_event.all_pending_count > 0){
            // console.log("CREATING PENDING EVENT")
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.classList.add("all_pending")
            eventDiv.innerText = "All Pending: " + each_event.all_pending_count;
            eventDiv.style = "background-color:red"
            eventDiv.style.display = "none"
            daySquare.appendChild(eventDiv);
          }

          if (each_event.consultant_pending_count > 0){
            // console.log("CREATING PENDING EVENT")
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.classList.add("CT")
            eventDiv.classList.add("class_specific_pending")
            eventDiv.innerText = "CT Pending: " + each_event.consultant_pending_count;
            eventDiv.style = "background-color:red"
            eventDiv.style.display = "none"
            daySquare.appendChild(eventDiv);
          }

          if (each_event.registrar_pending_count > 0){
            // console.log("CREATING PENDING EVENT")
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.classList.add("RS")
            eventDiv.classList.add("class_specific_pending")
            eventDiv.innerText = "RS Pending: " + each_event.registrar_pending_count;
            eventDiv.style = "background-color:red"
            eventDiv.style.display = "none"
            daySquare.appendChild(eventDiv);
          }

          if (each_event.medical_officer_pending_count > 0){
            // console.log("CREATING PENDING EVENT")
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.classList.add("MO")
            eventDiv.classList.add("class_specific_pending")
            eventDiv.innerText = "MO Pending: " + each_event.medical_officer_pending_count;
            eventDiv.style = "background-color:red"
            eventDiv.style.display = "none"
            daySquare.appendChild(eventDiv);
          }

          if (each_event.consultant_count_am_both > 0){
            // console.log("CREATING CONSULTANT AM BOTH EVENT")
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.classList.add("CT")
            eventDiv.innerText = "CT (AM): " + each_event.consultant_count_am_both;
            eventDiv.style.display = "none"
            daySquare.appendChild(eventDiv);
          }

          if (each_event.consultant_count_pm_both > 0){
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.classList.add("CT")
            eventDiv.innerText = "CT (PM): " + each_event.consultant_count_pm_both;
            eventDiv.style.display = "none"
            daySquare.appendChild(eventDiv);
          }

          
          if (each_event.registrar_count_am_both > 0){
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.classList.add("RS")
            eventDiv.innerText = "RS (AM): " + each_event.registrar_count_am_both;
            eventDiv.style.display = "none"
            daySquare.appendChild(eventDiv);
          }

          if (each_event.registrar_count_pm_both > 0){
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.classList.add("RS")
            eventDiv.innerText = "RS (PM): " + each_event.registrar_count_pm_both;
            eventDiv.style.display = "none"
            daySquare.appendChild(eventDiv);
          }
          
          
          if (each_event.medical_officer_count_am_both > 0){
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.classList.add("MO")
            eventDiv.innerText = "MO (AM): " + each_event.medical_officer_count_am_both;
            eventDiv.style.display = "none"
            daySquare.appendChild(eventDiv);
          }

          if (each_event.medical_officer_count_pm_both > 0){
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.classList.add("MO")
            eventDiv.innerText = "MO (PM): " + each_event.medical_officer_count_pm_both;
            eventDiv.style.display = "none"
            daySquare.appendChild(eventDiv);
          }
          
          event_index += 1
          // console.log("event_index: ", event_index)
        
        }
        }

      
      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
  plastic_surgery()
  
}

// function load() {
//   const dt = new Date();

//   if (nav !== 0) {
//     dt.setMonth(new Date().getMonth() + nav);
//   }

//   const day = dt.getDate();
//   const month = dt.getMonth();
//   const year = dt.getFullYear();

//   const firstDayOfMonth = new Date(year, month, 1);
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
  
//   const dateString = firstDayOfMonth.toLocaleDateString('en-GB', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//   });
//   const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

//   document.getElementById('monthDisplay').innerText = 
//     `${dt.toLocaleDateString('en-GB', { month: 'long' })} ${year}`;

//   calendar.innerHTML = '';

//   for(let i = 1; i <= paddingDays + daysInMonth; i++) {
//     const daySquare = document.createElement('div');
//     daySquare.classList.add('day');
//     var events_for_day_array = []
//     const dayString = `${i - paddingDays}/${month + 1}/${year}`;
//     // console.log("daystring: ", dayString)

//     if (i > paddingDays) {
//       // console.log('paddingDays: ', paddingDays)
//       daySquare.innerText = i - paddingDays;
//       const eventForDay = events.find(e => e.date === dayString);
//       // console.log("eventForDay: ", eventForDay)
//       for (each_event of events){
//         // console.log(each_event)
//         if (each_event.date == dayString){
//           events_for_day_array.push(each_event)
//         }
//       }
//       // console.log(events_for_day_array)

//       if (i - paddingDays === day && nav === 0) {
//         daySquare.id = 'currentDay';
//         // console.log('daysquare: ', daySquare)
//       }

//       // if (eventForDay) {
//       //   const eventDiv = document.createElement('div');
//       //   console.log('eventDiv: ', eventDiv)
//       //   eventDiv.classList.add('event');
//       //   eventDiv.innerText = eventForDay.title;
//       //   console.log('eventForDay.title: ', eventForDay.title)

//       //   daySquare.appendChild(eventDiv);
//       // }
//       var event_index = 0
//       if (events_for_day_array.length > 0 ) {
//         for (each_event of events_for_day_array){
//           // console.log(each_event)
//           const eventDiv = document.createElement('div');
//           // console.log('eventDiv: ', eventDiv)
//           eventDiv.classList.add('event');
//           eventDiv.innerText = each_event.title;
//           // console.log('eventForDay.title: ', each_event.title)

//           daySquare.appendChild(eventDiv);
//           event_index += 1
//           // console.log("event_index: ", event_index)
        
//         }
//         }

      
//       daySquare.addEventListener('click', () => openModal(dayString));
//     } else {
//       daySquare.classList.add('padding');
//     }

//     calendar.appendChild(daySquare);    
//   }
// }

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    console.log('eventTitleInput: ',eventTitleInput.value)
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });
  
}

function open_leave_application(){
  new_leave_application.style.display ='block';
  backDrop.style.display = 'block';


}

function close_leave_application(){
 
  new_leave_application.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  load();

}
function save_leave_button(){
  close_leave_application()
}

function cancel_leave_button(){

  close_leave_application()
}


function open_approve_leave_application(){
  
  approve_leave_application.style.display ='block';
  backDrop.style.display = 'block';
  
  var open_approve_yes = "Yes";
  // console.log("Keep Open BEFORE SETTING: ", localStorage.getItem("keep_open"))

  localStorage.setItem("keep_open", open_approve_yes);
  // var omy = localStorage.getItem("keep_open")
  // console.log(omy)
  // localStorage.removeItem("still_approving");
  // console.log("REMOVED LOCAL STORAGE")

}

function close_leave_approval(){

  approve_leave_application.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  
  load();

}
function close_leave_approval_button(){
  // console.log("CLICKED CLOSE LEAVE APPROVAL BUTTON")
  localStorage.removeItem("keep_open")
  close_leave_approval()
}

function open_my_leaves(){
  
  my_leaves_div.style.display ='block';
  backDrop.style.display = 'block';
}

function close_my_leaves(){

  my_leaves_div.style.display = 'none';
  backDrop.style.display = 'none';
  load();
}

document.getElementById('saveButton').addEventListener('click', saveEvent);
document.getElementById('cancelButton').addEventListener('click', closeModal);
document.getElementById('deleteButton').addEventListener('click', deleteEvent);
document.getElementById('closeButton').addEventListener('click', closeModal);
document.getElementById('request_leave').addEventListener('click', open_leave_application);
document.getElementById('save_leave_application_button').addEventListener('click', save_leave_button);
document.getElementById('cancel_leave_application_button').addEventListener('click', cancel_leave_button);
document.getElementById('approve_leave').addEventListener('click', open_approve_leave_application);
document.getElementById('close_leave_approval_button').addEventListener('click', close_leave_approval_button);
document.getElementById("my_leaves_button").addEventListener('click', open_my_leaves);
document.getElementById('close_my_leaves_button').addEventListener('click', close_my_leaves);



// zj function delete all items
function deleteItems(){
  localStorage.clear()
}

initButtons();
load();
// deleteItems();

// keep approval page displayed unless close button pressed
// console.log(localStorage.getItem("keep_open"))
if (localStorage.getItem("keep_open") && is_admin=="1"){
  open_approve_leave_application()
  // console.log(localStorage.getItem("keep_open"))
}


function plastic_surgery(){

  //Display Feature based on role/position
// if role == admin, can see all hence do nothing.
//else if not, can only see own position by display none
var events_to_be_shown = document.getElementsByClassName("event")
var all_days = document.getElementsByClassName('day')

position_to_shortform = {'Medical Officer': 'MO', 'Registrar' : 'RS', 'Consultant' : 'CT' }

// console.log(position_to_shortform[applicant_position]){
//   console.log(each)
// && !each_event.classList.contains("all_pending")

if (is_admin == "0"){
  for (each_event of events_to_be_shown){

    if (each_event.classList.contains(position_to_shortform[applicant_position])){
      each_event.style.display = "block"
    }
  }
  
  for (each of all_days){
    // console.log(each)
    each.style.height="110px"
  }  
}

else if (is_admin=="1"){
  for(each_event of events_to_be_shown){
    if (!each_event.classList.contains('class_specific_pending'))
      each_event.style.display = "block"
  }  
}

}

function sort_approval_table(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("leave_approval_table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sort_approval_tableint(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("leave_approval_table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sort_my_leaves_table(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("my_leaves_table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sort_my_leaves_tableint(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("my_leaves_table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


plastic_surgery()

// var get_approval_table = document.getElementsByClassName("approval_table_values")
// console.log(get_approval_table)

// for (each in get_approval_table){
//   console.log(get_approval_table[each].getElementsByTagName("td")[0]
// }