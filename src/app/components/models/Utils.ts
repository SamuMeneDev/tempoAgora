export class Utils {
    public static requisicao(url: string) {
    const request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
  }
  public static parseTime(horaEUA: string): string { // ESTATICO
      let time: Array<string> = horaEUA.split(':');
      let hora: number = Number(time[0]);
      if (hora - 3 < 0) {
        for (let i = 3; i >= 1; i--) {
          hora = hora - 1;
          if (hora < 0) {
            hora = 23;
          }
        }
      } else {
        hora = hora - 3;
      }
      const horaFormated: string =
        hora.toString().length < 2 ? '0'.concat(hora.toString()) : hora.toString();
      time[0] = horaFormated;
  
      return time.join(':');
  }
  public parseTime(horaEUA: string): string {
      let time: Array<string> = horaEUA.split(':');
      let hora: number = Number(time[0]);
      if (hora - 3 < 0) {
        for (let i = 3; i >= 1; i--) {
          hora = hora - 1;
          if (hora < 0) {
            hora = 23;
          }
        }
      } else {
        hora = hora - 3;
      }
      const horaFormated: string =
        hora.toString().length < 2 ? '0'.concat(hora.toString()) : hora.toString();
      time[0] = horaFormated;
  
      return time.join(':');
  }
  
  public static formatDate(dateTimeApi: string): Date {
    // Transforma string em Date
    let dateTime = dateTimeApi.split(' ');
    const formatDate = new Date(dateTime[0] + 'T' + Utils.parseTime(dateTime[1]) + ':00');
    return formatDate;
  }
  
}