const prisma = require('../prisma');

const deleteUser = async (req, res) => {
  const userId = Number(req.params.id);

  try {
    await prisma.$transaction([
      prisma.task.deleteMany({
        where: { userId },
      }),
      prisma.user.delete({
        where: { id: userId },
      }),
    ]);

    res.json({ message: 'Uživatel byl smazán' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Chyba při mazání uživatele' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Nepodařilo se načíst uživatele' });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
