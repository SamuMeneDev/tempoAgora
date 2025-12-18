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
      cor: '',
      nivel: 'Baixo',
      dica: 'Nenhuma precaução necessária. Procure uma combra nas horas próximas ao meio-dia.',
    },
    {
      cor: '',
      nivel: 'Moderado',
      dica: 'Em horários próximos ao meio-dia, procure locais sombreados. Procure usar camisa e boné. User o protetor solar.',
    },
    {
      cor: '',
      nivel: 'Alto',
      dica: 'Risco Alto. User protetor solar FPS alto, em horários próximos ao meio-dia, procure locais sombreados. Procure usar camisa, boné e óculos de sol.',
    },
    {
      cor: '',
      nivel: 'Muito Alto',
      dica: 'Risco muito alto. Evite o sol em horários próximos ao meio-dia, use protetor FPS 50+, chapéu, óculos de sol e roupa'
    },
    {
      cor: '',
      nivel: 'Extremo',
      dica: 'Risco extremo. Evite exposição ao sol a todo custo. Mesmo curtos períodos causam queimaduras graves'
    }
  ];
  constructor() {
    this.reset();
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
    switch (uv) {
      case 0:
      case 1:
      case 2:
        return this.uvDados[0];
      case 3:
      case 4:
      case 5:
        return this.uvDados[1];
      default:
        throw new Error('Tipo nao existente');
    }
  }
}
