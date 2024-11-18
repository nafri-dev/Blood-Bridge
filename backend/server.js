import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: 'http://blood-bridge-roan.vercel.app/', // Replace with your frontend URL
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Schemas
const donorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  weight: Number,
  bloodType: String,
  latitude: Number,
  longitude: Number,
  lastDonation: Date,
  healthCondition: String,
  medications: String,
  recentIllness: String,
  isDonated: { type: Boolean, default: false } // Add this line
});

const requestSchema = new mongoose.Schema({
  patientName: String,
  contactName: String,
  relationship: String,
  email: String,
  phone: String,
  bloodType: String,
  unitsNeeded: Number,
  hospital: String,
  urgency: String,
  reason: String,
  additionalInfo: String,
  requestDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Donor = mongoose.model('Donor', donorSchema);
const Request = mongoose.model('Request', requestSchema);
const User = mongoose.model('User', userSchema);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const requests = await Request.find();
    const donors = await Donor.find({ isDonated: false });
    const donatedDonors = await Donor.find({ isDonated: true });
    res.json({ requests, donors, donatedDonors });
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

app.post('/api/donors', async (req, res) => {
  const newDonor = new Donor(req.body);
  try {
    await newDonor.save();
    res.status(201).json({ message: 'Donor added successfully', donor: newDonor });
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

app.post('/api/requests', async (req, res) => {
  const newRequest = new Request(req.body);
  try {
    await newRequest.save();
    res.status(201).json({ message: 'Request added successfully', request: newRequest });
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

app.put('/api/requests/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error: error.message });
  }
});

app.get('/api/donors', async (req, res) => {
  try {
    const donors = await Donor.find({ isDonated: false });
    res.json(donors);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

app.post('/api/contact-donor', authenticateToken, async (req, res) => {
  const { donorId, message } = req.body;
  try {
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    // Here you would typically send an email or notification to the donor
    // For this example, we'll just log the message
    console.log(`Message sent to donor ${donorId}: ${message}`);
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

// New routes for handling donated donors
app.put('/api/donors/:id/donate', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDonor = await Donor.findByIdAndUpdate(id, 
      { isDonated: true, lastDonation: new Date() }, 
      { new: true }
    );
    if (!updatedDonor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(updatedDonor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating donor', error: error.message });
  }
});

app.put('/api/donors/:id/activate', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await Donor.findById(id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    if (new Date(donor.lastDonation) > twoMonthsAgo) {
      return res.status(400).json({ message: 'Donor is not eligible to donate yet' });
    }
    const updatedDonor = await Donor.findByIdAndUpdate(id, { isDonated: false }, { new: true });
    res.json(updatedDonor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating donor', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});