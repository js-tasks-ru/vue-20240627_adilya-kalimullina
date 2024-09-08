import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import WeatherItem from './WeatherItem.js'

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherItem,
  },

  props: {
    weatherData: {
      type: Array,
      required: true,
    },
  },

  template: `
        <ul class="weather-list unstyled-list">
            <WeatherItem v-for="data in weatherData" :data="data" />
        </ul>
  `,
})
