import {
  translationMatrix, rotationMatrix, matricesMultiplication3x3, applyMatrixToVector, shearMatrixX, shearMatrixY,
  stretchMatrixX, stretchMatrixY, mirrorMatrix, perspectiveProjectionMatrix
} from './math'

export let actions = {
  moveUp ({commit}) {
    let matrix = translationMatrix(0, 25)
    commit('applyMatrix3h', {matrix})
  },
  moveDown ({commit}) {
    let matrix = translationMatrix(0, -25)
    commit('applyMatrix3h', {matrix})
  },
  moveLeft ({commit}) {
    let matrix = translationMatrix(-25, 0)
    commit('applyMatrix3h', {matrix})
  },
  moveRight ({commit}) {
    let matrix = translationMatrix(25, 0)
    commit('applyMatrix3h', {matrix})
  },
  rotateCenterClockwise ({ dispatch }) {
    let matrix = rotationMatrix(-15)
    dispatch('applyMatrixCenter3h', { matrix })
  },
  rotateCenterCounterClockwise ({ dispatch }) {
    let matrix = rotationMatrix(15)
    dispatch('applyMatrixCenter3h', { matrix })
  },
  rotateOriginClockwise ({ commit }) {
    let matrix = rotationMatrix(-15)
    commit('applyMatrix3h', {matrix})
  },
  rotateOriginCounterClockwise ({ commit }) {
    let matrix = rotationMatrix(15)
    commit('applyMatrix3h', {matrix})
  },
  rotatePointClockwise ({ commit }, { x, y }) {
    let translation1 = translationMatrix(-x, -y)
    let rotation = rotationMatrix(-15)
    let translation2 = translationMatrix(x, y)
    let matrix = matricesMultiplication3x3(translation2, rotation, translation1)
    commit('applyMatrix3h', {matrix})
  },
  rotatePointCounterClockwise ({ commit }, { x, y }) {
    let translation1 = translationMatrix(-x, -y)
    let rotation = rotationMatrix(15)
    let translation2 = translationMatrix(x, y)
    let matrix = matricesMultiplication3x3(translation2, rotation, translation1)
    commit('applyMatrix3h', {matrix})
  },
  stretchX ({ dispatch }) {
    let matrix = stretchMatrixX(1.25)
    dispatch('applyMatrixCenter3h', { matrix })
  },
  contractX ({ dispatch }) {
    let matrix = stretchMatrixX(0.875)
    dispatch('applyMatrixCenter3h', { matrix })
  },
  stretchY ({ dispatch }) {
    let matrix = stretchMatrixY(1.25)
    dispatch('applyMatrixCenter3h', { matrix })
  },
  contractY ({ dispatch }) {
    let matrix = stretchMatrixY(0.875)
    dispatch('applyMatrixCenter3h', { matrix })
  },
  shearTopToRight ({ dispatch }) {
    let matrix = shearMatrixX(0.3)
    dispatch('applyMatrixCenter3h', { matrix })
  },
  shearTopToLeft ({ dispatch }) {
    let matrix = shearMatrixX(-0.3)
    dispatch('applyMatrixCenter3h', { matrix })
  },
  shearRightToTop ({ dispatch }) {
    let matrix = shearMatrixY(0.3)
    dispatch('applyMatrixCenter3h', { matrix })
  },
  shearRightToBottom ({ dispatch }) {
    let matrix = shearMatrixY(-0.3)
    dispatch('applyMatrixCenter3h', { matrix })
  },
  mirror ({ commit }, { a, b, c }) {
    let aNorm = -(a / b)
    let bNorm = -(c / b)

    let translation1 = translationMatrix(0, -bNorm)
    let mirror = mirrorMatrix(Math.atan(aNorm))
    let translation2 = translationMatrix(0, bNorm)
    let matrix = matricesMultiplication3x3(translation2, mirror, translation1)
    commit('applyMatrix3h', { matrix })
  }
}

export let globalActions = {
  perspectiveProjection ({commit}, {xIntercept, yIntercept}) {
    let matrix = perspectiveProjectionMatrix(xIntercept, yIntercept)
    commit('applyMatrix3h', {matrix})
  },

  applyMatrixCenter3h ({commit, getters}, {matrix}) {
    let center = getters.center
    let translation1 = translationMatrix(-center.x, -center.y)
    let translation2 = translationMatrix(center.x, center.y)
    let combinedMatrix = matricesMultiplication3x3(translation2, matrix, translation1)
    commit('applyMatrix3h', {matrix: combinedMatrix})
  }
}

export let mutations = {
  applyMatrix3h (state, { matrix }) {
    state.coordinates.a = { ...applyMatrixToVector(matrix, state.coordinates.a) }
    state.coordinates.b = { ...applyMatrixToVector(matrix, state.coordinates.b) }
    state.coordinates.c = { ...applyMatrixToVector(matrix, state.coordinates.c) }
    state.coordinates.d = { ...applyMatrixToVector(matrix, state.coordinates.d) }
  }
}
