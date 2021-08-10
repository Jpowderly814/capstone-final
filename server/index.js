require('dotenv').config();
//const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require('spotify-web-api-node');

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    key: 'userId',
    secret: 'secret123', //?
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'capstoneFinal',
});

app.post('/login/register', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      'INSERT INTO users (email, username, password) VALUES (?,?,?)',
      [email, username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.send('Need a token');
  } else {
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'Failed to authenticate' });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get('/isUserAuth', verifyJWT, (req, res) => {
  console.log(res);
  res.send('You are authenticated');
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    'SELECT * FROM users WHERE username = ?;',
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result; //sets session
            console.log(req.session.user);
            //res.send(result); //sends back user that is logged in

            const id = result[0].id;
            const token = jwt.sign({ id }, 'jwtSecret', {
              expiresIn: 300,
            });
            res.json({ auth: true, token: token, result: result });
          } else {
            console.log(error);
            res.json({
              auth: false,
              message: 'Wrong username/password combination',
            });
            //res.send({message: "Wrong username/password combination!"});
          }
        });
      } else {
        //res.send({message: "User doesn't exist."});
        res.json({ auth: false, message: 'no user exists' });
      }
    }
  );
});

app.get('/logout', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: false, user: req.session.user });
  } else {
    res.send({ loggedIn: true });
  }
});

app.post('/logout', (req, res) => {
  const token = null;
  res.json({ auth: false, token: token, result: null });
});

app.listen(3001, () => {
  console.log('Yay,your server is running on port 3001!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log('refresh server', accessToken);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post('/connect', (req, res) => {
  const code = req.body.code;
  console.log('spotify server', code);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000/connect',
    clientId: '5cd4002b7b2647d4837327d4413300db',
    clientSecret: '9b6fd50cb1e74819a99666a4c2f0c88f',
  });
  console.log('you are here');
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.post('/save', (req, res) => {
  const playlist = req.body.playlist;
  const name = req.body.name;
  const user = req.body.user;

  db.query(
    'INSERT INTO favorites (playlist, name, user) VALUES (?,?,?)',
    [playlist, name, user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Values inserted');
      }
    }
  );
});

app.get('/favorites/:id', (req, res) => {
  const user = req.params.id;
  db.query('SELECT * FROM favorites WHERE user = ?', user, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete('/favorites/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query(
    'DELETE FROM capstoneFinal.favorites WHERE id = ?',
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/rate', (req, res) => {
  const playlistId = req.body.playlistId;
  const userId = req.body.userId;
  const rating = req.body.rating;

  db.query(
    'INSERT INTO ratings (playlistId, userId, rating) VALUES (?,?,?)',
    [playlistId, userId, rating],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
      }
    }
  );
});

app.get('/rate/:id', (req, res) => {
  const playlist = req.params.id;
  db.query(
    'SELECT * FROM ratings WHERE playlistId = ?',
    playlist,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
