const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const app = express();

//Controllers
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '#Totem720*',
    database : 'smart-brain'
  }
});

app.use(cors());
app.use(express.json());

const database = {
	users: [
		{
			id: '999',
			name: 'June',
			email: 'june@mastermind.com',
			password: 'zero',
			entries: 0,
			joined: new Date()
		}
	]
}
app.get('/', (req, res) => {
	res.json("working");
})


app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) }) //dependency injection

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3001);