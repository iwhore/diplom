const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

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

// Дозвіл парсингу JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Видача статичних файлів з папки public
app.use(express.static(path.join(__dirname, 'public')));

// Роут для реєстрації
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const User = require('./models/User');

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Користувач створений" });
  } catch (error) {
    console.error("Помилка створення користувача:", error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`);
});