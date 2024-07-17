import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const Comp = defineComponent({
  name: 'App',

  setup() {
    const date = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })

    return {
      date,
    }
  },

  template: `<div>Сегодня {{date}}</div>`,
})

createApp(Comp).mount('#app')
