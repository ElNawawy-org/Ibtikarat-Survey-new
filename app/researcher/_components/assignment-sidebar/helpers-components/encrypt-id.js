/*
 * This file is here to help us to be able to use this file "components\researcher\orders\order-sidebar.js"
 * //TODO-refactorFile: refactor this file to follow the new component structure and best practice
 */

import CryptoJS from 'crypto-js';

const secretKey = 'my-secret-key@123';

const EncryptID = id => {
  //id Encryption
  let encryptedID = CryptoJS.AES.encrypt(id, secretKey).toString();

  encryptedID = encryptedID
    ?.replace(/%/gim, 'xMl3Jk')
    ?.replace(/\//gim, 'Por21LdFF')
    ?.replace(/=/gim, 'Ml32');

  return encryptedID;
};

const DecryptID = (encryptedID = '') => {
  const encryptedIDEdited = encryptedID
    ?.replace(/xMl3Jk/gim, '%')
    ?.replace(/Por21LdFF/gim, '/')
    ?.replace(/Ml32/gim, '=');

  const bytes = CryptoJS.AES.decrypt(encryptedIDEdited, secretKey);
  const decryptedID = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedID;
};

export { EncryptID, DecryptID };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
