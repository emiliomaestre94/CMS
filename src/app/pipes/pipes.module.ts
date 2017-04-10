import { QuitarIVAPipe } from './quitarIVA.pipe';
import { TotalFacturaPipe } from './totalfactura.pipe';
import { OfertaPipe } from './oferta.pipe';
import { SexoPipe } from './sexo.pipe';
import { FechaPipe } from './fecha.pipe';
import { HoraPipe } from './hora.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports:      [ CommonModule],
  declarations: [ HoraPipe,FechaPipe,SexoPipe,OfertaPipe,TotalFacturaPipe, QuitarIVAPipe],
  exports:      [ HoraPipe,FechaPipe,SexoPipe,OfertaPipe,TotalFacturaPipe, QuitarIVAPipe],
})

export class PipesModule { }