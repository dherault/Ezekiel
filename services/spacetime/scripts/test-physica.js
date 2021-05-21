const physica = require('../src/physics')

async function main() {
  while (true) {
    console.log('___')
    await physica(10)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

main()
