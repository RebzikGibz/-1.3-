const { Op } = require('sequelize');
const {
  User, Post,
  Author, Book,
  Student, Course,
  Order, Item
} = require('./models');

async function task1() {
  const users = await User.findAll({
    include: [{
      model: Post,
      as: 'posts',
      where: { publishedAt: { [Op.gt]: '2023-01-01' } },
      required: true,
    }],
    order: [
      ['name', 'ASC'],
      [{ model: Post, as: 'posts' }, 'publishedAt', 'DESC']
    ],
  });
  console.log('\n--- Задание 1: Пользователи с постами после 2023-01-01 ---');
  users.forEach(u => {
    console.log(`👤 ${u.name}`);
    u.posts.forEach(p => console.log(`   📝 ${p.title} (${p.publishedAt?.toISOString().slice(0,10)})`));
  });
}

async function task2() {
  const authors = await Author.findAll({
    include: [{
      model: Book,
      as: 'books',
      required: false,
    }],
    order: [['lastName', 'ASC']],
  });
  console.log('\n--- Задание 2: Все авторы (включая без книг) ---');
  authors.forEach(a => {
    console.log(`👤 ${a.firstName} ${a.lastName} (книг: ${a.books.length})`);
    a.books.forEach(b => console.log(`   📚 ${b.title} (${b.year})`));
  });
}

async function task3() {
  const students = await Student.findAll({
    include: [{
      model: Course,
      as: 'courses',
      where: { credits: { [Op.gt]: 3 } },
      required: true,
      through: { attributes: [] }
    }],
    order: [
      ['name', 'ASC'],
      [{ model: Course, as: 'courses' }, 'title', 'ASC']
    ],
  });
  console.log('\n--- Задание 3: Студенты на курсах с credits > 3 ---');
  students.forEach(s => {
    console.log(`👤 ${s.name} (${s.group})`);
    s.courses.forEach(c => console.log(`   📖 ${c.title} (${c.credits} кредитов)`));
  });
}

async function task4() {
  const orders = await Order.findAll({
    include: [{
      model: Item,
      as: 'items',
      where: { quantity: { [Op.gt]: 2 } },
      required: true,
    }],
    order: [
      ['createdAt', 'DESC'],
      [{ model: Item, as: 'items' }, 'price', 'DESC']
    ],
  });
  console.log('\n--- Задание 4: Заказы с товарами quantity > 2 ---');
  orders.forEach(o => {
    console.log(`🛒 Заказ ${o.number} (${o.status})`);
    o.items.forEach(i => console.log(`   📦 ${i.productName} — ${i.price} ₽ (кол-во: ${i.quantity})`));
  });
}

async function task5() {
  const users = await User.findAll({
    where: { isActive: true },
    include: [{
      model: Post,
      as: 'posts',
      where: { status: 'published' },
      required: true,
    }],
    order: [
      ['name', 'ASC'],
      [{ model: Post, as: 'posts' }, 'createdAt', 'DESC']
    ],
  });
  console.log('\n--- Задание 5: Активные пользователи с опубликованными постами ---');
  users.forEach(u => {
    console.log(`👤 ${u.name}`);
    u.posts.forEach(p => console.log(`   📝 ${p.title} (${p.status})`));
  });
}

module.exports = { task1, task2, task3, task4, task5 };