var firebaseConfig = {
  apiKey: "AIzaSyBF10yuEQRsUSn4npfjuC825bHWd2EPzDw",
  authDomain: "employeedb-f4de4.firebaseapp.com",
  databaseURL: "https://employeedb-f4de4.firebaseio.com",
  projectId: "employeedb-f4de4",
  storageBucket: "",
  messagingSenderId: "701470365501",
  appId: "1:701470365501:web:18d59f1767fa0a0c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let database = firebase.database();


/*
Employ Name: EmployeeName-input
Role: Role-input
Start Date: StartDate-input
Monthly Rate: MonthlyRate-input
Submit button: submit

*/






// Update Database When Submit button is clicked

$("#submit").on("click", pushAndDisplay)

function pushAndDisplay(event) {
  event.preventDefault();

  var empName = $("#EmployeeName-input").val().trim();
  var empRole = $("#Role-input").val().trim();
  var empStart = $("#StartDate-input").val().trim();
  var empRate = $("#MonthlyRate-input").val().trim();
  // push to the database
  // 
  database.ref('/users').push(
    {
      employee: empName,
      role: empRole,
      startdate: empStart,
      monthlyrate: empRate,
      dataAdded: firebase.database.ServerValue.TIMESTAMP
      }
  );

  // Grab the value in the firebase database



}

// Firebase watcher .on("child_added")
database.ref('/users').on("child_added", function(snapshot) {
  // console.log("Errors handled: " + errorObject.code);
  var sv = snapshot.val();
  console.log("Employee: " + sv);
  var monthsWorked = getDateDifference(sv.startdate);
  console.log(monthsWorked);
  var Total = total(monthsWorked, sv.monthlyrate);
  AddToScreen(sv, monthsWorked, Total)

}, 
)



function AddToScreen(employee, month, Total){
    $("#employee-table tbody").append(`
    <tr>
      <td>${employee.employee}</td>
      <td>${employee.role}</td>
      <td>${employee.startdate}</td>
      <td>${month}</td>
      <td>${employee.monthlyrate}</td>
      <td>${Total}</td>
  </tr>
 `);
}

function getDateDifference(date){

  date = new Date(date);
  let today = new Date();

  let oldMonth = date.getMonth(); //
  let oldYear = date.getYear();
  let newMonth = today.getMonth();
  let newYear = today.getYear();

  let year = newYear - oldYear;
  let months = 0;
  if(year > 0){
    months += year*12;
  }

  months += newMonth - oldMonth;
  return months;
}

// const monthDifference = moment(new Date()).diff(new Date(date), 'months', true);

function total(months, rate) {
  var total = months * parseInt(rate);
  return total;
}





