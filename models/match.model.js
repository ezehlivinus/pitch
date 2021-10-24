
import mongoose from 'mongoose';


const matchSchema = new mongoose.Schema({

  team: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Team'
  },

  opponent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Team'
  },
  
  time: {
    type: Date,
    default: new Date()
  },

  status: {
    type: String,
    trim: true,
    enum: ['finished', 'canceled', 'postponed', 'ongoing', 'pending'],
    default: 'pending'
  },

  // both or name of the winning team if not draw
  winner: {
    type: Object
    // { name: 'team_name', result: 'win'} // winner.result
  }

}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

export default Match;
