

export default function loadAllAssets(scene) {
    const basic = ['up','side','down']
    const move = ['walk', 'attack', 'death']
    const character = ['warrior1', 'warrior2']

    character.forEach((c)=>{
        move.forEach((m)=>{
            basic.forEach((b)=>{
                scene.load.atlas(`${c}-${m}-${b}`, `assets/characters/${c}/use/${m}-${b}.png`,`assets/characters/${c}/use/${m}-${b}.json`)
            })
        })

    })

}
