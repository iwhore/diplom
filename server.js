const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const User    = require('./models/User');    // ваша існуюча модель користувача
const Contact = require('./models/Contact'); // нова модель для контактів

const app  = express();
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
app.use(express.static('public'));  // тут лежить contact-us.html і стилі

// Логін
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
        id:    user._id,
        name:  user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при вході' });
  }
});

// Контакти
app.post('/api/contacts', async (req, res) => {
  console.log('🔔 POST /api/contacts body:', req.body);
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ success: false, error: 'Усі поля обов’язкові' });
    }

    const contact = new Contact({ name, phone, email, message });
    await contact.save();

    console.log('✅ Contact saved:', contact._id);
    res.status(201).json({ success: true, message: 'Контакт збережено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Помилка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`);
});