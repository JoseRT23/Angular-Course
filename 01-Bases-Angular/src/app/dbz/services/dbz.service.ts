import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

@Injectable({providedIn: 'root'})
export class DbzService {
    
    public characters: Character[] = [{
        id: uuid(),
        name: 'Krillin',
        power: 500
        },{
        id: uuid(),
        name: 'Goku',
        power: 9500
        }];

    onNewCharacter(character:Character): void {
        const newCharacter: Character = { id: uuid(), ...character };
        this.characters.push(newCharacter);
    };

    onDeleteCharacter(index:string): void {
        console.log(index)
        this.characters = this.characters.filter((c) => c.id !== index);
    };
    
}