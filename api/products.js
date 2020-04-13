const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function list() {
    const db = getDb();
    const productsDB = await db.collection('products').find({}).toArray();
    return productsDB;
  }
  async function get(_, { id }) {
    const db = getDb();
    const product = await db.collection('products').findOne({ id });
    return product;
  }
  async function add(_, { product }) {
    const db = getDb();
    const newProduct = product;
    newProduct.id = await getNextSequence('products');
    const result = await db.collection('products').insertOne(product);
    const savedProduct = await db.collection('products')
      .findOne({ _id: result.insertedId });
    return savedProduct;
  }
  async function productUpdate(_, { id, changes }) {
    const db = getDb();
    await db.collection('products').updateOne({ id }, { $set: changes });
    const savedProduct = await db.collection('products').findOne({ id });
    return savedProduct;
  }

  module.exports = { list, add, get, productUpdate };
    