const Exercise = require('../models/Exercise');
const User = require('../models/User');
const Log = require('../models/Log');

module.exports = {
  getLogs: async (req, res) => {
    const { _id } = req.params;
    const { from, to } = req.query;
    const limit = req.query.limit || 100;

    const user = await User.findOne({ _id });

    if (!user) {
      return res.json({ message: 'user not found' });
    }

    const query = {
      username: user.username,
    };

    if (from !== undefined && to === undefined) {
      query.date = { $gte: new Date(from) };
    } else if (to !== undefined && from === undefined) {
      query.date = { $lte: new Date(to) };
    } else if (from !== undefined && to !== undefined) {
      query.date = { $gte: new Date(from), $lte: new Date(to) };
    }

    const exercise = await Exercise.find(query)
      .limit(limit)
      .then((data) => data)
      .catch((err) => err);

    let loggedArray = exercise.map((item) => {
      return {
        description: item.description,
        duration: item.duration,
        date: item.date.toDateString(),
      };
    });

    Log.create({
      username: user.username,
      count: loggedArray.length,
      log: loggedArray,
    })
      .then((data) =>
        res.json({
          _id: data._id,
          username: data.username,
          count: data.count,
          log: loggedArray,
        })
      )
      .catch((err) => err);
  },
};
