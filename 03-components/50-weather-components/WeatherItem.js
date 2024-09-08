import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { WeatherConditionIcons } from './weather.service.ts'
import WeatherDetailsItem from './WeatherDetailsItem.js'

export default defineComponent({
  name: 'WeatherItem',

  components: {
    WeatherDetailsItem,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const weatherConditionIcons = WeatherConditionIcons

    function isNight(data) {
      return data.current.dt < data.current.sunrise || data.current.dt > data.current.sunset
    }

    return {
      isNight,
      weatherConditionIcons,
    }
  },

  template: `
        <li :class="{'weather-card--night': isNight(data) }" class="weather-card">
          <div v-if="data.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span  class="weather-alert__description">{{ data.alert.sender_name }} {{ data.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ data.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ data.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="data.current.weather.description">{{ weatherConditionIcons[data.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ (data.current.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <WeatherDetailsItem>
                <template #label>Давление, мм рт. ст.</template>
                <template #value>{{ Math.round(data.current.pressure * 0.75) }}</template>
            </WeatherDetailsItem>
             <WeatherDetailsItem>
                <template #label>Влажность, %</template>
                <template #value>{{ data.current.humidity }}</template>
            </WeatherDetailsItem>
             <WeatherDetailsItem>
                <template #label>Облачность, %</template>
                <template #value>{{ data.current.clouds }}</template>
            </WeatherDetailsItem>
             <WeatherDetailsItem>
                <template #label>Ветер, м/с</template>
                <template #value>">{{ data.current.wind_speed}}</template>
            </WeatherDetailsItem>
          </div>
        </li>
  `,
})
