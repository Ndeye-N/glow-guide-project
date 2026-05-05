require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  const { name, brand, type } = req.body;
  if (!name || !brand || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const result = await pool.query(
      'INSERT INTO products (name, brand, type) VALUES ($1, $2, $3) RETURNING *',
      [name, brand, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.status(204).send(); 
  } catch (err) {
    console.error('DELETE error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, brand, type } = req.body;

  console.log(`Attempting to update product ${id} with:`, { name, brand, type });

  try {
    const query = 'UPDATE products SET name = $1, brand = $2, type = $3 WHERE id = $4';
    const result = await pool.query(query, [name, brand, type, id]);

    if (result.rowCount === 0) {
      console.log("No product found with that ID");
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));