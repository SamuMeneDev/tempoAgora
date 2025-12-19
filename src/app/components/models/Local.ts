import Cidade from './Cidade';
import Estado from './Estado';
//import { environment } from '../../../environments/environment';

export interface IUvDados {
  cor: string;
  nivel: string;
  dica: string;
  indice: string;
}

export default class Local {
  private estado!: Estado;
  private cidade!: Cidade;
  private status: boolean = false;
  private clima!: Clima;
  private uvDados: IUvDados[] = [
    {
      cor: 'bg-green-500 text-white',
      nivel: 'Baixo',
      dica: 'Nenhuma precaução necessária. Procure uma sombra nas horas próximas ao meio-dia.',
      indice: '1 a 2',
    },
    {
      cor: 'bg-amber-200 text-stone-700',
      nivel: 'Moderado',
      dica: 'Em horários próximos ao meio-dia, procure locais sombreados. Procure usar camisa e boné. User o protetor solar.',
      indice: '3 a 5',
    },
    {
      cor: 'text-neutral-700 bg-yellow-500',
      nivel: 'Alto',
      dica: 'Risco Alto. User protetor solar FPS alto, em horários próximos ao meio-dia, procure locais sombreados. Procure usar camisa, boné e óculos de sol.',
      indice: '6 a 7',
    },
    {
      cor: 'bg-red-600 text-white',
      nivel: 'Muito Alto',
      dica: 'Risco muito alto. Evite o sol em horários próximos ao meio-dia, use protetor FPS 50+, chapéu, óculos de sol e roupa',
      indice: '8 a 10',
    },
    {
      cor: 'bg-violet-800 text-white',
      nivel: 'Extremo',
      dica: 'Risco extremo. Evite exposição ao sol a todo custo. Mesmo curtos períodos causam queimaduras graves',
      indice: '11+',
    },
  ];
  private airDados: IUvDados[] = [
    {
      cor: 'bg-green-600 text-white',
      nivel: 'Bom',
      dica: 'Qualidade satisfatória, pouco ou nenhum risco à saúde',
      indice: '0 a 50',
    },
    {
      cor: 'bg-yellow-400 text-stone-800',
      nivel: 'Moderado',
      dica: 'Aceitável, mas pode haver risco para pessoas sensíveis (ozônio, particulados).',
      indice: '51 a 100',
    },
    {
      cor: 'bg-orange-600 text-white',
      nivel: 'Alerta para grupos sensíveis',
      dica: 'Efeitos na saúde para pessoas sensíveis; o público em geral não é afetado.',
      indice: '101 a 150',
    },
    {
      cor: 'bg-red-600 text-white',
      nivel: 'Pouvo saudável',
      dica: 'Efeitos para toda a população; grupos sensíveis sofrem mais.',
      indice: '151 a 200',
    },
    {
      cor: 'bg-purple-600 text-white',
      nivel: 'Muito insalubre',
      dica: 'Alerta de saúde de emergência; todos são afetados.',
      indice: '201 a 300',
    },
    {
      cor: 'bg-red-950 text-white',
      nivel: 'Perigoso',
      dica: 'Condições de emergência; risco sério à saúde para todos',
      indice: '301 a 500',
    },
  ];
  private queryDate!: Date;
  public constructor(template?: boolean) {
    if (template) {
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
      this.clima = {
        data: [
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
        ],
      };
      this.setQueryDate(this.formatDate());
      this.status = false;
    } else {
      this.reset();
    }
  }

  public static requisicao(url: string) {
    const request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
  }
  public setEstado(uf: Estado) {
    this.estado = uf;
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
  public reset() {
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
      const dados = Local.requisicao(
        `http://api.weatherbit.io/v2.0/current?key=${process.env['API_KEY']}&lang=pt&city=${
          this.getCidade().nome
        }&country=BR`
      );
      this.clima = JSON.parse(dados);
      this.setQueryDate(this.formatDate());
    }
  }
  public getClima(): Clima {
    return this.clima;
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
  public uvLevel(uv: number): IUvDados {
    if (uv >= 0) {
      if (uv < 3) {
        return this.uvDados[0];
      } else if (uv < 6) {
        return this.uvDados[1];
      } else if (uv < 8) {
        return this.uvDados[2];
      } else if (uv < 11) {
        return this.uvDados[3];
      } else {
        return this.uvDados[4];
      }
    } else {
      throw new Error('Parâmetro inválido na função');
    }
  }
  public getAirDados(): IUvDados[] {
    return this.airDados;
  }
  public getUVDados(): IUvDados[] {
    return this.uvDados;
  }
  public airLevel(air: number): IUvDados {
    if (air < 51) {
      return this.airDados[0];
    } else if (air < 101) {
      return this.airDados[1];
    } else if (air < 151) {
      return this.airDados[2];
    } else if (air < 201) {
      return this.airDados[3];
    } else if (air < 301) {
      return this.airDados[4];
    } else {
      return this.airDados[5];
    }
  }
  public chuvaLevel(chuva: number): string {
    if (chuva <= 0) {
      return 'Sem chuva prevista';
    } else if (chuva <= 2.5) {
      return 'Chuva Fraca';
    } else if (chuva <= 10) {
      return 'Chuva Moderada';
    } else if (chuva <= 50) {
      return 'Chuva Forte';
    } else {
      return 'Chuva Muito Forte/Violenta';
    }
  }
  private setQueryDate(date: Date) {
    this.queryDate = date;
  }
  public getQueryDate(): Date {
    return this.queryDate;
  }
  private formatDate(): Date {
    // Transforma string em Date
    let dateTime = this.clima.data[0].ob_time.split(' ');
    const formatDate = new Date(dateTime[0] + 'T' + this.parseTime(dateTime[1]) + ':00');
    return formatDate;
  }
}
