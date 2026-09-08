import { WeatherForecast } from '@/types';
import { fetchWeatherApi } from 'openmeteo';

export async function fetchWeatherData(lat: number = 30.9010, lng: number = 75.8573): Promise<WeatherForecast> {
  try {
    const responses = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', {
      latitude: lat,
      longitude: lng,
      timezone: 'auto',
      forecast_days: 7,
      current: [
        'temperature_2m',
        'precipitation',
        'weather_code',
        'wind_speed_10m',
        'relative_humidity_2m'
      ],
      hourly: ['temperature_2m', 'precipitation_probability', 'weather_code'],
      daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'precipitation_probability_max']
    }, 2, 0.2, 2, { cache: 'no-store' });

    const response = responses[0];
    if (!response) throw new Error('Open-Meteo returned no weather locations');

    const current = response.current();
    const hourly = response.hourly();
    const daily = response.daily();
    if (!current || !hourly || !daily) throw new Error('Open-Meteo returned incomplete weather data');

    const currentTemperature = current.variables(0)?.value() ?? 30;
    const currentPrecipitation = current.variables(1)?.value() ?? 0;
    const currentCode = current.variables(2)?.value() ?? 0;
    const currentWindSpeed = current.variables(3)?.value() ?? 12;
    const currentHumidity = current.variables(4)?.value() ?? 68;
    const hourlyTimes = Array.from(
      { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
      (_, index) => new Date((Number(hourly.time()) + index * hourly.interval()) * 1000)
    );
    const hourlyTemperatures = hourly.variables(0)?.valuesArray() ?? [];
    const hourlyPrecipitation = hourly.variables(1)?.valuesArray() ?? [];
    const dailyTimes = Array.from(
      { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
      (_, index) => new Date((Number(daily.time()) + index * daily.interval()) * 1000)
    );
    const dailyCodes = daily.variables(0)?.valuesArray() ?? [];
    const dailyMax = daily.variables(1)?.valuesArray() ?? [];
    const dailyMin = daily.variables(2)?.valuesArray() ?? [];
    const dailyPrecipitation = daily.variables(3)?.valuesArray() ?? [];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dailyForecast = dailyTimes.slice(0, 7).map((dateObj, idx) => {
      return {
        date: dateObj.toISOString().slice(0, 10),
        dayName: idx === 0 ? 'Today' : days[dateObj.getDay()],
        tempMax: Math.round(dailyMax[idx] ?? 32),
        tempMin: Math.round(dailyMin[idx] ?? 22),
        precipitationProb: dailyPrecipitation[idx] ?? 15,
        condition: getWeatherConditionText(dailyCodes[idx] ?? 0)
      };
    });

    const hourlyForecast = hourlyTimes.slice(0, 8).map((dateObj, idx) => {
      return {
        time: dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
        temp: Math.round(hourlyTemperatures[idx] ?? 28),
        precipitationProb: hourlyPrecipitation[idx] ?? 10
      };
    });

    const isRainySoon = dailyForecast.some((d: { precipitationProb: number }, idx: number) => idx <= 1 && d.precipitationProb > 60);

    return {
      location: "Punjab, India",
      current: {
        temp: Math.round(currentTemperature),
        humidity: Math.round(currentHumidity),
        windSpeed: Math.round(currentWindSpeed),
        precipitation: Math.round(currentPrecipitation),
        condition: getWeatherConditionText(currentCode),
        conditionCode: currentCode,
        icon: isRainySoon ? "CloudRain" : "Sun"
      },
      daily: dailyForecast.length > 0 ? dailyForecast : getFallbackDaily(),
      hourly: hourlyForecast.length > 0 ? hourlyForecast : getFallbackHourly(),
      farmingAdvice: {
        en: isRainySoon 
          ? "Rain expected tomorrow. Avoid chemical spraying today and clear drainage channels."
          : "Favorable dry weather. Ideal day for light irrigation and weeding.",
        hi: isRainySoon
          ? "Kal baarish ki sambhavna hai. Aaj spraying avoid karein aur jal nikasi saf karein."
          : "मौसम साफ है। हल्की सिंचाई और निराई-गुड़ाई के लिए अनुकूल दिन।"
      }
    };
  } catch (error) {
    console.warn("Using fallback weather data due to fetch error:", error);
    return getFallbackWeatherData();
  }
}

function getWeatherConditionText(code: number): string {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Light Rain";
  if (code >= 80 && code <= 82) return "Showers / Heavy Rain";
  if (code >= 95) return "Thunderstorm";
  return "Partly Cloudy";
}

function getFallbackDaily() {
  return [
    { date: '2026-09-08', dayName: 'Today', tempMax: 33, tempMin: 24, precipitationProb: 20, condition: 'Clear Sky' },
    { date: '2026-09-09', dayName: 'Wed', tempMax: 30, tempMin: 23, precipitationProb: 80, condition: 'Showers / Rain' },
    { date: '2026-09-10', dayName: 'Thu', tempMax: 31, tempMin: 23, precipitationProb: 40, condition: 'Partly Cloudy' },
    { date: '2026-09-11', dayName: 'Fri', tempMax: 34, tempMin: 25, precipitationProb: 10, condition: 'Clear Sky' },
    { date: '2026-09-12', dayName: 'Sat', tempMax: 35, tempMin: 26, precipitationProb: 15, condition: 'Clear Sky' },
    { date: '2026-09-13', dayName: 'Sun', tempMax: 33, tempMin: 24, precipitationProb: 30, condition: 'Partly Cloudy' },
    { date: '2026-09-14', dayName: 'Mon', tempMax: 32, tempMin: 23, precipitationProb: 10, condition: 'Clear Sky' }
  ];
}

function getFallbackHourly() {
  return [
    { time: '06:00', temp: 24, precipitationProb: 10 },
    { time: '09:00', temp: 27, precipitationProb: 15 },
    { time: '12:00', temp: 32, precipitationProb: 20 },
    { time: '15:00', temp: 34, precipitationProb: 25 },
    { time: '18:00', temp: 30, precipitationProb: 30 },
    { time: '21:00', temp: 27, precipitationProb: 10 }
  ];
}

function getFallbackWeatherData(): WeatherForecast {
  return {
    location: "Punjab, India",
    current: {
      temp: 31,
      humidity: 65,
      windSpeed: 12,
      precipitation: 15,
      condition: "Partly Cloudy",
      conditionCode: 2,
      icon: "CloudRain"
    },
    daily: getFallbackDaily(),
    hourly: getFallbackHourly(),
    farmingAdvice: {
      en: "Kal baarish ki sambhavna hai. Aaj spraying avoid karein.",
      hi: "कल बारिश की संभावना है। आज छिड़काव (spraying) से बचें।"
    }
  };
}
