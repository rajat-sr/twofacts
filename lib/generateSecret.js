const crypto = require('crypto');
const base32 = require('hi-base32');

/*
 * Use this function to generate a secret that will
 * be shared with a client app, like Google Authenticator.
 */
function generateSecret(length = 20, otpauthurl = false, label) {
  const randomBuffer = crypto.randomBytes(length);
  const secret = base32.encode(randomBuffer).replace(/=/g, '');
  if (!otpauthurl) {
    return { secret, url: null };
  }

  if (!label) {
    throw new Error('Label is required if you want to generate otpauth URL.');
  }

  label = encodeURI(label);
  return {
    secret,
    url: `otpauth://totp/${label}?secret=${secret}`
  }
}

module.exports = { generateSecret };
