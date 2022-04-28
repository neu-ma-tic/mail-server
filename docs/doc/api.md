# api
the api is really simple and only has a few codes, and one route

### Codes
| **Code** | **Meaning**          |
|----------|----------------------|
| 0        | Unauthorized         |
| 1        | Okay                 |
| 2        | No emails            |
| 3        | Not found            |
| 4        | Generic server error |

## <span class="success-pill">GET</span> /:inbox
### Headers
| **Header**    | **Value**                            |
|---------------|--------------------------------------|
| Authorization | (your authorization key, if enabled) |

## Example responses:
### <span class="success-pill">200</span> Success
```json
{
    "data": {
        "inbox": "neumatic",
        "subject": "hello world",
        "from": "neumaticc@gmail.com",
        "to": "neumatic@neumatic.club",
        "html": "<h1>based email server</h1>",
        "text": "based email server"
    },
    "code": 2
}
```
### <span class="error-pill">400</span> Error: inbox is empty
```json
{
    "error": "no emails",
    "code": 2
}
```
### <span class="error-pill">401</span> Error: authorization token missing or invalid
```json
{
    "error": "unauthorized",
    "code": 0
}
```