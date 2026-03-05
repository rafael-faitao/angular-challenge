import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NombreLib } from './user-lib';

describe('NombreLib', () => {
  let component: NombreLib;
  let fixture: ComponentFixture<NombreLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NombreLib],
    }).compileComponents();

    fixture = TestBed.createComponent(NombreLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
