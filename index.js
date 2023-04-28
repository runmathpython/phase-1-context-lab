const employeeData = ["Gray", "Worm", "Security", 1];
let testEmployee;

function createEmployeeRecord(employeeData){
    const anEmployee = {
        firstName: "",
        familyName: "",
        title: "",
        payPerHour: 0,
        timeInEvents: [],
        timeOutEvents: []
    };
    
    anEmployee.firstName = employeeData[0];
    anEmployee.familyName = employeeData[1];
    anEmployee.title = employeeData[2];
    anEmployee.payPerHour = employeeData[3];
    //anEmployee.timeInEvents = [];
    //anEmployee.timeOutEvents = [];
    return anEmployee;
};
testEmployee = createEmployeeRecord(employeeData);
console.log("testEmployee: ", testEmployee)

//----------------------------

let employeeRecords;
const twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
];

function createEmployeeRecords(employees){
    let employeeRecords = [];
        
    employeeRecords = employees.map(function(item) {

        let one = createEmployeeRecord(item);
        let oneEmployee = Object.assign({}, one);
        //let oneEmployee = {...anEmployee}
        return oneEmployee;
    });

    return employeeRecords;
}

employeeRecords = createEmployeeRecords(twoRows);
let firstNames = employeeRecords.map(obj => obj.firstName);
console.log("firstNames1: ", firstNames);

//------------------------//

let dataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
    ["Byron", "Poodle", "Mascot", 3],
    ["Julius", "Caesar", "General", 27],
    ["Rafiki", "", "Aide", 10],
    ["Simba", "", "King", 100]
  ];

employeeRecords = createEmployeeRecords(dataEmployees);
firstNames = employeeRecords.map(obj => obj.firstName);
console.log("firstNames2: ", firstNames);

//--------------------------------

let bpRecord = createEmployeeRecord(dataEmployees[6]);

function createTimeInEvent(timeIn){
    const timeInArray = timeIn.split(" ");
    const newEvent = {
        type: "TimeIn",
        hour: parseInt(timeInArray[1]),
        date: timeInArray[0]
    };
    this.timeInEvents.push(newEvent); //bpRecord.timeInEvents[0]
    this.timeInEvents.push(timeIn); //bpRecord.timeInEvents[1]
    return this;
};

let theTimeInEvent = createTimeInEvent.bind(bpRecord);
let updatedBpRecord = theTimeInEvent("2014-02-28 1400");
console.log("The type should be TimeIn: ", updatedBpRecord.timeInEvents[0].type);

//-------------------

//bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
bpRecord = createEmployeeRecord(dataEmployees[6]);

function createTimeOutEvent(timeOut){
    const timeOutArray = timeOut.split(" ");
    let newEvent = {
        type: "TimeOut",
        hour: parseInt(timeOutArray[1]),
        date: timeOutArray[0]
    }
    this.timeOutEvents.push(newEvent); //bpRecord.timeOutEvents[0]
    this.timeOutEvents.push(timeOut); //bpRecord.timeOutEvents[1]
    return this;
};
let theTimeOutEvent = createTimeOutEvent.bind(bpRecord);
updatedBpRecord = theTimeOutEvent("2015-02-28 1700");
console.log("The type should be TimeOut: ", updatedBpRecord.timeOutEvents[0].type);

//---------------------

let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000]);

function hoursWorkedOnDate(theDate){
  let foundItem = this.timeOutEvents.find(item => item.date === theDate);
  let hourOut = foundItem.hour;
  foundItem = this.timeInEvents.find(item => item.date === theDate);
  let hourIn = foundItem.hour;
  return (hourOut - hourIn)/100;
};

theTimeInEvent = createTimeInEvent.bind(cRecord);
updatedBpRecord = theTimeInEvent("0044-03-15 0900");

theTimeOutEvent = createTimeOutEvent.bind(cRecord);
updatedBpRecord = theTimeOutEvent("0044-03-15 1100");

let theHoursWorkedOnDate = hoursWorkedOnDate.bind(updatedBpRecord);
let hours = theHoursWorkedOnDate(updatedBpRecord.timeInEvents[0].date);
console.log("hours: ", hours);

//--------------------------

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);

function wagesEarnedOnDate(date){
  const hrsWrkdOnDate = hoursWorkedOnDate.bind(this);
  const hours = hrsWrkdOnDate(date);
  return this.payPerHour * hours;
};

theTimeInEvent = createTimeInEvent.bind(cRecord);
updatedBpRecord = theTimeInEvent("0044-03-15 0900");

theTimeOutEvent = createTimeOutEvent.bind(cRecord);
updatedBpRecord = theTimeOutEvent("0044-03-15 1100");

let theWagesEarnedOnDate = wagesEarnedOnDate.bind(updatedBpRecord);
let payOwed = theWagesEarnedOnDate(updatedBpRecord.timeInEvents[0].date);
console.log("payOwed: ", payOwed);

//----------------------------
/*
function allWagesFor(){

  let c = this.timeInEvents.length/2;
  let dailyPay = 0, payOwed = 0;

  for (let i = 0; i < c; i++) {
    let theWagesEarnedOnDate = wagesEarnedOnDate.bind(this);
    dailyPay = theWagesEarnedOnDate(this.timeInEvents[i*2].date);
    payOwed += dailyPay;
  }
  return payOwed;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
      if (e.date === undefined){
        return ""
      } else {
        return e.date
      }
    })
    const payable = eligibleDates.reduce(function (memo, d) {
      if (d !== ""){
        return memo + wagesEarnedOnDate.call(this, d)
      } else {
        return memo
      }
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
*/

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    if (e.date === undefined){
        return ""
      } else {
        return e.date
      }
  });

  const payable = eligibleDates.reduce(function (memo, d) {
    let theWagesEarnedOnDate = wagesEarnedOnDate.bind(this);
    if (d !== ""){
      return memo + theWagesEarnedOnDate(d);
    } else {
      return memo;
    }
    //return memo + wagesEarnedOnDate.call(this, d)
  }.bind(this), 0);

  return payable;
};


cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);

theTimeInEvent = createTimeInEvent.bind(cRecord);
updatedBpRecord = theTimeInEvent("0044-03-14 0900");

theTimeOutEvent = createTimeOutEvent.bind(cRecord);
updatedBpRecord = theTimeOutEvent("0044-03-14 2100");

theTimeInEvent = createTimeInEvent.bind(cRecord);
updatedBpRecord = theTimeInEvent("0044-03-15 0900");

theTimeOutEvent = createTimeOutEvent.bind(cRecord);
updatedBpRecord = theTimeOutEvent("0044-03-15 1100");

let allTheWagesFor = allWagesFor.bind(cRecord);
const allWages = allTheWagesFor();

console.log("allWages: ", allWages);



//--------------------------

function calculatePayroll(employeesData){
  let grandTotalOwed = employeesData.reduce(function (m, e) {
    let allTheWagesFor = allWagesFor.bind(e);
    return m + allTheWagesFor();
  }, 0 );

  return grandTotalOwed;
  };

let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10]);
let sRecord = createEmployeeRecord(["Simba", "", "King", 100]);

let sTimeData = [
  ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
  ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
];
    
let rTimeData = [
  ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
  ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 30 ===> 70 total ||=> 770
];

sTimeData.forEach(function (d) {
  let [dIn, dOut] = d
  theTimeInEvent = createTimeInEvent.bind(sRecord);
  sRecord = theTimeInEvent(dIn);

  theTimeOutEvent = createTimeOutEvent.bind(sRecord);
  sRecord = theTimeOutEvent(dOut);
})

rTimeData.forEach(function (d, i) {
  let [dIn, dOut] = d
  theTimeInEvent = createTimeInEvent.bind(rRecord);
  rRecord = theTimeInEvent(dIn);

  theTimeOutEvent = createTimeOutEvent.bind(rRecord);
  rRecord = theTimeOutEvent(dOut);
})

let employees = [sRecord, rRecord];
let grandTotal = calculatePayroll(employees);
console.log("grandTotal: ", grandTotal);

//---------------------------

function findEmployeeByFirstName(srcEmployees, theFirstName){
  return srcEmployees.find(anEmployee => anEmployee.firstName === theFirstName);
}
let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ];
let srcEmployees = createEmployeeRecords(src);
let srcFirstNames = srcEmployees.map(function (e) {
    return e.firstName;
  });
const theFirstName = "Natalia";
//const theFirstName = "James";
const theRecOfTheFirstName = findEmployeeByFirstName(srcEmployees, theFirstName);
if (theRecOfTheFirstName !== undefined){
  console.log(`The first name is found, and is ${theRecOfTheFirstName.firstName}.` )
} else {
  console.log("The first name is not found.")
};

//-------------------------------------------------

const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ];

const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ];

const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-02 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ];

let csvEmployeeRecords = createEmployeeRecords(csvDataEmployees);
console.log("csv before: ", csvEmployeeRecords);

csvEmployeeRecords.forEach(function (rec) {
    let timesInRecordRow = csvTimesIn.find(function (row) {
        return rec.firstName === row[0];
    });

    let timesOutRecordRow = csvTimesOut.find(function (row) {
      return rec.firstName === row[0];
    });

    timesInRecordRow[1].forEach(function(timeInStamp){
      theTimeInEvent = createTimeInEvent.bind(rec);
      rRecord = theTimeInEvent(timeInStamp);
    });

    timesOutRecordRow[1].forEach(function(timeOutStamp){
      theTimeOutEvent = createTimeOutEvent.bind(rec);
      rRecord = theTimeOutEvent(timeOutStamp);
    });
});

console.log("csv after: ", csvEmployeeRecords);

let grandTotalOwed = calculatePayroll(csvEmployeeRecords);
console.log("grandTotalOwed: ", grandTotalOwed);

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
*/
