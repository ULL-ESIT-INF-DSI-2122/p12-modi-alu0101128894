import 'mocha';
import {expect} from 'chai';
import {add} from '../src/index';
import {resta} from '../src/index';
import {multiplicacion} from '../src/index';
import {division} from '../src/index';


describe('operaciones complejas', () => {
  it('suma entre dos numeros', () => {
    expect(add(1, 7)).to.eql(8);
  });
  it('resta entre dos numeros', () => {
    expect(resta(1, 7)).to.eql(-6);
  });
  it('multiplicacion entre dos numeros', () => {
    expect(multiplicacion(1, 7)).to.eql(7);
  });
  it('division entre dos numeros', () => {
    expect(division(1, 7)).to.eql(0.14285714285714285);
  });
});
