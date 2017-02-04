const exec = require('child_process').exec

const appEnvJSON = process.env.VCAP_APPLICATION
let instance_index = 0

if (appEnvJSON) {
  instance_index = JSON.parse(appEnvJSON).instance_index
}

if (instance_index === 0) {
  const command = './node_modules/.bin/sequelize db:migrate'

  exec(command, (err, stdout, stderr) => {
    if (stdout) console.log(stdout)
    if (stderr) console.log(stderr)
    if (err) console.log(err)
  })
}
