import rangeV from './range.vue'

const Range = {

    install(Vue,options){

        Vue.component('Range',rangeV)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vueToast)
  }
export default Range