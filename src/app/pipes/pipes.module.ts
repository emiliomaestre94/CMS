import { SexoPipe } from './sexo.pipe';
import { FechaPipe } from './fecha.pipe';
import { HoraPipe } from './hora.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports:      [ CommonModule],
  declarations: [ HoraPipe,FechaPipe,SexoPipe],
  exports:      [ HoraPipe,FechaPipe,SexoPipe],
})
export class PipesModule { }