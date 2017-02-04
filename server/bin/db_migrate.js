const exec = require('child_process').exec
const command = './node_modules/.bin/sequelize db:migrate'

const appEnvJSON = process.env.VCAP_APPLICATION
const instance_index = 0

// TODO: test this when account has enough memory
if (appEnvJSON) {
  const instance_index = JSON.parse(appEnvJSON).instance_index
}

if (instance_index === 0) {
  exec(command, (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    if (err !== null) console.log(err)
  })
}
