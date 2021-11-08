import crypto from "crypto";

const algorithm = "aes-256-cbc";

const encryptiKey = require('constants/encryptionKey.json');

function getSecurityKey() {
    let initVector, securityKey;
    if (!encryptiKey.key || !encryptiKey.vector) {
        // generate 16 bytes of random data
         initVector = crypto.randomBytes(16);
        // secret key generate 32 bytes of random data
         securityKey = crypto.randomBytes(32);
    } else {
        initVector = encryptiKey.vector;
        securityKey = encryptiKey.key;
    }
    return {
        initVector, securityKey
    }
}

function saveSecurityKey(vector, key) {

}

export const dataEncryption = {
    encrypt: (message) => {
        const key = getSecurityKey();
        // the cipher function
        const cipher = crypto.createCipheriv(algorithm, key.securityKey, key.initVector);
        let encryptedData = cipher.update(message, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        return encryptedData;
    },
    decrypt: (data) => {
        const key = getSecurityKey();
        // the decipher function
        const decipher = crypto.createDecipheriv(algorithm, key.securityKey, key.initVector);
        let decryptedData = decipher.update(data, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        return decryptedData;
    },
    getSecurityKey
}
