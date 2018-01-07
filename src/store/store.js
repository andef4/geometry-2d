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
    }
  }
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
    ...homogeneousActions,
    ...affineGlobalActions,
    ...affineActions,
    ...complexActions
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
    }
  },
  strict: debug
})
