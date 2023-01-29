let date = new Date("December 20, 2022") //now

console.log(date)

//get week number in the month - for aesthetic purposes only
let getWeekMonth = (date) => {
    let monthStart = new Date(date)
    monthStart.setDate(0)
    let offset = (monthStart.getDay() + 1) % 7 //set to Sunday as start of week
    return Math.ceil((date.getDate() + offset) / 7);
}

//get week number from beginning of year
let getWeekNumber = (date) => {
    
    const oneDay = 24 * 60 * 60 * 1000
    
    //beginning of year - Jan 1
    let yearStart = new Date(date.getFullYear(), 0, 1)

    //include offset of day in month
    let monthStart = new Date(date)
    monthStart.setDate(0)
    let offset = (monthStart.getDay() + 1) % 7 //set to Sunday as start of week
    console.log("offset: " + offset)
    
    //calculate week of month
    let weekMonth = Math.ceil((date.getDate() + offset) / 7)
    console.log("weekMonth: " + weekMonth)
    
    //calculate week of year subtract by offset, +1 to add the missing day from subraction   
    let days = Math.floor((date - yearStart) / oneDay) + 1 - offset - date.getDate()
    if (days < 0) {
        days = 0
    }
    let remainingWeeks = Math.ceil(days / 7 )
    console.log("days:" + days)
    console.log("remainingWeeks: " + remainingWeeks)
    
    totalWeeks = weekMonth + remainingWeeks
    
    return totalWeeks
    
}


let getDaysOfWeek = (w, y) => {
    

    let date = new Date(y, 0, (1 + (w-1) * 7)); // 1st of January + 7 days for each week

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    
    let sunday = new Date(date.setDate(date.getDate() + (0 - date.getDay()))).toLocaleDateString(undefined, options)
    let monday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 1)).toLocaleDateString(undefined, options)
    let tuesday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 2)).toLocaleDateString(undefined, options)
    let wednesday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 3)).toLocaleDateString(undefined, options)
    let thursday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 4)).toLocaleDateString(undefined, options)
    let friday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 5)).toLocaleDateString(undefined, options)
    let saturday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 6)).toLocaleDateString(undefined, options)
 
    console.log(sunday)
    console.log(monday)
    console.log(tuesday)
    console.log(wednesday)
    console.log(thursday)
    console.log(friday)
    console.log(saturday)
    
}

let week = getWeekOfMonth(date)
console.log(week)
let year = date.getFullYear()
console.log(year)

getDaysOfWeek(week, year)