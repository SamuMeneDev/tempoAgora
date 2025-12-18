interface Clima {
  data: [
    {
      temp: number,
      uv: number,
      app_temp: number,
      clouds: number,
      ob_time: string,
      country_code: string,
      weather: {
        icon: string,
        code: number,
        description: string,
      };
      sunrise: string,
      sunset: string,
    }
  ];
}
