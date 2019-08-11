const jsonServer = require('json-server');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./auth-routes');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './db.json'));
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;
server.use(middlewares);

server.use(bodyParser.json());
server.post('/api/login', authRoutes.login);
server.post('/api/logout', authRoutes.logout);
server.use('/api', authRoutes.isAuthorized);
server.use('/api', router);

// let frontend router deal with 404 errors
server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './../public/index.html'));
});

server.listen(PORT, function() {
  console.log('JSON Server is running on port ' + PORT);
});
