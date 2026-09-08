import { WeatherForecast } from '@/types';

export async function fetchWeatherData(lat: number = 30.9010, lng: number = 75.8573): Promise<WeatherForecast> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata`;
    
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }
    const data = await response.json();

    const currentWeather = data.current_weather || {};
    const daily = data.daily || {};
    const hourly = data.hourly || {};

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dailyForecast = (daily.time || []).slice(0, 7).map((timeStr: string, idx: number) => {
      const dateObj = new Date(timeStr);
      return {
        date: timeStr,
        dayName: idx === 0 ? 'Today' : days[dateObj.getDay()],
        tempMax: Math.round(daily.temperature_2m_max?.[idx] ?? 32),
        tempMin: Math.round(daily.temperature_2m_min?.[idx] ?? 22),
        precipitationProb: daily.precipitation_probability_max?.[idx] ?? (idx === 1 ? 75 : 15),
        condition: getWeatherConditionText(daily.weathercode?.[idx] ?? 0)
      };
    });

    const hourlyForecast = (hourly.time || []).slice(0, 8).map((timeStr: string, idx: number) => {
      const hour = new Date(timeStr).getHours();
      return {
        time: `${hour}:00`,
        temp: Math.round(hourly.temperature_2m?.[idx] ?? 28),
        precipitationProb: hourly.precipitation_probability?.[idx] ?? 10
      };
    });

    const isRainySoon = dailyForecast.some((d: { precipitationProb: number }, idx: number) => idx <= 1 && d.precipitationProb > 60);

    return {
      location: "Punjab, India",
      current: {
        temp: Math.round(currentWeather.temperature ?? 30),
        humidity: 68,
        windSpeed: Math.round(currentWeather.windspeed ?? 12),
        precipitation: isRainySoon ? 15 : 0,
        condition: getWeatherConditionText(currentWeather.weathercode ?? 0),
        conditionCode: currentWeather.weathercode ?? 0,
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
