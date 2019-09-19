const Sequelize = require('sequelize');
const {UUID, UUIDV4, STRING, DECIMAL} = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/offering_db');

const Product = conn.define('product', {
  id:{
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name:{
    type: STRING,
    unique:true,
    allowNull:false
  },
  suggestedPrice:{
    type: DECIMAL
  }
})
const Company = conn.define('comapny', {
  id:{
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name:{
    type: STRING,
    unique:true,
    allowNull:false
  }
})
const Offering = conn.define('offering', {
  price: DECIMAL
})

const syncAndSeed = async ()=>{
  await conn.sycn({force: true});
}

// syncAndSeed();
