import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData()
    const weatherConditionIcons = WeatherConditionIcons

    return {
      weatherData,
      weatherConditionIcons,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="data in weatherData" :class="{'weather-card--night': data.current.dt < data.current.sunrise || data.current.dt > data.current.sunset }" class="weather-card">
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
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ Math.round(data.current.pressure * 0.75) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ data.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ data.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ data.current.wind_speed}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
