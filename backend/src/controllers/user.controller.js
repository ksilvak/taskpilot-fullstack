const prisma = require('../prisma');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      email: true,
      role: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });

  res.json(user);
};


const updateUser = async (req, res) => {
  const { firstName, lastName } = req.body;

  const user = await prisma.user.update({
    where: { id: req.userId },
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      email: true,
      role: true,
      firstName: true,
      lastName: true,
    },
  });

  res.json(user);
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Chybí heslo' });
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) {
    return res.status(400).json({ message: 'Špatné aktuální heslo' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      password: hashedPassword,
    },
  });

  res.json({ message: 'Heslo změněno' });
};

module.exports = {
  getUser,
  updateUser,
  changePassword,
};
