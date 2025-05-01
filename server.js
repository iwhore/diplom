const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Схема користувача
const app = express();
const PORT = 3000;


// Підключення до MongoDB
mongoose.connect('mongodb+srv://ihorjaremko17:ihor27012006@cluster0.ystwwjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Підключено до MongoDB");
}).catch((err) => {
  console.error("❌ Помилка підключення до MongoDB:", err);
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Користувач зареєстрований!' });
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: identifier }, { name: identifier }]
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Невірні дані' });
    }

    res.status(200).json({ message: 'Вхід успішний' });
  } catch (error) {
    res.status(500).json({ error: 'Помилка при вході' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`);
});