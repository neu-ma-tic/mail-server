const SMTPServer = require("smtp-server").SMTPServer;
const simpleParser = require("mailparser").simpleParser;
const config = require("./config");
const {Mail} = require("./http.js");

function start() {
  console.log("starting smtp on", config.smtpPort);
  let smtp = new SMTPServer({
    logger: false,
    authOptional: true,
    disabledCommands: ["AUTH"],
    disableReverseLookup: true,
    maxClients: 7,
    onConnect(session, callback) {
      return callback();
    },
    onMailFrom(address, session, callback) {
      return callback();
    },
    onRcptTo(address, session, callback) {
      return callback();
    },
    onData(stream, session, cb) {
      let raw = "";

      stream.on("data", function (chunk) {
        raw += chunk;
      });

      stream.on("end", function () {
        simpleParser(raw, (err, mail) => {
        //   console.log(`Saving email (${mail.from.text} --> ${mail.to.text})`);

          let inboxName = mail.to.text.split("@")[0];

          Mail.emit("email", {
            inbox: inboxName,
            subject: mail.subject,
            from: mail.from.text,
            to: mail.to.text,
            html: mail.html,
            text: mail.text,
          });
        });
        return cb();
      });
    },
  });

  smtp.on("error", (err) => {
    console.error("Error %s", err.message);
  });

  smtp.listen(config.smtpPort);

}

module.exports.start = start;
