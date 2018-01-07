import {
  rotationMatrix, applyMatrixToVector, shearMatrixX, shearMatrixY, mirrorMatrix,
  stretchMatrixX, stretchMatrixY
} from './math'

import { addPrefix } from '../utils'

export let actions = addPrefix('', {
  moveUp ({commit}) {
    commit('addVector', { x: 0, y: 25 })
  },
  moveDown ({commit}) {
    commit('addVector', { x: 0, y: -25 })
  },
  moveLeft ({commit}) {
    commit('addVector', { x: -25, y: 0 })
  },
  moveRight ({commit}) {
    commit('addVector', { x: 25, y: 0 })
  },
  rotateCenterClockwise ({ dispatch }) {
    let matrix = rotationMatrix(-15)
    dispatch('applyMatrixCenter2a', { matrix })
  },
  rotateCenterCounterClockwise ({ dispatch }) {
    let matrix = rotationMatrix(15)
    dispatch('applyMatrixCenter2a', { matrix })
  },
  rotateOriginClockwise ({ commit }) {
    let matrix = rotationMatrix(-15)
    commit('applyMatrix2a', {matrix})
  },
  rotateOriginCounterClockwise ({ commit }) {
    let matrix = rotationMatrix(15)
    commit('applyMatrix2a', {matrix})
  },
  rotatePointClockwise ({ commit }, { x, y }) {
    commit('addVector', {x: -x, y: -y})
    commit('applyMatrix2a', { matrix: rotationMatrix(-15) })
    commit('addVector', {x: x, y: y})
  },
  rotatePointCounterClockwise ({ commit }, { x, y }) {
    commit('addVector', {x: -x, y: -y})
    commit('applyMatrix2a', { matrix: rotationMatrix(15) })
    commit('addVector', {x: x, y: y})
  },
  stretchX ({ dispatch }) {
    let matrix = stretchMatrixX(1.25)
    dispatch('applyMatrixCenter2a', { matrix })
  },
  contractX ({ dispatch }) {
    let matrix = stretchMatrixX(0.875)
    dispatch('applyMatrixCenter2a', { matrix })
  },
  stretchY ({ dispatch }) {
    let matrix = stretchMatrixY(1.25)
    dispatch('applyMatrixCenter2a', { matrix })
  },
  contractY ({ dispatch }) {
    let matrix = stretchMatrixY(0.875)
    dispatch('applyMatrixCenter2a', { matrix })
  },
  shearTopToRight ({ dispatch }) {
    let matrix = shearMatrixX(0.3)
    dispatch('applyMatrixCenter2a', { matrix })
  },
  shearTopToLeft ({ dispatch }) {
    let matrix = shearMatrixX(-0.3)
    dispatch('applyMatrixCenter2a', { matrix })
  },
  shearRightToTop ({ dispatch }) {
    let matrix = shearMatrixY(0.3)
    dispatch('applyMatrixCenter2a', { matrix })
  },
  shearRightToBottom ({ dispatch }) {
    let matrix = shearMatrixY(-0.3)
    dispatch('applyMatrixCenter2a', { matrix })
  },
  mirror ({ commit }, { a, b, c }) {
    let aNorm = -(a / b)
    let bNorm = -(c / b)
    commit('addVector', {x: 0, y: -bNorm})
    commit('applyMatrix2a', { matrix: mirrorMatrix(Math.atan(aNorm)) })
    commit('addVector', {x: 0, y: bNorm})
  }
})

export let globalActions = {
  applyMatrixCenter2a ({ commit, getters }, { matrix }) {
    let center = getters.center
    commit('addVector', {x: -center.x, y: -center.y})
    commit('applyMatrix2a', { matrix })
    commit('addVector', {x: center.x, y: center.y})
  }
}

export let mutations = {
  applyMatrix2a (state, { matrix }) {
    state.coordinates.a = { ...applyMatrixToVector(matrix, state.coordinates.a) }
    state.coordinates.b = { ...applyMatrixToVector(matrix, state.coordinates.b) }
    state.coordinates.c = { ...applyMatrixToVector(matrix, state.coordinates.c) }
    state.coordinates.d = { ...applyMatrixToVector(matrix, state.coordinates.d) }
  },

  addVector (state, { x, y }) {
    state.coordinates.a = { x: state.coordinates.a.x + x, y: state.coordinates.a.y + y }
    state.coordinates.b = { x: state.coordinates.b.x + x, y: state.coordinates.b.y + y }
    state.coordinates.c = { x: state.coordinates.c.x + x, y: state.coordinates.c.y + y }
    state.coordinates.d = { x: state.coordinates.d.x + x, y: state.coordinates.d.y + y }
  }
}
