const express = require("express")
const app = express()

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const isoDatetime = new Date().toISOString();
console.log(isoDatetime);
    res.json({
        email: 'isholazeenat@gmail.com',
        current_datetime: isoDatetime,
        github_url: "https://github.com/Taneez-byte/task0",
    })
})

const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if (err) console.log("Error in server setup")
    console.log('Serving on port 80')
});