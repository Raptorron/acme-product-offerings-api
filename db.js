const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/offering_db');



const syncAndSeed = async ()=>{
  await conn.sycn({force: true});
}

// syncAndSeed();
