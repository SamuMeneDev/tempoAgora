import Cidade from "./Cidade";
import Estado from "./Estado";

export interface IHistorico {
    cidade: Cidade,
    estado: Estado,
    timeBusca: string
}