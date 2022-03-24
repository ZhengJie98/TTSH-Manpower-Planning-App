else if (applicant_position == "Medical Officer"){
  for (each of medical_officer_both_only_objects){
    console.log(each)
    applied_both_table = document.getElementById("applied_both").innerHTML +=  `
    <tr>
        <td> ${each.title}</td>
        <td> ${each.employee_position}</td>     
    </tr>
    `
  }

  for (each of medical_officer_am_only_objects){
    console.log(each)
    applied_both_table = document.getElementById("applied_am").innerHTML +=  `
    <tr>
        <td> ${each.title}</td>
        <td> ${each.employee_position}</td>     
    </tr>
    `
  }

  for (each of medical_officer_pm_only_objects){
    console.log(each)
    applied_both_table = document.getElementById("applied_pm").innerHTML +=  `
    <tr>
        <td> ${each.title}</td>
        <td> ${each.employee_position}</td>     
    </tr>
    `
  }
}