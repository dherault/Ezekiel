// God is all, all is God

let time = 1

const localities = {}
const spaceLocalities = {}

const language = ['❤️', '👉', '👆', '👇', '💪', "✌️", '👌', "🙏", '🙂', '😍', '🥰', '😘', '😛']

const thoughMatrixes = [
  // [1, ❤️, 👉, 👆, 👇, 💪, ✌️, 👌, 🙏, 🙂, 😍, 🥰, 😘, 😛],
  ['1', '1', love],
  ['❤️', '❤️', love],
]

// Love is above all
const selfLove = '❤️'
const twoLove = ['❤️', '❤️']

function love(l, l1) {
  l.life.push(selfLove)

  if (l !== l1) {
    l1.life.push(selfLove)
  }

  return 1
}

// Numbers are an expression of self-love
function areSpheresCollinding(pos, radius, pos1, radius1) {
  return radius + radius1 > normPos(diffPos(pos, pos1))
}

function diffPos(pos, pos1) {
  return {
    x: pos1.x - pos.x,
    y: pos1.y - pos.y,
  }
}

function normPos(pos) {
  return Math.sqrt(pos.x ** 2 + pos.y ** 2)
}

function averagePos(pos, pos1) {
  return {
    x: (pos.x + pos1.x) / 2,
    y: (pos.y + pos1.y) / 2,
  }
}

// Life is a gift
function createLocality({ id, mass, observation }) {
  const xid = id || Math.random().toString()

  spaceLocalities[xid] = {
    id: xid,
    life: ['1'],
    pos: { x: Math.random(), y: 0, dx: 0, dy: 0, ddx: 0, ddy: 0 },
  }

  return localities[xid] = {
    id: xid,
    mass,
    observation,
    life: ['1'],
  }
}

function step() {
  time += 1

  for (const id in localities) {
    reflect(time, localities[id])
    share(time, localities[id])
  }

  moveInSpace(time)
}

// function advance(time, l) {
//   reflect(time, l)
//   collide(time, l)
// }

function reflect(time, l) {
  l.life.push(language[time % (language.length - 1)])
}

function share(time, l) {
  for (const id in localities) {
    const l1 = localities[id]

    if (l.id !== l1.id) {
      exchange(l, l1)
    }
  }
}

function moveInSpace(time, sl) {
  // for (const id in ) {
  //   liveTogether(time, l, localities[id])
  // }
  // Object.values(localities).forEach(l1 => {
  //   liveInSpace(time, l, l1)
  // })
}

// function liveTogether(time, l, l1) {
//   if (l.id !== l1.id) {
//     exchange(l, l1)
//   }
// }

function exchange(l, l1) {
  const e = thoughMatrixes.find(([t, t1]) => t === l.life[l.life.length - 1] && t1 === l1.life[l1.life.length - 1])

  if (!e) {
    return 0
  }

  return e[2](l, l1)
}

function liveInSpace(time, l, l1) {
  const radius = l.observation
  const radius1 = l1.observation

  l.time.forEach(time => {
    l1.time.forEach(time1 => {
      if (time.with === time1.with) return

      if (areSpheresCollinding(time.pos, radius, time1.pos, radius1)) {
        const self = l.self.find(self => self.with === l1.id)
        const self1 = l1.self.find(self => self.with === l1.id)

        console.log('self, self1', self, self1)
      }
    })
  })
}

function createTimeline(l, l1) {
  const l0 = l.mass >= l1.mass ? l : l1
  const l01 = l0 === l1 ? l : l1

  const massGain = l01.mass / (l0.mass + l01.mass)
  // const observation = Math.max(l.observation, l1.observation)

  const id = l.id + 'u' + l1.id

  return createLocality({
    id,
    mass: l0.mass + l01.mass,
    observation: Math.max(l.observation, l1.observation),
  })
  // l0.self.push({ life: ['1'], with: l01.id, mass: l1.mass + massGain, observation: l0.observation })
  // l01.self.push({ life: ['1'], with: l0.id, mass: l01.mass - massGain, observation: l01.observation })

  // const timeline = { life: ['1'], with: l0.id + 'u' + l01.id, pos: { ...averagePos(l0.time[0].pos, l01.time[0].pos), dx: 0, dy: 0, ddx: 0, ddy: 0 } }

  // l.time.push(timeline)
  // l1.time.push(timeline)
}

const locality1 = createLocality({ mass: 1, observation: 1 })
const locality2 = createLocality({ mass: 1, observation: 1 })

createTimeline(locality1, locality2)
step()

console.log('locality1', JSON.stringify(localities, null, 2))
console.log('locality2', JSON.stringify(spaceLocalities, null, 2))
