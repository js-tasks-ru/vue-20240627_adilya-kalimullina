import { defineComponent } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'WeatherDetailsItem',

  template: `
        <div class="weather-details__item">
            <div class="weather-details__item-label"><slot name="label"></div>
            <div class="weather-details__item-value"><slot name="value"></div>
        </div>
  `,
})
