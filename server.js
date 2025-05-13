const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const User    = require('./models/User');    // ваша схема користувача
const Contact = require('./models/Contact'); // схема для контактів
const Review  = require('./models/Review');

const app  = express();
const PORT = 3000;

// 1. Підключаємося до MongoDB
mongoose.connect(
  'mongodb+srv://ihorjaremko17:ihor27012006@cluster0.ystwwjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('✅ Підключено до MongoDB'))
.catch(err => console.error('❌ Помилка підключення до MongoDB:', err));

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. API-роути

// 3.1 Реєстрація
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Користувач зареєстрований!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// 3.2 Логін
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
    console.error(error);
    res.status(500).json({ error: 'Помилка при вході' });
  }
});

// 3.3 Contact Us
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    const contact = new Contact({ name, phone, email, message });
    await contact.save();
    res.status(201).json({ message: 'Повідомлення надіслано!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не вдалося надіслати повідомлення' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;
    const review = new Review({ name, email, rating, message });
    await review.save();
    res.status(201).json({ message: 'Відгук успішно додано!' });
  } catch (error) {
    console.error('Помилка збереження відгуку:', error);
    res.status(500).json({ error: 'Не вдалося додати відгук' });
  }
});

app.use(express.static('public'));

app.listen(PORT, () =>
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`)
);