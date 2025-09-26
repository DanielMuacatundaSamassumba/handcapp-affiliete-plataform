import { decrypt } from "../apresentation/modules/auth/utils/CryptoUtils";

export function headersConfig() {
    const token = localStorage.getItem("auth_token");
    const token_decrypted = decrypt(token || "");
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token_decrypted}`,
        },
    };
}
