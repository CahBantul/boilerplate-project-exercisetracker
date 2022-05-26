const Exercise = require('../models/Exercise');
const User = require('../models/User');

module.exports = {
  postExercise: async (req, res) => {
    const { _id, date, duration, description } = req.body;
    const checkDate =
      new Date(date) == 'Invalid Date' ? new Date() : new Date(date);
    console.log(_id);

    const user = await User.findOne({ _id });
    console.log(user);

    if (!user) {
      return res.json({ message: 'user not found' });
    }
    Exercise.create({
      username: user.username,
      date: checkDate.toDateString(),
      duration,
      description,
    })
      .then((data) => {
        console.log('saved exercise successfully');
        res.json({
          _id: data._id,
          username: data.username,
          date: data.date.toDateString(),
          duration: data.duration,
          description: data.description,
        });
      })
      .catch((err) => console.log(err));
  },
};
