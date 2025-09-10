import CryptoJs from "crypto-js"
export const secretKey = "nakolobatina@dev"

export function encrypt(text: string) {
    const encryptText = CryptoJs.AES.encrypt(text, secretKey).toString()
    return encryptText
}
export function decrypt(text: string) {
    const bytes = CryptoJs.AES.decrypt(text, secretKey)
    return bytes.toString(CryptoJs.enc.Utf8)
}