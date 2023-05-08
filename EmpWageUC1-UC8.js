// UC 1 -- To check for the attendance of the employee
const IS_ABSENT = 0;
let employeeCheck = Math.floor((Math.random()*10) % 2);
if(employeeCheck == IS_ABSENT)
{
    console.log("Employee is Absent");
    return;
}
else
{
    console.log("Employee is Present");
}

// UC 2 -- Check for daily wage based on whether the employee is part time or full time
const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HOURS = 4;
const FULL_TIME_HOURS = 8;
const WAGE_PER_HOUR = 20;
const NUM_OF_WORKING_DAYS = 20;
const MAX_HRS_IN_MONTH = 100;

function GetEmployeeHour(employeeTypeCheck)
{
    switch(employeeTypeCheck)
    {
    case IS_PART_TIME:
        return PART_TIME_HOURS;
    case IS_FULL_TIME:
        return FULL_TIME_HOURS;
    default:
        return 0;
    }
}
// Counter for the employee working hours and working days
let totalEmployeeHour = 0;
let totalWorkingDays = 0;
let employeeDailyWage = new Array();
let employeeDailyWageMap = new Map();

// UC5 -- Replacing the for loop with the while loop and then evaluating the employee wage
while(totalWorkingDays < NUM_OF_WORKING_DAYS && totalEmployeeHour <= MAX_HRS_IN_MONTH)
{
    totalWorkingDays++;
    let employeeTypeCheck = Math.floor((Math.random()*10) % 3);
    let employeeHours = GetEmployeeHour(employeeTypeCheck);
    totalEmployeeHour += employeeHours;
    // UC6 -- Adding the daily wage to the array
    employeeDailyWage.push(calculateDailyWageOfEmployee(employeeHours));
    // UC8 -- Adding the daily wage to the map
    employeeDailyWageMap.set(totalWorkingDays, calculateDailyWageOfEmployee(employeeHours));
}
// Computing the employee wage
let employeeWage = calculateDailyWageOfEmployee(totalEmployeeHour);
console.log("Total Working days = "+ totalWorkingDays + "  Total Employee working hours = " + totalEmployeeHour + "  Employee Wage :" + employeeWage);
function calculateDailyWageOfEmployee(employeeHours)
{
    return (employeeHours * WAGE_PER_HOUR);
}
// Printing the daily wage array
console.log("Daily Wage of Employee --->\n" + employeeDailyWage);
console.log("Daily Wage of Employee as Map --->\n");
var mapEntries = employeeDailyWageMap.entries();
for(var element of mapEntries) 
console.log(element);

// UC 7 --> Using the array helper class to perform operations
let totalEmployeeWage = 0;
// Defining the callback function for the helper functions
function sum(dailyWage)
{
    totalEmployeeWage += dailyWage;
}
function totalWageResult(totalWage, dailyWage)
{
    return totalWage + dailyWage;
}
// UC-7a : Using the foreach and reduce array helper function
employeeDailyWage.forEach(sum, 0);
console.log("Employee daily wage using foreach = " + totalEmployeeWage);
console.log("Employee daily wage using reduce = " + employeeDailyWage.reduce(totalWageResult, 0));

// UC-7b : To show the day with daily wage using the array map helper function
let dayCounter = 0;
function MapDayWithDailyWage(dailyWage)
{
    dayCounter++;
    return dayCounter + "=" + dailyWage;
}
let dayWithDailyWageMap = employeeDailyWage.map(MapDayWithDailyWage);
console.log("Day with Daily Wages Map ---> " + dayWithDailyWageMap);

// UC 7c : To show the day when the employee earned the full time wage
function FullTimeWageOfEmployee(dailyWage)
{
    return dailyWage.includes("160");
}
let fullDayWageForEmployeeArray = dayWithDailyWageMap.filter(FullTimeWageOfEmployee);
console.log("Days when the employee earned the full time wage -->" + fullDayWageForEmployeeArray);

// UC 7d : To check for the first occurrence of the full time wage earned
function FindFirstFullTimeOccurence(dailyWage)
{
    return dailyWage.includes("160");
}
console.log("First day when the employee earned the full time wage --> " + dayWithDailyWageMap.find(FindFirstFullTimeOccurence));

// UC 7e : To check for every full time wage in map has full time wage or not
function IsAllFullTimeWage(dailyWageFromMap)
{
    return dailyWageFromMap.includes("160");
}
console.log("Checking whether all the full time contains full time wage --> " + fullDayWageForEmployeeArray.every(IsAllFullTimeWage));

// UC 7f : Check whether there is any part time wages
function FindWhetherThereIsPartTime(dailyWage)
{
    return dailyWage.includes("80");
}
console.log("Check if any part time wage or not -->" + dayWithDailyWageMap.some(FindWhetherThereIsPartTime));

// UC 7g : Find the number of hte days the employee has worked for each
// Logic --> if the employee daily wage = 0 i.e. the employee was absent on that day then return the current value only
function TotalWorkingDays(numberOfDays, dailyWage)
{
    if(dailyWage > 0)
    return numberOfDays+1;
    return numberOfDays;
}
console.log("Number of Days the employee worked for -->" + employeeDailyWage.reduce(TotalWorkingDays, 0));

// UC8 -- Printing the total wage using the map of employee wage and working days
// Basically converting the values part of the map to the array object using from and then using the reduce array helper function
console.log("Total Wage of Employee using map of employee -->" + Array.from(employeeDailyWageMap.values()).reduce(totalWageResult, 0));