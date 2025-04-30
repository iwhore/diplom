const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/User"); // модель користувача

const app = express();
const PORT = 3000;

// Підключення до MongoDB
mongoose.connect("mongodb+srv://ihorjaremko17:ihor27012006@cluster0.ystwwjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Підключено до MongoDB"))
.catch(err => console.error("❌ Помилка підключення до MongoDB:", err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Статичні файли (вся папка public буде доступна)
app.use(express.static(__dirname));

// Роут для signup (реєстрація)
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Перевірка
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Заповніть усі поля' });
  }

  // Збереження
  try {
    const User = require('./models/User'); // припустимо є файл з моделлю
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Користувач зареєстрований' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера', error: err });
  }
});

// Кореневий маршрут (якщо треба)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});