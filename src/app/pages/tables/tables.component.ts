import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Filtro, Path} from '../../models/filtro.models';
import {TablesService} from './tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: 'tables.component.html'
})
export class TablesComponent implements OnInit {

  pesquisa: number
  answer: any
  private searchForm: FormGroup;
  paths: Path[];

  constructor(private form: FormBuilder,
              private tableService: TablesService) {}

  ngOnInit() {
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
     this.tableService.pesquisarGitHub(form).subscribe( resultado => {
       if (resultado) {
         this.answer = resultado
         console.log('Test', resultado.toString());
       }
     })
  }

  changeSearch() {
    const form = this.searchForm.getRawValue() as Filtro;
    this.pesquisa = +form.tipoPesquisa;
  }

}
