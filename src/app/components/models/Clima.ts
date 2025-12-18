interface Clima {
  data: [
    {
      temp: number,
      uv: number,
      app_temp: number,
      clouds: number,
      ob_time: string,
      aqi: number,
      country_code: string,
      precip: number,
      weather: {
        icon: string,
        code: number,
        description: string,
      };
      sunrise: string,
      sunset: string,
      wind_spd: number,
      gust: number,
      wind_cdir_full: string,
      wind_cdir: string, // Ponto cardeal abreviado
      wind_dir: number, // Direção em graus
    }
  ];
}
