import mongoose from 'mongoose';

const RoommateSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  course: String,
  bio: String,
  education: String,
  smokingPreference: String,
  foodPreference: String,
  countryOfOrigin: String,
});

export default mongoose.model('Roommate', RoommateSchema);