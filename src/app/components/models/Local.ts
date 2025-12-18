import Cidade from './Cidade';
import Estado from './Estado';
export default class Local {
  private estado!: Estado;
  private cidade!: Cidade;
  private status: boolean = false;
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
}
