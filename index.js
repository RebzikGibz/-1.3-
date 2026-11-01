const sequelize = require('./db');
const { User } = require('./models');
const seed = require('./seed');
const { task1, task2, task3, task4, task5 } = require('./tasks');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('✅ Подключение к БД установлено.');

    await sequelize.sync({ force: true });
    console.log('✅ Таблицы синхронизированы (force: true).');

    await seed(); 

    await task1();
    await task2();
    await task3();
    await task4();
    await task5();

    await sequelize.close();
    console.log('\n🔒 Соединение закрыто.');
  } catch (err) {
    console.error('❌ Ошибка:', err);
    await sequelize.close();
  }
}

main();