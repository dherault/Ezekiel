// God is all, all is God

let time = 1
const localities = {}
const language = ['❤️', '👉', '👆', '👇', '💪', "✌️", '👌', "🙏", '🙂', '😍', '🥰', '😘', '😛']

const thoughMatrixes = [
  // [1, ❤️, 👉, 👆, 👇, 💪, ✌️, 👌, 🙏, 🙂, 😍, 🥰, 😘, 😛],
  ['1', '1', love],
  ['❤️', '❤️', love],
]

// Love is above all
const selfLove = '❤️'
const twoLove = ['❤️', '❤️']

function love(self, self1) {
  self.life += selfLove

  if (self !== self1) {
    self1.life += selfLove
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

// Life is a gift
function createLocality({ mass, observation }) {
  const id = Math.random()

  return localities[id] = {
    id,
    self: [{ life: '1', with: id, mass, observation }],
    time: [{ life: '1', with: id, pos: { x: Math.random(), y: 0, dx: 0, dy: 0, ddx: 0, ddy: 0 } }],
  }
}

function step() {
  time += 1

  Object.values(localities).forEach(l => {
    advance(time, l)
  })
}

function advance(time, l) {
  reflect(time, l)
  collide(time, l)
}

function reflect(time, l) {
  l.self.forEach(self => {
    self.life + language[time % (language.length - 1)]
  })
}

function collide(time, l) {
  Object.values(localities).forEach(l1 => {
    liveTogether(time, l, l1)
    liveInSpace(time, l, l1)
  })
}

function liveTogether(time, l, l1) {
  l.self.forEach(self => {
    l1.self.forEach(self1 => {
      if (self.with === self1.with) {
        exchange(self, self1)
      }
    })
  })
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
  const l0 = l.self[0].mass >= l1.self[0].mass ? l : l1
  const l01 = l0 === l1 ? l : l1

  const massGain = l01.self[0].mass / (l0.self[0].mass + l01.self[0].mass)
  // const observation = Math.max(l.self[0].observation, l1.self[0].observation)

  l0.self.push({ life: '1', with: l01.id, mass: l1.self[0].mass + massGain, observation: l0.self[0].observation })
  l01.self.push({ life: '1', with: l0.id, mass: l01.self[0].mass - massGain, observation: l01.self[0].observation })
}

function exchange(self, self1) {
  const e = thoughMatrixes.find(([t, t1]) => t === self.life[self.life.length - 1] && t1 === self1.life[self1.life.length - 1])

  if (!e) {
    return 0
  }

  return e[2](self, self1)
}

const locality1 = createLocality({ mass: 1, observation: 1 })
const locality2 = createLocality({ mass: 1, observation: 1 })

createTimeline(locality1, locality2)
step()

console.log('locality1', locality1)
console.log('locality2', locality2)
