
          if (each_event.medical_officer_am_both > 0){
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerText = "CT (AM): " + each_event.medical_officer_am_both;
            daySquare.appendChild(eventDiv);
          }

          if (each_event.medical_officer_pm_both > 0){
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerText = "CT (PM): " + each_event.medical_officer_pm_both;
            daySquare.appendChild(eventDiv);
          }