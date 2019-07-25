const { generateHOTP } = require('./hotp');

/*
 * This is an implementation of Time-Based One Time Password (TOTP) algorithm
 * specified in RFC 6238 (https://tools.ietf.org/html/rfc6238)
 */
function generateTOTP(secret, window = 0, timeStepInSeconds = 30, initialTime = 0, otpLength = 6) {
  if (!secret) {
    throw new Error('Secret is required');
  }

  const currentTime = Date.now();
  const timeStep = timeStepInSeconds * 1000;
  const counter = Math.floor((currentTime - initialTime) / timeStep);
  return generateHOTP(secret, counter + window, otpLength);
}

/*
 * This function verifies the validity of OTP (token) entered by the user
 * from an authenticator app, for example, the Google Authenticator app.
 * The secret passed here as argument must match with the secret in the
 * authenticator app.
 */
function verifyTOTP(otp, secret, window = 1, timeStepInSeconds = 30, initialTime = 0, otpLength = 6) {
    try {
      otp = parseInt(otp, 10);
      if (isNaN(otp)) {
        throw new Error();
      }
    } catch (e) {
      throw new Error('Invalid OTP');
    }

  if (Math.abs(+window) > 10) {
    throw new Error('Window size is too large');
  }

  for (let errorWindow = -window; errorWindow <= +window; errorWindow++) {
    const totp = generateTOTP(secret, errorWindow, timeStepInSeconds, initialTime, otpLength);
    if (otp === totp) {
      return true;
    }
  }

  return false;
}

module.exports = {
  generateTOTP,
  verifyTOTP,
};
