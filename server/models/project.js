const mongoose = require('mongoose')
const {Schema} = mongoose

const projectSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Missing Project name'],
    } ,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    timestamps: true,
    versionKey: false
})


const Project = mongoose.model('Project', projectSchema)

module.exports = Project