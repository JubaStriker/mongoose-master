import app from "./app"

const mongoose = require("mongoose");

async function main() {
    await mongoose.connect();
}

const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})