const User = require('../models/User');

module.exports = {
  postUser: async (req, res) => {
    const { username } = req.body;
    const duplicate = await User.findOne({ username })
      .then((data) => data)
      .catch((err) => console.log(err));

    if (duplicate) {
      return res.json({
        username: duplicate.username,
        _id: duplicate._id,
      });
    }

    await User.create({
      username,
    }).then((data) => {
      res.json({
        username: data.username,
        _id: data._id,
      });
    });
  },

  getAllUsers: (req, res) => {
    User.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json({ message: 'Belum ada data' }));
  },
};
