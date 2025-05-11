const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const User = require('./models/User');
const Contact = require('./models/Contact');

const app = express();
const PORT = 3000;

// Підключення до MongoDB
mongoose.connect(
  'mongodb+srv://ihorjaremko17:ihor27012006@cluster0.ystwwjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('✅ Підключено до MongoDB'))
  .catch(err => console.error('❌ Помилка підключення до MongoDB:', err));

app.use(cors());
app.use(express.json());

// 🔧 Вказуємо папку зі статичними файлами
app.use(express.static(path.join(__dirname, 'public')));

// 🔁 Повертаємо головну сторінку при GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: логін
app.post('/api/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: identifier }, { name: identifier }]
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Невірні дані' });
    }

    res.status(200).json({
      message: 'Вхід успішний',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при вході' });
  }
});

// API: контактна форма
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ success: false, error: 'Усі поля обов’язкові' });
    }

    const contact = new Contact({ name, phone, email, message });
    await contact.save();

    res.status(201).json({ success: true, message: 'Контакт збережено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Помилка сервера' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`);
});