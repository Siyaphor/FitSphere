
const users = [
  {
    id: 'u1',
    firstName: 'Demo',
    lastName:  'User',
    email:     'demo@fitsphere.in',
    password:  'password123',       // plaintext for demo — hash with bcrypt in prod
    phone:     '+91 98765 43210',
    plan:      'Premium',
    goal:      'Muscle Gain',
    trainer:   'Arjun Singh',
    joinDate:  '1 Jan 2025',
    age:       26,
    height:    175,
    startWeight:  82,
    currentWeight: 76,
    targetWeight:  70,
    startBmi:   26.8,
    bmi:        24.1,
    startChest: 90,
    currentChest: 96,
    startWaist: 88,
    currentWaist: 82,
    daysActive: 95,
    sessionsCompleted: 38,
    sessionsThisMonth: 12,
  }
];

const ADMIN = { email: 'admin@fitsphere.in', password: 'admin123' };

// Find user by email
function findUser(email) {
  return users.find(u => u.email === email) || null;
}

// Register new user
function registerUser(data) {
  const existing = findUser(data.email);
  if (existing) return { error: 'An account with this email already exists.' };
  const user = {
    id: 'u' + Date.now(),
    firstName:     data.firstName,
    lastName:      data.lastName,
    email:         data.email,
    password:      data.password,
    phone:         data.phone || '',
    plan:          data.plan || 'basic',
    goal:          'General Fitness',
    trainer:       null,
    joinDate:      new Date().toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'}),
    age:           null,
    height:        null,
    startWeight:   null,
    currentWeight: null,
    targetWeight:  null,
    bmi:           null,
    startBmi:      null,
    startChest:    null,
    currentChest:  null,
    startWaist:    null,
    currentWaist:  null,
    daysActive:    0,
    sessionsCompleted: 0,
    sessionsThisMonth: 0,
  };
  users.push(user);
  return { user };
}

// Authenticate user
function loginUser(email, password) {
  const user = findUser(email);
  if (!user) return { error: 'No account found with that email.' };
  if (user.password !== password) return { error: 'Incorrect password.' };
  return { user };
}

// Admin auth
function loginAdmin(email, password) {
  if (email === ADMIN.email && password === ADMIN.password) return true;
  return false;
}

// All users (for admin)
function getAllUsers() { return users; }

// Update BMI
function updateBmi(userId, bmi, weight, height) {
  const u = users.find(u => u.id === userId);
  if (u) {
    u.bmi = bmi;
    if (!u.startWeight && weight) { u.startWeight = weight; u.currentWeight = weight; }
    else if (weight) u.currentWeight = weight;
    if (!u.height && height) u.height = height;
  }
}

module.exports = { findUser, registerUser, loginUser, loginAdmin, getAllUsers, updateBmi };