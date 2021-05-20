const physica = require('../src/physics/index')

async function main() {
  while (true) {
    console.log('___')
    await physica(100)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

main()
