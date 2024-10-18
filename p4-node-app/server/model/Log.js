const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
    createdAt:{ type: Date, default: Date.now },
    distance:Number,
    duration:Number,
    avgSpeed:Number,
    calBurned:Number,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const LogModel = mongoose.model("Log", LogSchema);

module.exports = LogModel;