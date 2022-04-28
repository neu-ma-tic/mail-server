# configuration
the config is a single js file: `config.js`
```json
{
    "port": 3000,
    "smtpPort": 25,
    "expiry": 1000 * 60 * 1,
    "authorization": {
        "enabled": false,
        "key": "sup3rsecret"
    }
}
```

## config options
### port
the port that the HTTP server should listen on  
defualt: `3000`

### smtpPort
the port that the SMTP server should listen on  
default: `25`

### expiry
how long an email should be saved until it expires
default: `1000 * 60 * 1` (1 minute)

### authorization.enabled
whether to enable authorization

### authorization.key
a key to be used if authorization is enabled. the key is a header (`Authorization`), or can be used with the `?token=` query parameter

<!--#### also see [node-mail-api-client]()-->
<!-- soon? -->