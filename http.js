const fastify = require('fastify')({ logger: true })
const config = require("./config")
const evt = require("node:events")
const Mail = new evt()
const storage = new Map()

const codes = {
  "unauthorized": 0,
  "ok": 1,
  "noEmails": 2,
  "notFound": 3,
  "genericError": 4,
}

Mail.on("email",(data) => {
  const expiryTime = config.expiry
  console.log(`Got email from ${data.from} to ${data.to}: ${data.subject}`)
  storage.set(data.inbox, data)
  setTimeout(() => {
    storage.delete(data.inbox)
  }, expiryTime)
})

fastify.get('/', async (request, reply) => {
  return "neumatic email api. more info here --> https://sr.ht/~neu/mail-server/"
})

fastify.get('/:inbox', async (request, reply) => {
  const inbox = request.params?.inbox

  // auth
  const token = request.headers?.authorization || request.headers?.Authorization || request.query?.token
  const authorized = config.authorization.enabled ? token === config.authorization.key : true
  if (!authorized) return reply.status(401).send({ error: "unauthorized", code: codes.unauthorized })

  // email
  if (!storage.has(inbox)) return reply.status(400).send({ error: "no emails", code: codes.noEmails })
  const email = storage.get(inbox)
  
  reply.send({ data: email, code: codes.ok })
})

fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({ error: "route not found", code: codes.notFound })
})

fastify.setErrorHandler((error, request, reply) => {
  console.error("[http] [error]", error)
  console.error("An error occured. If this keeps happening, please email the issue (and stack trace) to '~neu/mail-server@todo.sr.ht'")

  reply.status(500).send({ error: "server error", code: codes.genericError })

})



module.exports.start = async () => {
  try {
    await fastify.listen(config.port)
    console.log(`[http] listening on port ${config.port}`)
  } catch (err) {
    console.error("[http] [error] fastify sharted",err)
  }
}

module.exports.Mail = Mail