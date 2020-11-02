import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpServiceResponse<T> {
  resultado: T;
}
export class HttpServiceMensagem {
  constructor(public codigo: string, public mensagem: string) { }
}

export interface Mensagem {
  mensagem: string;
  codigo: number;
}

export class HttpOptions {
  headers: HttpHeaders;
  params?: HttpParams;
}

export class CobrancaMensagem {
  codigo: string;
  mensagem: string;
  dataHora: string;
}

export class CobrancaResposta {
  erro: CobrancaMensagem;
}
