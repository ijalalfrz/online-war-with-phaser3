import BaseCharacter from "./BaseCharacter";
import getDistance from "./Helper";

export default class Warrior2 extends BaseCharacter {
    constructor() {

        super('warrior2', 48, 48, true, 'png')
        this.alias = 'Kapten Aladin'
        this.health = 100
        this.damage = 10
        this.aliasPosition = {
            '1': {
                x: 95,
                y: 105
            }, 
            '2': {
                x: 540,
                y: 105
            }
        }
    }
    
    // _loadIdle(scene) {
    //     const key = `${this.name}-idle`
    //     scene.load.atlas(key, `${this.baseUrlAsset}${this.name}/Sprites/Idle.${this.ext}`,`${this.baseUrlAsset}${this.name}/Sprites/Idle.json`)
    //     return key
    // }

    // _loadWalkUp(scene) {
    //     const key = `${this.name}-walk-up`
    //     scene.load.atlas(key, `assets/characters/warrior1/use/walk-up.png`,`assets/characters/warrior1/use/walk-up.json`)
    //     return key
    // }

    // _loadWalkDown(scene) {
    //     const key = `${this.name}-walk-down`
    //     scene.load.atlas(key, `${this.baseUrlAsset}${this.name}/use/walk-down.${this.ext}`,`${this.baseUrlAsset}${this.name}/use/walk-down.json`)
    //     return key
    // }
    // _loadWalkSide(scene) {
    //     const key = `${this.name}-walk-side`
    //     scene.load.atlas(key, `${this.baseUrlAsset}${this.name}/use/walk-side.${this.ext}`,`${this.baseUrlAsset}${this.name}/use/walk-side.json`)
    //     return key
    // }

    // _loadAttackUp(scene) {
    //     const key = `${this.name}-attack-up`
    //     scene.load.atlas(key, `${this.baseUrlAsset}${this.name}/use/attack-up.${this.ext}`,`${this.baseUrlAsset}${this.name}/use/attack-up.json`)
    //     return key
    // }
    // _loadAttackSide(scene) {
    //     const key = `${this.name}-attack-side`
    //     scene.load.atlas(key, `${this.baseUrlAsset}${this.name}/use/attack-side.${this.ext}`,`${this.baseUrlAsset}${this.name}/use/attack-side.json`)
    //     return key
    // }
    // _loadAttackDown(scene) {
    //     const key = `${this.name}-attack-down`
    //     scene.load.atlas(key, `${this.baseUrlAsset}${this.name}/use/attack-down.${this.ext}`,`${this.baseUrlAsset}${this.name}/use/attack-down.json`)
    //     return key
    // }

    // _loadHit(scene) {
    //     const key = `${this.name}-hit`
    //     scene.load.atlas(key, `${this.baseUrlAsset}${this.name}/Sprites/Take_hit.${this.ext}`,`${this.baseUrlAsset}${this.name}/Sprites/Take_hit.json`)
    //     return key
    // }

    // _loadDeath(scene) {
    //     const key = `${this.name}-death`
    //     scene.load.atlas(key, `${this.baseUrlAsset}${this.name}/Sprites/Death.${this.ext}`,`${this.baseUrlAsset}${this.name}/Sprites/Death.json`)
    //     return key
    // }


    loadAnimation(scene) {
        // this.keyWalkUp = this._loadWalkUp(scene)
        // this.keyWalkSide = this._loadWalkSide(scene)
        // this.keyWalkDown = this._loadWalkDown(scene)

        // this.keyAttackUp = this._loadAttackUp(scene)
        // this.keyAttackSide = this._loadAttackSide(scene)
        // this.keyAttackDown = this._loadAttackDown(scene)


    }

    buildAnimation(scene) {
        this.keyWalkUp = `${this.name}-walk-up`
        this.keyWalkDown = `${this.name}-walk-down`
        this.keyAttackUp = `${this.name}-attack-up`
        this.keyAttackSide = `${this.name}-attack-side`
        this.keyWalkSide = `${this.name}-walk-side`
        this.keyDeath = `${this.name}-death-side`


        // this.keyAttackDown = this._loadAttackDown(scene)

        this.createAnimation(scene, this.keyWalkUp, this.keyWalkUp, 'walk-up-', 5, 0, 12, -1)
        this.createAnimation(scene, this.keyWalkDown, this.keyWalkDown, 'walk-down-', 5, 0, 12, -1)
        this.createAnimation(scene, this.keyWalkSide, this.keyWalkSide, 'walk-side-', 5, 0, 12, -1)

        this.createAnimation(scene, this.keyAttackUp, this.keyAttackUp, 'attack-up-', 7, 0, 12, 0)
        this.createAnimation(scene, this.keyAttackSide, this.keyAttackSide, 'attack-side-', 7, 0, 17, 0)
        this.createAnimation(scene, this.keyDeath, this.keyDeath, 'death-side-', 7, 0, 12, 1)

        // this.createAnimation(scene, this.keyAttackDown, this.keyAttackDown, 'attack-down-', 6, 0, 12, 0)

    }

    moveToEnemy(scene, target) {
        let x1 = this.player.x
        let y1 = this.player.y
        let x2 = target.getX()
        let y2 = target.getY()
        const distance = getDistance(x1,y1,x2,y2)
        if (distance > 20 ) {
            scene.physics.moveToObject(this.player, target.getCharacterObj(), 10)
            this.moveFace(target.getCharacterObj())
        } else{
            this.isMoving = false
            this.stop()
            if (!this.attackPlay) {
                this.attackSide(target.character)
            }
        }
        
    }

}