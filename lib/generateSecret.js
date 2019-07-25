const crypto = require('crypto');
const base32 = require('hi-base32');

/*
 * Use this function to generate a secret that will
 * be shared with a client app, like Google Authenticator.
 */
function generateSecret(length = 20) {
  const randomBuffer = crypto.randomBytes(length);
  return base32.encode(randomBuffer).replace(/=/g, '');
}

module.exports = { generateSecret };
