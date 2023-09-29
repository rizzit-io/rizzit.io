import WeightedRandom from './features/random/WeightedRandom'

const logoModules = document.querySelectorAll('.logo > .module')

const modules = document.querySelectorAll('.modules .module')

const circleModules = document.querySelectorAll('.circles .module')

const shapeWeightedRandom = new WeightedRandom([
  {
    item: 'circle',
    weight: 4
  },
  {
    item: 'square',
    weight: 4
  },
  {
    item: 'pie-top-left',
    weight: 1
  },
  {
    item: 'pie-top-right',
    weight: 1
  },
  {
    item: 'pie-bottom-left',
    weight: 1
  },
  {
    item: 'pie-bottom-right',
    weight: 1
  }
])

const fillWeightedRandom = new WeightedRandom([
  {
    item: true,
    weight: 0.3
  },
  {
    item: false,
    weight: 0.9
  }
])

const highlightWeightedRandom = new WeightedRandom([
  {
    item: true,
    weight: 0.1
  },
  {
    item: false,
    weight: 0.9
  }
])

setInterval(() => {
  logoModules.forEach(module => {
    module.removeAttribute('data-shape')
    module.setAttribute('data-shape', shapeWeightedRandom.next())

    module.removeAttribute('data-fill')
    module.setAttribute('data-fill', fillWeightedRandom.next().toString())

    module.removeAttribute('data-highlight')
    module.setAttribute('data-highlight', highlightWeightedRandom.next().toString())
  })
}, 10000)

setInterval(() => {
  modules.forEach(module => {
    module.removeAttribute('data-shape')
    module.setAttribute('data-shape', shapeWeightedRandom.next())

    module.removeAttribute('data-fill')
    module.setAttribute('data-fill', fillWeightedRandom.next().toString())
  })
}, 10000)

setInterval(() => {
  circleModules.forEach(module => {
    module.removeAttribute('data-fill')
    module.setAttribute('data-fill', fillWeightedRandom.next().toString())
  })
}, 10000)
