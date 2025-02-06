const express = require("express")
const app = express()
const fs = require('fs');
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

function isPrime(num) {
    if (num <= 1) return false; // 0 and 1 are not prime numbers
    if (num <= 3) return true; // 2 and 3 are prime numbers

    if (num % 2 === 0 || num % 3 === 0) return false; // Eliminate multiples of 2 and 3

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
}

function isPerfectNumber(num) {
    if (num <= 1) return false; // Perfect numbers must be greater than 1

    let sum = 1; // 1 is always a divisor

    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i; // Add the corresponding divisor
        }
    }

    return sum === num;
}

function isOdd(num) {
    return num % 2 !== 0;
}

function isArmstrongNumber(num) {
    let originalNum = num;
    let numDigits = num.toString().length;
    let sum = 0;

    while (num > 0) {
        let digit = num % 10; // Extract the last digit
        sum += Math.pow(digit, numDigits); // Raise it to the power of numDigits
        num = Math.floor(num / 10); // Remove the last digit
    }

    return sum === originalNum;
}

function sumOfDigits(num) {
    let sum = 0;
    
    while (num > 0) {
        sum += num % 10; // Extract the last digit and add to sum
        num = Math.floor(num / 10); // Remove the last digit
    }

    return sum;
}

async function readWebStreamToVariable(readableStream) {
    const reader = readableStream.getReader();
    let data = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break; // Stop when stream ends
        data += new TextDecoder().decode(value); // Decode binary data
    }

    return data;
}

app.get('/', (req, res) => {
    const isoDatetime = new Date().toISOString();
console.log(isoDatetime);
    res.json({
        email: 'isholazeenat@gmail.com',
        current_datetime: isoDatetime,
        github_url: "https://github.com/Taneez-byte/task0",
    })
})

app.get('/api/classify-number', async(req, res) => {
    let num
    if (!req.query.number){
        res.status(400).json({
            "number": "alphabet",
            "error": true
        }) 
    }
    try {
       num = parseInt(req.query.number)
    } catch (error) {
        res.status(400).json({
            "number": "alphabet",
            "error": true
        }) 
    }
  
    if (!num){
        res.status(400).json({
            "number": "alphabet",
            "error": true
        })
    }
    const prime = isPrime(num)
    const perfect = isPerfectNumber(num)
    const armstrong = isArmstrongNumber(num)
    const parity = isOdd(num)
    let properties = []
    console.log(armstrong)
    if (armstrong){
        console.log("armstrong")
        properties.push("armstrong")
    }
    if (parity){
        properties.push("odd")
    } 
    else {
        properties.push("even")
    }

    const digitSum = sumOfDigits(num)

    try {
        const response = await fetch(`http://numbersapi.com/${num}/math`);
        var content = await readWebStreamToVariable(response.body);
        console.log('Saved Content:', content);
    } catch (error) {
        console.error('Error:', error);
    }
    
    res.json({
        "number": num,
        "is_prime": prime,
        "is_perfect": perfect,
        "properties": properties,
        "digit_sum": digitSum,  // sum of its digits
        "fun_fact": content //gotten from the numbers API
    })
})
const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if (err) console.log("Error in server setup")
    console.log('Serving on port 80')
});