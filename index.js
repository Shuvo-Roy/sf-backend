const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'test',
});

const userSchema = new mongoose.Schema({
  name: String,
  serial: String,
  designation: String,
  startDate: String,
  endDate: String,
});

const UserModel = mongoose.model('User', userSchema);

app.get('/user', async (req, res) => {
  const { serial } = req.query;

  try {
    const user = await UserModel.findOne({ serial });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = {
      name: user.name,
      designation: user.designation,
      startDate: user.startDate,
      endDate: user.endDate,
    };

    res.json(userData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
