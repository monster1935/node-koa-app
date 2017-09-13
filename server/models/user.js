import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  avatar: String,
  createTime: String
}, { versionKey: false });

export default mongoose.model('user', userSchema);
