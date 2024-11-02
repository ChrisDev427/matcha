// const User = require('../models/User');
// const connectBdd = require('./connectBdd');
// let userProfile = require('../models/userProfile');

// async function getUser(req, res){
// 	await connectBdd();
// 	console.log("req.params.username = ", req.params.username);
// 	const user = await User.findOne({username: req.params.username});
// 	if (!user) {
// 		return res.status(404).json({ message: "User not found" });
// 	}
// 	console.log("user = ", user.username);
// 	userProfile = new userProfile(user);
// 	console.log(userProfile);
// 	res.status(200).json({ user: userProfile });
// }

// module.exports = getUser;

const User = require('../models/User');
const connectBdd = require('./connectBdd');
const UserProfile = require('../models/UserProfile');  // Correctly import UserProfile class

async function getUser(req, res) {
  await connectBdd();
  console.log("req.params.username = ", req.params.username);
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log("user = ", user.username);
  const userProfileInstance = new UserProfile(user);  // Correct instantiation
  console.log(userProfileInstance);
  res.status(200).json({ user: userProfileInstance.getProfile() });  // Use the getProfile method if needed
}

module.exports = getUser;