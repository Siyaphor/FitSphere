const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Form = require('../models/Form');

// GET routes
router.get('/', async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.render('index', { services });
});
router.get('/plans', (req, res) => res.render('plans'));
router.get('/trainers', (req, res) => res.render('trainers'));
router.get('/form', (req, res) => res.render('form'));
router.get('/contact', (req, res) => res.render('contact'));
router.get('/success', (req, res) => res.render('success'));

// POST routes — form & contact submissions redirect to success
router.post('/success', async (req, res) => {
  try {
    await Form.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      plan: req.body.plan,
      goal: req.body.goal,
      subject: req.body.subject,
      message: req.body.message,
      type: req.body.plan ? 'enquiry' : 'contact'
    });

    res.render('success');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/contact', async (req, res) => {
  try {
    await Form.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
      type: 'contact'
    });

    res.render('success');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
