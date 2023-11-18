import app from "./app"

const mongoose = require("mongoose");

async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
}

const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})