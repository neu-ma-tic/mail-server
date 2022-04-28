module.exports = {
    port: 3000,
    smtpPort: 25, // may have to run as root or use iptables
    expiry: 1000 * 60 * 1, // 1m
    authorization: {
        enabled: false,
        key: "sup3rsecret" // npm run key
    }
}