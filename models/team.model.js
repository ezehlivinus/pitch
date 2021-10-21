import mongoose from 'mongoose';


// Define team schema
const teamSchema = new mongoose.Schema({

  name: {
    type: String,
    unique: true,
    required: true, 
    minlength: 3,
    maxlength: 200,
    trim: true,
    alias: 'title'
  },

  // this is calculated
  numberOfPlayers: {
    type: Number,
    default: 0
  },

  captainId: {
    type: String,
    trim: true,
  },
  
  viceCaptainId: {
    type: String,
    trim: true
  },

  managerId: {
    type: String,
    trim: true
  },

  stadium: {
    type: Object,
    trim: true
  },
  
  foundedOn: {
    type: Date,
    default: new Date()
  },

}, { timestamps: true });


const Team = mongoose.model('Team', teamSchema);

export default Team;
