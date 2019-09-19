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

const Company = conn.define('company', {
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

Offering.belongsTo(Product);
Product.hasMany(Offering);

Offering.belongsTo(Company);
Company.hasMany(Offering)

const syncAndSeed = async ()=>{
  await conn.sync({force: true});
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
  const [us, global, tristate] = await Promise.all(companies.map(company => Company.create(company)))
  const offerings = [
    {price: 2.9, productId: foo.id,companyId: us.id},
    {price: 2.8, productId: foo.id,companyId: global.id},
    {price: 4.5, productId: bar.id,companyId: global.id},
    {price:  11, productId: bazz.id,companyId: tristate.id},
  ];
  const [offer1, offer2, offer3, offer4] = await Promise.all(offerings.map(offering => Offering.create(offering)))
  console.log(offer1.get());
}



module.exports={
  syncAndSeed,
  module: {
    Product,
    Company,
    Offering
  }
}
syncAndSeed();
