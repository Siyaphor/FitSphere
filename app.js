require('dotenv').config();

const express = require('express');
const session = require('express-session');
const Service = require('./models/Service');
const connectDB = require('./config/db');

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'fitsphere-secret-key',
  resave: false,
  saveUninitialized: false
}));

// ================= DB =================
connectDB();

// ================= VIEW ENGINE =================
app.set('view engine', 'ejs');
app.set('views', './views');

// ================= ROUTES =================

// ================= ROUTES =================

// Homepage
app.get('/', async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.render('index', { services });
});

const webRoutes   = require('./routes/web');  
const authRoutes  = require('./routes/auth');
const userRoutes  = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use('/', webRoutes);     
app.use('/', authRoutes);
app.use('/dashboard', userRoutes);
app.use('/admin', adminRoutes);

// ================= LOGOUT =================
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("FitSphere running → http://localhost:" + PORT);
});

