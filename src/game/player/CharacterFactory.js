
import Warrior1 from "./Warrior1"
import Warrior2 from "./Warrior2"

export default class CharacterFactory {
    constructor (character) {
        this.character = character
    }

    create() {
        switch(this.character) {
            case 'warrior1':
                return new Warrior1()
            case 'warrior2':
                return new Warrior2()
                
        }
    }
}