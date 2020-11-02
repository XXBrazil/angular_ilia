import {Injectable} from '@angular/core';
import {Filtro, Path, Repos, Starred, Usuario} from '../../models/filtro.models';
import {HttpService} from '../../services/http.service';
import {Observable, of} from 'rxjs';
import {HttpServiceResponse} from '../../models/http.model';

@Injectable({
  providedIn: 'root'
})
export class TablesService extends HttpService {

  listaUrl: Array<Path> = [];

  pesquisarGitHub(filtro: Filtro): Observable<any> {
    switch (+filtro.tipoPesquisa) {
      case 1:
        return this.pesquisarPorUsuario(filtro.usuario);
      case 2:
        return this.pesquisarPorRepositorio(filtro.usuario);
      case 3:
        return this.pesquisarMaisVisitados(filtro.usuario, filtro.repositorio);
    }
  }

  public pesquisarPorUsuario(usuario: string): Observable<HttpServiceResponse<Usuario>> {
    const path = new Path();
    path.url = 'https://api.github.com/users/' + usuario;
    this.listaUrl.push(path);
    return this.get('https://api.github.com/users/' + usuario)
  }

  public pesquisarPorRepositorio(usuario: string): Observable<HttpServiceResponse<Repos[]>>{
    const path = new Path();
    path.url = 'https://api.github.com/users/' + usuario + '/repos';
    this.listaUrl.push(path);
    return this.get('https://api.github.com/users/' + usuario + '/repos');
  }

  public pesquisarMaisVisitados(usuario: string, repo: string): Observable<HttpServiceResponse<Starred[]>>{
    const path = new Path();
    path.url = 'https://api.github.com/repos/' + usuario + '/' + repo + '/stargazers';
    this.listaUrl.push(path);
    return this.get('https://api.github.com/repos/' + usuario + '/' + repo + '/stargazers');
  }

  getListaUrl(){
    return of(this.listaUrl)
  }
}
