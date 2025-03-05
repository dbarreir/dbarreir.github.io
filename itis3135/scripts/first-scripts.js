/* ----------- Part 1 ----------- */
const date = new Date(); // Object date

// Declare array to get day of week and name of month
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Get data for output
const hours = date.getHours();
const meridiem = hours < 12 ? 'AM' : 'PM';
const minutes = date.getMinutes();
const day = date.getDate();
const dayOfWeek = daysOfWeek[date.getDay()];
const month = months[date.getMonth()];
const year = date.getFullYear();
const dateOutput = document.getElementById('date');

// Output date i.e. Today is 3:53pm on Wednesday, 3 November, 2027
dateOutput.innerHTML = `Today is ${hours}:${minutes}${meridiem} on ${dayOfWeek}, ${day} ${month}, ${year}`;

/* ----------- Part 2 ----------- */
const messageOutput = document.getElementById('message-output');
const username = document.getElementById('username');
const feeling = document.getElementById('feelings');
const messageButton = document.getElementById('message-button');
const companyName = 'Barreiro Hub';

// Show message with name and how they're doing
messageButton.addEventListener("click", () => {
    const userValue = username.value;
    const feelingValue = feeling.value;
    messageOutput.innerHTML = userValue && feelingValue 
    ? `The ${companyName} welcomes you, ${userValue}! We're glad you are doing ${feelingValue}!`
    : `Please introduce your name and how are you feeling.`;
});

/* ----------- Part 3 ----------- */
// List of polygons prefixes
const prefixes = {
    1: "hena", 2: "di", 3: "tri", 4: "tetra", 5: "penta", 6: "hexa", 7: "hepta", 8: "octa", 9: "ennea",
    10: "deca", 11: "hendeca", 12: "dodeca", 13: "triskaideca", 14: "tetrakaideca", 15: "pentakaideca",
    16: "hexakaideca", 17: "heptakaideca", 18: "octakaideca", 19: "enneakaideca",
    20: "icosa", 30: "triaconta", 40: "tetraconta", 50: "pentaconta", 60: "hexaconta",
    70: "heptaconta", 80: "octaconta", 90: "enneaconta", 100: "hecta", 200: "dihecta",
    300: "trihecta", 400: "tetrahecta", 500: "pentahecta",600: "hexahecta", 
    700: "heptahecta", 800: "octahecta", 900: "enneahecta"
};

const sides = document.getElementById('sides');
const polygonOutput = document.getElementById('polygon-output');
const polygonButton = document.getElementById('polygon-button');

polygonButton.addEventListener("click", () => {
    let sidesInputValue = sides.value;

    if (sidesInputValue) {
        sidesInputValue = parseInt(sidesInputValue);
        // Error message if number bigger than 999 (absolute number) or 0
        polygonOutput.innerHTML = sidesInputValue < -999 ? 
            `The number shouldn't be less than -999` 
            : sidesInputValue > 999 ? `The number shouldn't be bigger than 999` 
            : sidesInputValue === 0 ? `Please introduce at least one side` : ``;

        // Do not continue if there's an error
        if (polygonOutput.innerHTML) {
            return;
        }

        // Absolute and rounded number
        const sides = Math.round(Math.abs(sidesInputValue));

        let name = '';
        // If in array object display if not separate and search numbers
        if (sides in prefixes) {
            name = prefixes[sides];
        } else {
            const ones = sides % 10;
            const tens = sides % 100 - ones;
            const hundreds = sides - tens - ones;
            const tensValue = tens === 0 ? '' : prefixes[tens];
            const onesValue = ones === 0 ? '' : prefixes[ones];
            name = sides < 100 ? tensValue + onesValue : prefixes[hundreds] + tensValue + onesValue;
        }

        alert(name + 'gon');
    } else {
        polygonOutput.innerHTML = `Please introduce a number.`;
    }
});

/* ----------- Bear themed functions ----------- */
const bearOutput = document.getElementById('bear-output');
const compliments = [
    "You have the warmth of a bear hug on a winter day!",
    "You're as sweet as the finest wild honey!",
    "You're as strong and majestic as a grizzly in the mountains!",
    "Your kindness is as comforting as a sleepy bear cub snuggle!"
];
const facts = [
    "Bears can smell food from miles away! 🐻",
    "Despite their size, bears can run up to 35 mph! 🏃‍♂️💨",
    "Some bears can sleep for over 6 months during hibernation! 😴",
    "Panda bears eat up to 40 pounds of bamboo a day! 🎋"
];
const roars = [
    "tiny growl 🐻",
    "polite grumble 😤",
    "mighty growl 🔥",
    "earth-shaking bellow 🌍"
];

const randomNumber = (number) => {
    return Math.floor(Math.random() * number);
};

document.getElementById('compliment').addEventListener('click', () => {
    bearOutput.innerHTML = compliments[randomNumber(compliments.length)];
});
document.getElementById('roar').addEventListener('click', () => {
    bearOutput.innerHTML = roars[randomNumber(roars.length)];
});
document.getElementById('facts').addEventListener('click', () => {
    bearOutput.innerHTML = facts[randomNumber(facts.length)];
});
document.getElementById('calculate-hibernation').addEventListener('click', () => {
    const days = randomNumber(300);
    bearOutput.innerHTML = `For ${days} days you should hibernate for 💤 ${days * 8} hours (based on bear logic).`;
});