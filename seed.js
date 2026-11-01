const { User, Post, Author, Book, Student, Course, Enrollment, Order, Item } = require('./models');

async function seed() {
  console.log('🌱 Заполнение базы тестовыми данными...');

  const user1 = await User.create({ name: 'Алексей', email: 'alex@example.com', isActive: true });
  const user2 = await User.create({ name: 'Борис', email: 'boris@example.com', isActive: true });
  const user3 = await User.create({ name: 'Виктор', email: 'victor@example.com', isActive: false }); // Неактивный
  const user4 = await User.create({ name: 'Галина', email: 'galina@example.com', isActive: true }); // Без постов

  await Post.create({ title: 'Старый пост', status: 'published', publishedAt: '2022-05-01', authorId: user1.id });
  await Post.create({ title: 'Новый пост', status: 'published', publishedAt: '2024-01-15', authorId: user1.id });
  await Post.create({ title: 'Черновик', status: 'draft', publishedAt: null, authorId: user2.id });
  await Post.create({ title: 'Пост Бориса', status: 'published', publishedAt: '2023-06-01', authorId: user2.id });
  await Post.create({ title: 'Пост Виктора', status: 'published', publishedAt: '2024-02-01', authorId: user3.id });

  const author1 = await Author.create({ firstName: 'Лев', lastName: 'Толстой', country: 'Россия' });
  const author2 = await Author.create({ firstName: 'Фёдор', lastName: 'Достоевский', country: 'Россия' });
  const author3 = await Author.create({ firstName: 'Антон', lastName: 'Чехов', country: 'Россия' }); // Без книг

  await Book.create({ title: 'Война и мир', year: 1869, genre: 'Роман', authorId: author1.id });
  await Book.create({ title: 'Анна Каренина', year: 1877, genre: 'Роман', authorId: author1.id });
  await Book.create({ title: 'Преступление и наказание', year: 1866, genre: 'Роман', authorId: author2.id });

  const student1 = await Student.create({ name: 'Иван', group: 'ИС-21' });
  const student2 = await Student.create({ name: 'Мария', group: 'ИС-22' });

  const course1 = await Course.create({ title: 'Базы данных', credits: 5 }); // > 3
  const course2 = await Course.create({ title: 'Веб-разработка', credits: 4 }); // > 3
  const course3 = await Course.create({ title: 'Философия', credits: 2 }); // <= 3

  await student1.addCourses([course1, course3]);
  await student2.addCourses([course2, course3]);

  const order1 = await Order.create({ number: 'ORD-001', status: 'paid' });
  const order2 = await Order.create({ number: 'ORD-002', status: 'new' });

  await Item.create({ productName: 'Ноутбук', quantity: 1, price: 75000, orderId: order1.id });
  await Item.create({ productName: 'Мышь', quantity: 5, price: 1500, orderId: order1.id }); // > 2
  await Item.create({ productName: 'Клавиатура', quantity: 3, price: 3000, orderId: order2.id }); // > 2
  await Item.create({ productName: 'Монитор', quantity: 1, price: 20000, orderId: order2.id });

  console.log('✅ Тестовые данные добавлены!');
}

module.exports = seed;