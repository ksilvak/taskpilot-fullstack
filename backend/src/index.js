const express = require('express');
const cors = require('cors');
const app = express();
const prisma = require('./prisma');
const PORT = 3000;

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const adminRoutes = require('./routes/admin.routes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', async (req, res) => {
  const usersCount = await prisma.user.count();
  
  res.send(`TaskPilot backend 🚀 Users count: ${usersCount}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
