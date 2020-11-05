import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Filtro, Path, Repos, Starred, Usuario} from '../../models/filtro.models';
import {TablesService} from './tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: 'tables.component.html'
})
export class TablesComponent implements OnInit {

  pesquisa: number
  users: Array<Usuario>;
  repos: Array<Repos>;
  starreds: Array<Starred>
  private searchForm: FormGroup;
  paths: Path[];
  titulo: string;
  show: boolean;

  constructor(private form: FormBuilder,
              private tableService: TablesService) {}

  ngOnInit() {
     this.show = false;
     this.users = [];
     this.repos = [];
     this.starreds = [];
     this.tableService.getListaUrl().subscribe( lista => {
       this.paths = lista;
    });

  this.searchForm = this.form.group({
    usuario: [null, Validators.required],
    tipoPesquisa:[0],
    repositorio: [null]
  });

  }

  pesquisar() {
     const form = this.searchForm.getRawValue() as Filtro;
     this.clearLists();
     this.tableService.pesquisarGitHub(form).subscribe( resultado => {
       if (resultado) {
         this.show = true;
         switch (this.pesquisa) {
           case 1:
             return this.createUser(resultado);
           case 2:
             return this.createRepo(resultado);
           case 3:
             return this.createStarred(resultado);
         }
       }
     })
  }

  createUser(resultado: any) {
    const usuario = new Usuario();
    usuario.name = resultado.name;
    usuario.location = resultado.location;
    usuario.login = resultado.login;
    usuario.id = resultado.id;
    usuario.node_id = resultado.node_id;
    usuario.created_at = resultado.created_at;
    this.users.push(usuario);
  }

  createRepo(resultado: any) {
    for (const r of resultado) {
      const repo = new Repos();
      repo.name = r.name;
      repo.archive_url = r.archive_url;
      repo.full_name = r.full_name;
      repo.language = r.language;
      repo.size = r.size;
      repo.created_at = r.created_at;
      this.repos.push(repo);
    }
  }

  createStarred(resultado: any) {
    for (const s of resultado) {
      const starred = new Starred();
      starred.login = s.login;
      starred.id = s.id;
      starred.node_id = s.node_id;
      starred.html_url = s.html_url;
      starred.type = s.type;
      starred.site_admin = s.site_admin;
      this.starreds.push(starred);
    }
  }

  changeSearch() {
    const form = this.searchForm.getRawValue() as Filtro;
    this.pesquisa = +form.tipoPesquisa;
    this.definirTitulo();
  }

  definirTitulo() {
    switch (this.pesquisa) {
      case 1:
        return this.titulo = 'Resultado Pesquisa de Usuário';
      case 2:
        return this.titulo = 'Resultado Pesquisa de Repositório';
      case 3:
        return this.titulo = 'Resultado Pesquisa de Visitantes ao Repositório';
    }
  }

  clearLists() {
    switch (this.pesquisa) {
      case 1:
        return this.users = [];
      case 2:
        return this.repos = [];
      case 3:
        return this.starreds = [];
    }
  }

}
