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
  const products = [
    {name:'bar', suggestedPrice: 5},
    {name:'bazz', suggestedPrice: 9},
    {name:'foo', suggestedPrice: 3},
    {name:'quq', suggestedPrice: 3}
  ]
  const [bar, bazz, foo, quq] = await Promise.all(products.map(product => Product.create(product)))
  const companies = [
    {name: 'ACME US'},
    {name: 'ACME GLOBAL'},
    {name: 'ACME TRISTATE'}
  ]
  const [US, GLOBAL, TRISTATE] = await Promise.all(companies.map(company => Company.create(company)))
  const offerings = [
    {price: 2.9, productID: foo.id,companyID: US.id},
    {price: 2.8, productID: foo.id,companyID: Global.id},
    {price: 4.5, productID: bar.id,companyID: Global.id},
    {price:  11, productID: bazz.id,companyID: TRISTATE.id},
  ]
}

// syncAndSeed();
