import usermodel from '../models/user';
import { compareSync } from 'bcrypt-nodejs';
import { sign, verify } from 'jsonwebtoken';
import config from '../config/index';

function authenticate(req, res) {
  usermodel
    .findOne({
      username: req.body.username,
    })
    .exec()
    .then(user => {
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Authentication failed',
        });
      } else if (user) {
        if (!compareSync(req.body.password, user.password)) {
          res.status(401).json({
            success: false,
            message: 'Authentication failed',
          });
        } else {
          const token = sign({ user }, config.secret, {
            expiresIn: config.authTokenExpiry,
          });
          user.password = null;
          res.json({
            success: true,
            message: 'Authenticated',
            token: token,
            user: user,
          });
        }
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

export async function context({ req }) {
  let token = null;
  let currentUser = null;

  try {
    token = req.body.token || req.params.token || req.headers['x-access-token'];
    currentUser = await verify(token, config.secret);
  } catch (err) {
    token = null;
    currentUser = null;
  }
  return {
    token,
    currentUser,
  };
}

export default app => {
  app.post('/login', (req, res) => {
    authenticate(req, res);
  });

  app.post('/logout', (req, res) => {
    // Not Implemented
  });
};
