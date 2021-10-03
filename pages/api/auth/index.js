import mongoose from "mongoose";

export default function handler(req, res) {
    debugger;
    const mongoose = require('mongoose');
    main().catch(err => console.log(err));

    async function main() {
        await mongoose.connect('mongodb://localhost:27017/test');
    }
    res.status(200).json({name: 'John Doe'})
}
