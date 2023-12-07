const express = require('express');
const passport = require('../config/passport-config');
const db = require('../models/db');
const { hashPassword, generateSalt, storeUser } = require('../utils/password-utils');

const router = express.Router();

