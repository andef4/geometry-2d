import Vue from 'vue'
import Vuex from 'vuex'

import {
  actions as homogeneousActions,
  globalActions as homogeneousGlobalActions,
  mutations as homogeneousMutations
} from './homogeneous/store'

import {
  actions as affineActions,
  globalActions as affineGlobalActions,
  mutations as affineMutations
} from './affine/store'

import {
  actions as complexActions,
  mutations as complexMutations
} from './complex/store'

import camera, { xyRotationToUV } from './camera'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const initialState = () => {
  return {
    coordinates: {
      a: {
        x: 100,
        y: 200
      },
      b: {
        x: 150,
        y: 200
      },
      c: {
        x: 150,
        y: 150
      },
      d: {
        x: 100,
        y: 150
      }
    },
    camera: {
      x: 270,
      y: -240,
      rotation: 20
    },
    currentImplementation: 'affine',
    implementations: [
        { text: 'Affine', value: 'affine' },
        { text: 'Homogeneous', value: 'homogeneous' },
        { text: 'Complex numbers', value: 'complex' }
    ]
  }
}

function addPrefix (prefix, obj) {
  const keyValues = Object.keys(obj).map(key => {
    return { [prefix + key]: obj[key] }
  })
  return Object.assign({}, ...keyValues)
}

export default new Vuex.Store({
  state: initialState(),
  getters: {
    center (state) {
      return {
        x: (state.coordinates.a.x + state.coordinates.c.x) / 2,
        y: (state.coordinates.a.y + state.coordinates.c.y) / 2
      }
    },
    cameraImage: camera,
    uv: xyRotationToUV
  },
  actions: {
    ...homogeneousGlobalActions,
    ...addPrefix('homogeneous', homogeneousActions),
    ...affineGlobalActions,
    ...addPrefix('affine', affineActions),
    ...addPrefix('complex', complexActions),
    moveUp ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'moveUp')
    },
    moveDown ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'moveDown')
    },
    moveLeft ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'moveLeft')
    },
    moveRight ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'moveRight')
    },
    rotateCenterClockwise ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateCenterClockwise')
    },
    rotateCenterCounterClockwise ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateCenterCounterClockwise')
    },
    rotateOriginClockwise ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateOriginClockwise')
    },
    rotateOriginCounterClockwise ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateOriginCounterClockwise')
    },
    rotatePointClockwise ({ state, dispatch }, param) {
      dispatch(state.currentImplementation + 'rotatePointClockwise', param)
    },
    rotatePointCounterClockwise ({ state, dispatch }, param) {
      dispatch(state.currentImplementation + 'rotatePointCounterClockwise', param)
    },
    stretchX ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'stretchX')
    },
    contractX ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'contractX')
    },
    stretchY ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'stretchY')
    },
    contractY ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'contractY')
    },
    shearTopToRight ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'shearTopToRight')
    },
    shearTopToLeft ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'shearTopToLeft')
    },
    shearRightToTop ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'shearRightToTop')
    },
    shearRightToBottom ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'shearRightToBottom')
    },
    mirror ({ state, dispatch }, param) {
      dispatch(state.currentImplementation + 'mirror', param)
    }
  },
  mutations: {
    ...affineMutations,
    ...homogeneousMutations,
    ...complexMutations,

    reset (state) {
      Object.assign(state, initialState())
    },
    updateCamera (state, camera) {
      Object.assign(state.camera, camera)
    },

    setImplementation (state, implementation) {
      state.currentImplementation = implementation
    }
  },
  strict: debug
})
