const { x25519 } = require('@noble/curves/ed25519')
const { xchacha20poly1305 } = require('@noble/ciphers/chacha');
const { randomBytes } = require('@noble/ciphers/webcrypto');

const priv = 'a546e36bf0527c9d3b16154b82465edd62144c0ac1fc5a18506a2244ba449ac4';
console.log("✞✞✞✞✞✞✞",x25519.getPublicKey(priv))

function encryptFor(keypair, recipient, plaintext) {
    // use keypair.sk and recipient pk 4 x25519.getSharedSecret(priv, pub)
    const sharedSecret = x25519.getSharedSecret(keypair.secretKey, recipient)

    // encrypt 
    const ciphertext = xchacha20poly1305
//     const key = randomBytes(32);
// const nonce = randomBytes(24);
// const chacha = xchacha20poly1305(key, nonce);
// const data = utf8ToBytes('hello, noble');
// const ciphertext = chacha.encrypt(data);
// const data_ = chacha.decrypt(ciphertext); // utils.bytesToUtf8(data_) === data
}

// const pub = 'e6db6867583030db3594c1a424b15f7c726624ec26b3353b10a903a6d0ab1c4c';
// x25519.getSharedSecret(priv, pub) === x25519.scalarMult(priv, pub); // aliases
// x25519.getPublicKey(priv) === x25519.scalarMultBase(priv);
// x25519.getPublicKey(x25519.utils.randomPrivateKey());