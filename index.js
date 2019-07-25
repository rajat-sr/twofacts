const { generateTOTP, verifyTOTP } = require('./lib/totp');
const { generateHOTP } = require('./lib/hotp');
const { generateSecret } = require('./lib/generateSecret');

function verifyUsingGoogleAuthenticator(otp, secret) {
  if (!otp) {
    throw new Error('OTP is required');
  }

  if (!secret) {
    throw new Error('Secret is required');
  }

  return verifyTOTP(otp, secret, 1, 30, 0, 6);
}

module.exports = {
  generateHOTP,
  generateTOTP,
  generateSecret,
  verifyTOTP,
  verifyUsingGoogleAuthenticator
}