/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IniciarSesionService } from './iniciar-sesion.service';

describe('Service: IniciarSesion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IniciarSesionService]
    });
  });

  it('should ...', inject([IniciarSesionService], (service: IniciarSesionService) => {
    expect(service).toBeTruthy();
  }));
});
