import Cidade from './models/Cidade';
import Estado from './models/Estado';
export default class Local {
  private estado!: Estado;
  private cidade!: Cidade;
  private status: boolean = false;
  constructor() {
    this.reset();
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
}
//  http://api.weatherbit.io/v2.0/current?lang=pt&key=9eef1c8cc39f4367871d5becaa7e5625&include=minutely&city=Sao+Paulo