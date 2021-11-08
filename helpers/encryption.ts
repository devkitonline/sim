import crypto from "crypto";
const algorithm = "aes-256-cbc";
const fs = require('fs');

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Write key to file
// fs.writeFile('constants/en', key, function (err){
//     if (err) console.log(err);
//     console.log("Successfully Written to File.");
// })
let key2;
//Get key from file
fs.readFile('constants/en',"utf-8", function (err, data){
    if (err) { console.log(err) }
    console.log(data);
    key2 = data;
});

export function encrypt() {
    console.log('read',key2);

}

export function decrypt(){

}
