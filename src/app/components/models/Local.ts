import Cidade from './Cidade';
import Estado from './Estado';
import { Clima } from './Clima';
import { environment } from '../../../environments/environment.development';
import { Utils } from './Utils';

export default class Local {
  // ATTR
  public constructor(teste: boolean = false) {
    this.teste = teste;
    if (teste) {
      // Template para não consumir a API
      this.estado = {
        id: 0,
        nome: 'São Paulo',
        sigla: 'SP',
      };
      this.cidade = {
        id: 100,
        nome: 'São Paulo',
      };
      const data = [
        {
          app_temp: 24.25,
          clouds: 75,
          country_code: 'BR',
          ob_time: '2017-08-28 16:45',
          sunrise: '10:44',
          sunset: '23:47',
          temp: 24.19,
          precip: 2,
          wind_spd: 6.17,
          gust: 8,
          uv: 11,
          aqi: 45,
          wind_cdir_full: 'northeast',
          wind_cdir: 'NE',
          wind_dir: 50,
          weather: {
            code: 803,
            description: 'Broken clouds',
            icon: 'c03d',
          },
        },
      ];
      this.clima = new Clima(data[0]);

      this.status = false;
    } else {
      this.resetAll();
    }
  }

  private teste: boolean = false; // caso true, usa uma base de dados teste para não gastar requisições na API
  private estado!: Estado;
  private cidade!: Cidade;
  private status: boolean = false; // Pronto para aprensentação na View
  private clima!: Clima;

  public resetAll() {
    this.cidade = {
      id: -1,
      nome: '',
    };
    this.estado = {
      id: -1,
      nome: '',
      sigla: '',
    };
    this.setStatus(false);
  }
  public resetCid() {
    this.cidade = {
      id: -1,
      nome: '',
    };
    this.setStatus(false);
  }
  public queryClima() {
    if (this.isStatus()) {
      const dados = JSON.parse(Utils.requisicao(
        `https://api.weatherbit.io/v2.0/current?key=${environment.API_KEY}&lang=pt&city=${
          this.getCidade().nome
        }&country=BR`
      ));
      this.clima = new Clima(dados.data[0]);
    }
  }

  //GET e SET

  public getClima(): Clima {
    return this.clima;
  }
  public setEstado(uf: Estado) {
    this.estado = uf;
  }
  public isTeste(): boolean {
    return this.teste;
  }
  public setCidade(cid: Cidade) {
    this.cidade = cid;
  }
  public getEstado(): Estado {
    return this.estado;
  }
  public getCidade(): Cidade {
    return this.cidade;
  }
  public setStatus(status: boolean) {
    this.status = status;
  }
  public isStatus(): boolean {
    return this.status;
  }
}
