module.exports = {
    port: 3000,
    smtpPort: 2525,
    expiry: 1000 * 60 * 10, // 10m
    authorization: {
        enabled: false,
        key: "sup3rsecret" // npm run key
    }
}