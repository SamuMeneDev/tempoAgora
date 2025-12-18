import Cidade from './Cidade';
import Estado from './Estado';
import { environment } from '../../../environments/environment';
interface IUvDados {
  cor: string;
  nivel: string;
  dica: string;
}
export default class Local {
  private estado!: Estado;
  private cidade!: Cidade;
  private status: boolean = false;
  private clima!: Clima;
  private uvDados: IUvDados[] = [
    {
      cor: 'bg-green-500',
      nivel: 'Baixo',
      dica: 'Nenhuma precaução necessária. Procure uma combra nas horas próximas ao meio-dia.',
    },
    {
      cor: 'bg-amber-200 text-stone-700',
      nivel: 'Moderado',
      dica: 'Em horários próximos ao meio-dia, procure locais sombreados. Procure usar camisa e boné. User o protetor solar.',
    },
    {
      cor: 'text-neutral-700 bg-yellow-500',
      nivel: 'Alto',
      dica: 'Risco Alto. User protetor solar FPS alto, em horários próximos ao meio-dia, procure locais sombreados. Procure usar camisa, boné e óculos de sol.',
    },
    {
      cor: 'bg-red-600',
      nivel: 'Muito Alto',
      dica: 'Risco muito alto. Evite o sol em horários próximos ao meio-dia, use protetor FPS 50+, chapéu, óculos de sol e roupa',
    },
    {
      cor: 'bg-violet-800',
      nivel: 'Extremo',
      dica: 'Risco extremo. Evite exposição ao sol a todo custo. Mesmo curtos períodos causam queimaduras graves',
    },
  ];
  public constructor(template?: boolean) {
    
    if (template) { // Template para não consumir a API
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
            uv: 2,
            weather: {
              code: 803,
              description: 'Broken clouds',
              icon: 'c03d',
            },
          },
        ],
      };
      this.status = true;
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
        `http://api.weatherbit.io/v2.0/current?key=${environment.API_KEY}&lang=pt&city=${
          this.getCidade().nome
        }&country=BR`
      );
      this.clima = JSON.parse(dados);
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
}
