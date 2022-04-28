const md = require("marked")
const fs = require("fs")
const template = fs.readFileSync("./template.html", "utf8")
console.log("start")

const files = fs.readdirSync("./doc").filter(x => x.endsWith(".md"))

if (!fs.existsSync("./out")) fs.mkdirSync("./out")
files.forEach(x => {
    let name = x.replace(".md", "")
    let content = fs.readFileSync(`./doc/${x}`, "utf8")
    let html = md.parse(content)
    html = template.replace("[content]", html)
    
    console.log("rendered", name)
    fs.writeFileSync(`./out/${name}.html`, html)
})