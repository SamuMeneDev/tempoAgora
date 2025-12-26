import { IEscalaDados } from './IEscalaDados';
import { Utils } from './Utils';
export type ClimaData = {
  temp: number;
  uv: number;
  app_temp: number;
  clouds: number;
  ob_time: string;
  aqi: number;
  country_code: string;
  precip: number;
  weather: {
    icon: string;
    code: number;
    description: string;
  };
  sunrise: string;
  sunset: string;
  wind_spd: number;
  gust: number;
  wind_cdir_full: string;
  wind_cdir: string; // Ponto cardeal abreviado
  wind_dir: number; // Direção em graus
};

export class Clima {

  constructor(data: ClimaData) {
    this.data = data;
    this.buscaData = Utils.formatDate(data.ob_time);
  }

  //ATTR
  private data!: ClimaData;
  private uvDados: IEscalaDados[] = [
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
  private arDados: IEscalaDados[] = [
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
  private buscaData!: Date;

  // METODOS
  public nivelChuva(): string {
    if (this.data.precip <= 0) {
      return 'Sem chuva';
    } else if (this.data.precip <= 2.5) {
      return 'Chuva Fraca';
    } else if (this.data.precip <= 10) {
      return 'Chuva Moderada';
    } else if (this.data.precip <= 50) {
      return 'Chuva Forte';
    } else {
      return 'Chuva Muito Forte/Violenta';
    }
  }
  public nivelAr(): IEscalaDados {
    if (this.data.aqi < 51) {
      return this.arDados[0];
    } else if (this.data.aqi < 101) {
      return this.arDados[1];
    } else if (this.data.aqi < 151) {
      return this.arDados[2];
    } else if (this.data.aqi < 201) {
      return this.arDados[3];
    } else if (this.data.aqi < 301) {
      return this.arDados[4];
    } else {
      return this.arDados[5];
    }
  }
  public nivelUV(): IEscalaDados {
    if (this.data.uv >= 0) {
      if (this.data.uv < 3) {
        return this.uvDados[0];
      } else if (this.data.uv < 6) {
        return this.uvDados[1];
      } else if (this.data.uv < 8) {
        return this.uvDados[2];
      } else if (this.data.uv < 11) {
        return this.uvDados[3];
      } else {
        return this.uvDados[4];
      }
    } else {
      throw new Error('Parâmetro inválido na função');
    }
  }

  // GET e SET

  public getData(): ClimaData {
    return this.data;
  }
  public getBuscaData(): Date {
    return this.buscaData
  }
  public getUVDados(): IEscalaDados[] {
    return this.uvDados;
  }
  public getArDados(): IEscalaDados[] {
    return this.arDados;
  }
}
