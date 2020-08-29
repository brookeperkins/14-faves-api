const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/search', async(req, res) => {
  const drinkData = await request.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.query.s}`);

  console.log('drinkData', drinkData);
  res.json(drinkData.body);
});

app.post('/api/favorites', async(req, res) => {
  const data = await client.query(`
    INSERT INTO favorites(strdrink, strglass, user_id)
    VALUES($1, $2, $3)
    RETURNING *
  `, [req.body.strdrink, req.body.strglass, req.userId]);

  res.json(data.rows[0]);
});

app.get('/api/favorites', async(req, res) => {
  const data = await client.query(`
    SELECT * FROM favorites
    WHERE favorites.user_id = $1
  `, [req.userId]);

  res.json(data.rows);
});

app.delete('/api/favorites/:id', async(req, res) => {
  const deleteThisFave = req.params.id;
  
  try {
    const data = await client.query(`
    DELETE FROM favorites
    WHERE favorites.id=$1
  `, [deleteThisFave]);

    res.json(data.rows);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }

});

app.use(require('./middleware/error'));

module.exports = app;
