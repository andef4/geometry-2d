import {
  unprefixedActions as homogeneousActions
} from '../homogeneous/store'

import { complexMultiplication, complexRotation } from './math'
import { addPrefix } from '../utils'

export let actions = addPrefix('', {
  ...homogeneousActions,
  rotateCenterClockwise ({ commit, getters }) {
    let center = getters.center
    commit('addVector', { x: -center.x, y: -center.y })
    let complex = complexRotation(-15)
    commit('applyComplex', { complex })
    commit('addVector', { x: center.x, y: center.y })
  },
  rotateCenterCounterClockwise ({ commit, getters }) {
    let center = getters.center
    commit('addVector', { x: -center.x, y: -center.y })
    let complex = complexRotation(15)
    commit('applyComplex', { complex })
    commit('addVector', { x: center.x, y: center.y })
  },
  rotateOriginClockwise ({ commit, state }) {
    let complex = complexRotation(-15)
    commit('applyComplex', { complex })
  },
  rotateOriginCounterClockwise ({ commit }) {
    let complex = complexRotation(15)
    commit('applyComplex', { complex })
  },
  rotatePointClockwise ({ commit }, { x, y }) {
    commit('addVector', { x: -x, y: -y })
    let complex = complexRotation(-15)
    commit('applyComplex', { complex })
    commit('addVector', { x: x, y: y })
  },
  rotatePointCounterClockwise ({ commit }, { x, y }) {
    commit('addVector', { x: -x, y: -y })
    let complex = complexRotation(15)
    commit('applyComplex', { complex })
    commit('addVector', { x: x, y: y })
  }
})

export let mutations = {
  applyComplex (state, { complex }) {
    let complexA = {re: state.coordinates.a.x, im: state.coordinates.a.y}
    let complexB = {re: state.coordinates.b.x, im: state.coordinates.b.y}
    let complexC = {re: state.coordinates.c.x, im: state.coordinates.c.y}
    let complexD = {re: state.coordinates.d.x, im: state.coordinates.d.y}

    complexA = complexMultiplication(complexA, complex)
    complexB = complexMultiplication(complexB, complex)
    complexC = complexMultiplication(complexC, complex)
    complexD = complexMultiplication(complexD, complex)

    state.coordinates.a = {x: complexA.re, y: complexA.im}
    state.coordinates.b = {x: complexB.re, y: complexB.im}
    state.coordinates.c = {x: complexC.re, y: complexC.im}
    state.coordinates.d = {x: complexD.re, y: complexD.im}
  }
}
