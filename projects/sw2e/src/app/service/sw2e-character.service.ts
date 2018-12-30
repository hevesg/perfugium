import { Injectable } from '@angular/core';
import {Sw2eCharacter} from '../interface/sw2e-character';
import {D6CharacterService} from '../../../../../src/app/d6/service/d6-character.service';

@Injectable({
  providedIn: 'root'
})
export class Sw2eCharacterService extends D6CharacterService {

  protected _data: Sw2eCharacter;

  constructor() {
    super('sw2e');
  }

  public get data(): Sw2eCharacter {
    return this._data;
  }

  create(): void {
    super.create();
    this.createAttributes();
  }

  private createAttributes(): void {
    this._data.attributes = {
      dexterity : this.createAttribute(3),
      knowledge : this.createAttribute(3),
      mechanical : this.createAttribute(3),
      perception : this.createAttribute(3),
      strength : this.createAttribute(3),
      technical : this.createAttribute(3)
    };
  }

  public setDexterity(val: number) {
    this.setAttribute(this._data.attributes.dexterity, val);
  }

  public setKnowledge(val: number) {
    this.setAttribute(this._data.attributes.knowledge, val);
  }

  public setMechanical(val: number) {
    this.setAttribute(this._data.attributes.mechanical, val);
  }

  public setPerception(val: number) {
    this.setAttribute(this._data.attributes.perception, val);
  }

  public setStrength(val: number) {
    this.setAttribute(this._data.attributes.strength, val);
  }

  public setTechnical(val: number) {
    this.setAttribute(this._data.attributes.technical, val);
  }
}
