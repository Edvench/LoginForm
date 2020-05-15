import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
 EntityMetadataMap,
 NgrxDataModule,
 DefaultDataServiceConfig
} from 'ngrx-data';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
 root: 'http://dev.angulartest.digital-era.ru/api/'
};

export const entityMetadata: EntityMetadataMap = {
 User:{}
};

export const pluralNames = { User: 'user' };

@NgModule({
 imports: [
   CommonModule,
   NgrxDataModule.forRoot({ entityMetadata, pluralNames })
 ],
 declarations: [],
 providers: [
   { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
 ]
})
export class EntityStoreModule {}