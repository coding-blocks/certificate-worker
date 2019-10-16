const fs = require('fs')
let ejs = require('ejs')
const masterTemplate = fs.readFileSync(__dirname + '/master.ejs', 'utf-8')

const data = require('./data')


Object.keys(data).forEach(name => {
  const html = ejs.render(masterTemplate, data[name])
  fs.writeFileSync(__dirname + '/../src/templates/' + name + '.hbs', html)
})
