const Blowfish = require('../crypto-algorithm/blowfish')
const Utf8 = require('utf8')
const Base64 = require('../crypto-algorithm/base64')

function blowfishEncrypt(data, key) {
    const padding = '\u0006';
    let bf = new Blowfish(key, padding);

    let encoding = bf.encrypt(data);
    return encoding
}

function base64Encrypt(data) {
    let bytes = Utf8.encode(data);
    let encoded = Base64.encode(bytes);
    return encoded
}

function encryption(data, key) {
    let blowfish = blowfishEncrypt(data, key)
    let encode = base64Encrypt(blowfish)

    return encode
}

function base64Decrypt(data) {
    let decoded = Base64.decode(data)
    let bytes = Utf8.decode(decoded)

    return bytes
}

function blowfishDecrypt(data, key) {
    const padding = '\u0006';
    let bf = new Blowfish(key, padding);

    let decoding = bf.decrypt(data);
    return decoding
}

function decryption(data, key) {
    let base64 = base64Decrypt(data)
    let decode = blowfishDecrypt(base64, key)
    return decode
}

module.exports = {encryption, decryption}