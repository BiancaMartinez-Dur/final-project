namespace SpriteKind {
    export const Tree = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Life = SpriteKind.create()
    export const Extra_Score = SpriteKind.create()
}
function Moneys () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Coin)
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        Money_Sprite = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 4 4 d 5 b 
            b 5 4 5 5 1 5 b 
            c 5 4 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Coin)
        animation.runImageAnimation(
        Money_Sprite,
        [img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 4 4 d 5 b 
            b 5 4 5 5 1 5 b 
            c 5 4 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `,img`
            . . b b b . . . 
            . b 5 5 5 b . . 
            b 5 d 4 d 5 b . 
            b 5 4 5 1 5 b . 
            c 5 4 5 1 d c . 
            c 5 d 1 d d c . 
            . f d d d f . . 
            . . f f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 d 1 5 b . 
            . b 5 4 1 5 b . 
            . c 5 4 1 d c . 
            . c 5 1 d d c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . . b 1 1 b . . 
            . . b 5 5 b . . 
            . . b d d b . . 
            . . c d d c . . 
            . . c 4 4 c . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 1 d 5 b . 
            . b 5 1 4 5 b . 
            . c d 1 4 5 c . 
            . c d d 1 5 c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 4 d 5 b 
            . b 5 1 5 4 5 b 
            . c d 1 5 4 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `],
        200,
        true
        )
        tiles.placeOnTile(Money_Sprite, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Extra_Score, function (sprite, otherSprite) {
    info.changeScoreBy(3)
    sprites.destroy(otherSprite, effects.spray, 500)
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    scene.cameraShake(1, 50)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles4, function (sprite, location) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Life)
    mySprite = sprites.create(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        .......33...33......
        ......3333.3333.....
        ......333333333.....
        ......333333333.....
        .......3333333......
        ........33333.......
        .........333........
        ..........3.........
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        `, SpriteKind.Life)
    tiles.placeOnTile(mySprite, location)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
function loadLevel () {
    if (CurrentLevel == 0) {
        effects.confetti.startScreenEffect()
        tiles.setCurrentTilemap(tilemap`level1`)
        Enemys()
        Moneys()
        Stars()
        next_Level()
        effects.confetti.endScreenEffect()
    } else if (CurrentLevel == 1) {
        tiles.setCurrentTilemap(tilemap`level2`)
        Enemys()
        Moneys()
        Stars()
        next_Level()
        Gamer.x = 280
        Gamer.y = 240
    } else {
        game.gameOver(true)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Life, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(1)
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
})
function next_Level () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Tree)
    for (let value of tiles.getTilesByType(sprites.castle.tileDarkGrass2)) {
        Tree_Sprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . c c c c 6 . . . . . 
            . . . . c c 6 7 7 5 5 6 6 . . . 
            . . c c 6 6 6 6 7 5 5 7 c c . . 
            . c 6 6 6 7 7 7 7 7 7 5 6 c c . 
            . c 6 6 7 7 7 5 7 6 7 7 7 6 c c 
            c 6 6 7 7 6 7 7 7 6 7 7 6 6 6 c 
            c c 6 6 6 7 6 7 6 6 6 6 5 7 6 c 
            c c c c 6 7 7 6 7 7 7 6 7 6 6 c 
            . c c 6 6 6 6 c 6 6 6 6 6 c c c 
            . c c 6 6 c 6 6 c 6 c 6 6 c c . 
            . . c c f f 6 6 c f f c c f . . 
            . . . . c f c c c f c f f . . . 
            . . . . . 4 f f f c . e . . . . 
            . . . . . . e e e . . 4 . . . . 
            . . . . . . . e e . e . . . . . 
            `, SpriteKind.Tree)
        tiles.placeOnTile(Tree_Sprite, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        tiles.setTileAt(value, sprites.castle.tileDarkGrass2)
    }
}
function Enemys () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        Snail_Sprite = sprites.create(img`
            ...................cc...
            ...............cccc63c..
            ..............c633336c..
            ..........cc.c6cc33333c.
            .........b55c6c55c33333c
            .........ff5c6c5ff33333c
            .........ff5c6c5ff6333cc
            .........b553c355c6666cc
            ..........b55355c333333c
            .........cc55555bcc3333c
            ........c5545554b55c33c.
            ........b54b4444bb5cbb..
            ........c455b4b5554c45b.
            ........c555c4c555c4c5c.
            ........c5555c5555c4c5c.
            .........ccccccccc..ccc.
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        Snail_Sprite,
        [img`
            . . . . . . . . . . . c c . . . 
            . . . . . . . c c c c 6 3 c . . 
            . . . . . . c 6 3 3 3 3 6 c . . 
            . . c c . c 6 c c 3 3 3 3 3 c . 
            . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 6 3 3 3 c c 
            . b 5 5 3 c 3 5 5 c 6 6 6 6 c c 
            . . b 5 5 3 5 5 c 3 3 3 3 3 3 c 
            . . c 5 5 5 5 b c c 3 3 3 3 3 c 
            . . c 4 5 5 4 b 5 5 c 3 3 3 c . 
            . c 5 b 4 4 b b 5 c c b b b . . 
            . c 4 4 b 5 5 5 4 c 4 4 4 5 b . 
            . c 5 4 c 5 5 5 c 4 4 4 c 5 c . 
            . c 5 c 5 5 5 5 c 4 4 4 c c c . 
            . . c c c c c c c . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . c c . . . . 
            . . . . . . c c c c 6 3 c . . . 
            . . . . . c 6 6 3 3 3 6 c . . . 
            . . . . c 6 6 3 3 3 3 3 3 c . . 
            b c c c 6 6 c c 3 3 3 3 3 3 c . 
            b 5 5 c 6 c 5 5 c 3 3 3 3 3 c . 
            f f 5 c 6 c 5 f f 6 3 3 3 c c . 
            f f 5 c c c 5 f f 6 6 6 6 c c . 
            . b 5 5 3 5 5 c 3 3 3 3 3 3 c . 
            . c 5 5 5 5 4 c c c 3 3 3 3 c . 
            . c 4 5 5 4 4 b 5 5 c 3 3 c . . 
            . c 5 b 4 4 b b 5 c b b c . . . 
            . c c 5 4 c 5 5 5 c c 5 c . . . 
            . . . c c 5 5 5 5 c c c c . . . 
            . . . . c c c c c c . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . c c . . . 
            . . . . . . . c c c c 6 3 c . . 
            . . . . . . c 6 6 3 3 3 6 c . . 
            . . . . . c 6 6 3 3 3 3 3 3 c . 
            . b c c c 6 6 c c 3 3 3 3 3 3 c 
            . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 6 3 3 3 c c 
            . f f 5 c c c 5 f f 6 6 6 6 c c 
            . . b 5 5 3 5 5 c c c 3 3 3 3 c 
            . . c 5 5 5 5 5 b 5 5 c 3 3 3 c 
            . c 4 4 5 5 4 4 b b 5 c 3 3 c . 
            . c 5 5 b 4 4 4 b 5 5 5 b c . . 
            . c 5 5 5 4 4 4 c 5 5 5 c b . . 
            . . c c c c 4 c 5 5 5 5 c c . . 
            . . . . c c c c c c c c c c . . 
            `,img`
            . . . . . . . . . . . c c . . . 
            . . . . . . . c c c c 6 3 c . . 
            . . . . . . c 6 3 3 3 3 6 c . . 
            . . c c . c 6 c c 3 3 3 3 3 c . 
            . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 6 3 3 3 c c 
            . b 5 5 3 c 3 5 5 c 6 6 6 6 c c 
            . . b 5 5 3 5 5 c 3 3 3 3 3 3 c 
            . c c 5 5 5 5 4 c c 3 3 3 3 3 c 
            c 5 5 4 5 5 4 c 5 5 c 3 3 3 c . 
            b 5 4 b 4 4 4 c 5 5 5 b c c . . 
            c 4 5 5 b 4 4 c 5 5 5 c b b . . 
            c 5 5 5 c 4 c 5 5 5 5 c c 5 b . 
            c 5 5 5 5 c 4 c c c c c c 5 c . 
            . c c c c c c . . . . . c c c . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        Snail_Sprite,
        [img`
            . . . c c . . . . . . . . . . . 
            . . c 3 6 c c c c . . . . . . . 
            . . c 6 3 3 3 3 6 c . . . . . . 
            . c 3 3 3 3 3 c c 6 c . c c . . 
            c 3 3 3 3 3 c 5 5 c 6 c 5 5 b . 
            c 3 3 3 3 3 f f 5 c 6 c 5 f f . 
            c c 3 3 3 6 f f 5 c 6 c 5 f f . 
            c c 6 6 6 6 c 5 5 3 c 3 5 5 b . 
            c 3 3 3 3 3 3 c 5 5 3 5 5 b . . 
            c 3 3 3 3 3 c c b 5 5 5 5 c . . 
            . c 3 3 3 c 5 5 b 4 5 5 4 c . . 
            . . b b b c c 5 b b 4 4 b 5 c . 
            . b 5 4 4 4 c 4 5 5 5 b 4 4 c . 
            . c 5 c 4 4 4 c 5 5 5 c 4 5 c . 
            . c c c 4 4 4 c 5 5 5 5 c 5 c . 
            . . . . . . . c c c c c c c . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . c c . . . . . . . . . . 
            . . . c 3 6 c c c c . . . . . . 
            . . . c 6 3 3 3 6 6 c . . . . . 
            . . c 3 3 3 3 3 3 6 6 c . . . . 
            . c 3 3 3 3 3 3 c c 6 6 c c c b 
            . c 3 3 3 3 3 c 5 5 c 6 c 5 5 b 
            . c c 3 3 3 6 f f 5 c 6 c 5 f f 
            . c c 6 6 6 6 f f 5 c c c 5 f f 
            . c 3 3 3 3 3 3 c 5 5 3 5 5 b . 
            . c 3 3 3 3 c c c 4 5 5 5 5 c . 
            . . c 3 3 c 5 5 b 4 4 5 5 4 c . 
            . . . c b b c 5 b b 4 4 b 5 c . 
            . . . c 5 c c 5 5 5 c 4 5 c c . 
            . . . c c c c 5 5 5 5 c c . . . 
            . . . . . . c c c c c c . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . c c . . . . . . . . . . . 
            . . c 3 6 c c c c . . . . . . . 
            . . c 6 3 3 3 6 6 c . . . . . . 
            . c 3 3 3 3 3 3 6 6 c . . . . . 
            c 3 3 3 3 3 3 c c 6 6 c c c b . 
            c 3 3 3 3 3 c 5 5 c 6 c 5 5 b . 
            c c 3 3 3 6 f f 5 c 6 c 5 f f . 
            c c 6 6 6 6 f f 5 c c c 5 f f . 
            c 3 3 3 3 c c c 5 5 3 5 5 b . . 
            c 3 3 3 c 5 5 b 5 5 5 5 5 c . . 
            . c 3 3 c 5 b b 4 4 5 5 4 4 c . 
            . . c b 5 5 5 b 4 4 4 b 5 5 c . 
            . . b c 5 5 5 c 4 4 4 5 5 5 c . 
            . . c c 5 5 5 5 c 4 c c c c . . 
            . . c c c c c c c c c c . . . . 
            `,img`
            . . . c c . . . . . . . . . . . 
            . . c 3 6 c c c c . . . . . . . 
            . . c 6 3 3 3 3 6 c . . . . . . 
            . c 3 3 3 3 3 c c 6 c . c c . . 
            c 3 3 3 3 3 c 5 5 c 6 c 5 5 b . 
            c 3 3 3 3 3 f f 5 c 6 c 5 f f . 
            c c 3 3 3 6 f f 5 c 6 c 5 f f . 
            c c 6 6 6 6 c 5 5 3 c 3 5 5 b . 
            c 3 3 3 3 3 3 c 5 5 3 5 5 b . . 
            c 3 3 3 3 3 c c 4 5 5 5 5 c c . 
            . c 3 3 3 c 5 5 c 4 5 5 4 5 5 c 
            . . c c b 5 5 5 c 4 4 4 b 4 5 b 
            . . b b c 5 5 5 c 4 4 b 5 5 4 c 
            . b 5 c c 5 5 5 5 c 4 c 5 5 5 c 
            . c 5 c c c c c c 4 c 5 5 5 5 c 
            . c c c . . . . . c c c c c c . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingRight)
        )
        Snail_Sprite.x = 50
        Snail_Sprite.follow(Gamer, 50)
        tiles.placeOnTile(Snail_Sprite, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
function Stars () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Extra_Score)
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        Star_Sprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . b 5 5 5 b . . . . . 
            . . . . . b b 5 5 5 b b . . . . 
            . . b b b b 5 5 5 1 1 b b b b . 
            . . b 5 5 5 5 5 5 1 1 5 5 5 b . 
            . . b d d 5 5 5 5 5 5 5 d d b . 
            . . . b d d 5 5 5 5 5 d d b . . 
            . . . c b 5 5 5 5 5 5 5 b c . . 
            . . . c b 5 5 5 5 5 5 5 b c . . 
            . . . c 5 5 d d b d d 5 5 c . . 
            . . . c 5 d d c c c d d 5 c . . 
            . . . c c c c . . . c c c c . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Extra_Score)
        animation.runImageAnimation(
        Star_Sprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . b 5 5 5 b . . . . . 
            . . . . . b b 5 5 5 b b . . . . 
            . . b b b b 5 5 5 1 1 b b b b . 
            . . b 5 5 5 5 5 5 1 1 5 5 5 b . 
            . . b d d 5 5 5 5 5 5 5 d d b . 
            . . . b d d 5 5 5 5 5 d d b . . 
            . . . c b 5 5 5 5 5 5 5 b c . . 
            . . . c b 5 5 5 5 5 5 5 b c . . 
            . . . c 5 5 d d b d d 5 5 c . . 
            . . . c 5 d d c c c d d 5 c . . 
            . . . c c c c . . . c c c c . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . b b . . . . . . . 
            . . . . . . b d d b . . . . . . 
            . . . . . b d 5 5 d b . . . . . 
            . . . . b b 5 5 5 5 b b . . . . 
            . . . . b 5 5 5 5 5 5 b . . . . 
            b b b b b 5 5 5 5 1 1 d b b b b 
            b 5 5 5 5 5 5 5 5 1 1 1 5 5 5 b 
            b d d 5 5 5 5 5 5 1 1 1 5 d d b 
            . b d d 5 5 5 5 5 5 5 5 d d b . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . c b 5 5 5 5 5 5 5 5 b c . . 
            . . c 5 5 5 5 d d 5 5 5 5 c . . 
            . . c 5 5 d b b b b d 5 5 c . . 
            . . c 5 d b c c c c b d 5 c . . 
            . . c c c c . . . . c c c c . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . b b . . . . . . . 
            . . . . . . b 5 5 b . . . . . . 
            . . . b b b 5 5 1 1 b b b . . . 
            . . . b 5 5 5 5 1 1 5 5 b . . . 
            . . . . b d 5 5 5 5 d b . . . . 
            . . . . c b 5 5 5 5 b c . . . . 
            . . . . c 5 d d d d 5 c . . . . 
            . . . . c 5 d c c d 5 c . . . . 
            . . . . c c c . . c c c . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        200,
        true
        )
        tiles.placeOnTile(Star_Sprite, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Tree, function (sprite, otherSprite) {
    CurrentLevel += 1
    loadLevel()
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
    Gamer.setPosition(26, 21)
})
let Star_Sprite: Sprite = null
let Snail_Sprite: Sprite = null
let Tree_Sprite: Sprite = null
let mySprite: Sprite = null
let Money_Sprite: Sprite = null
let Gamer: Sprite = null
let CurrentLevel = 0
info.setScore(0)
info.setLife(3)
CurrentLevel = 0
Gamer = sprites.create(img`
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c c c c c c c f . 
    . f f c c a a a a c c f f . 
    . f f f b f a a f b f f f . 
    . f f d 1 f d d f 1 d f f . 
    . . f f d d d d d d f f . . 
    . . 3 f c 9 9 9 9 c f 3 . . 
    . 3 9 f 3 a a a a 3 f 9 3 . 
    . 9 d f a a a a a a c d 9 . 
    . 9 9 f 9 9 9 9 9 9 f 9 9 . 
    . . . . f f f f f f . . . . 
    . . . . f f . . f f . . . . 
    `, SpriteKind.Player)
Gamer.setPosition(21, 56)
Gamer.setScale(0.9, ScaleAnchor.Middle)
controller.moveSprite(Gamer)
characterAnimations.loopFrames(
Gamer,
[img`
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c c c c c c c f . 
    . f f c c c c c c c c f f . 
    . f f f c c c c c c f f f . 
    . f f f f f f f f f f f f . 
    . . f f f f f f f f f f . . 
    . . 3 f f f f f f f f 3 . . 
    . 3 9 f f f f f f f f 9 3 . 
    . 9 d f a a a a a a f d 9 . 
    . 9 9 f 9 9 9 9 9 9 f 9 9 . 
    . . . . f f f f f f . . . . 
    . . . . f f . . f f . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c c c c c c f f . 
    . f f c c c c c c c c f f . 
    . f f c c c c c c f f f f . 
    . f f f f f f f f f f f f . 
    . . f f f f f f f f f f . . 
    . . 3 f f f f f f f f 3 . . 
    . . 3 f f f f f f f f 9 3 . 
    . . 9 f a a a a a 3 d d 9 . 
    . . 3 f f f f f f 3 3 9 . . 
    . . . f f f . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f f c c c c c c c c c f . 
    . f f c c c c c c c c f f . 
    . f f f f c c c c c c f f . 
    . f f f f f f f f f f f f . 
    . . f f f f f f f f f f . . 
    . . 3 f f f f f f f f 3 . . 
    . 3 9 f f f f f f f f 3 . . 
    . 9 d d 3 a a a a a f 9 . . 
    . . 9 3 3 f f f f f f 3 . . 
    . . . . . . . . f f f . . . 
    `],
500,
characterAnimations.rule(Predicate.MovingUp)
)
characterAnimations.loopFrames(
Gamer,
[img`
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c c c c c c c f . 
    . f f c c a a a a c c f f . 
    . f f f b f a a f b f f f . 
    . f f d 1 f d d f 1 d f f . 
    . . f f d d d d d d f f . . 
    . . 3 f a 9 9 9 9 a f 3 . . 
    . 3 9 f 3 a a a a 3 f 9 3 . 
    . 9 d f a a a a a a c d 9 . 
    . 9 9 f 9 9 9 9 9 9 f 9 9 . 
    . . . . f f f f f f . . . . 
    . . . . f f . . f f . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c c c c c c c f . 
    . f f c c a a a a c c f f . 
    . f f f b f a a f b f f f . 
    . f f d 1 f d d f 1 d f f . 
    . . f f d d d d d 9 3 f 3 . 
    . f 3 f f 9 9 9 3 d d 9 3 . 
    . 3 9 f 3 a a a 3 d d 3 . . 
    . . . f 9 9 9 9 f 3 3 . . . 
    . . . f f f f f f f . . . . 
    . . . f f f . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c c c c c c c f . 
    . f f c c a a a a c c f f . 
    . f f f b f a a f b f f f . 
    . f f d 1 f d d f 1 d f f . 
    . 3 f 3 9 d d d d d f f . . 
    . 3 9 d d 3 9 9 9 f f 3 f . 
    . . 3 d d 3 a a a 3 f 9 3 . 
    . . . 3 3 f 9 9 9 9 f . . . 
    . . . . f f f f f f f . . . 
    . . . . . . . . f f f . . . 
    `],
500,
characterAnimations.rule(Predicate.MovingDown)
)
characterAnimations.loopFrames(
Gamer,
[img`
    . . . . f f f f f . f f f . 
    . . . f f c c c c f f f f f 
    . . f c c c c c c b f f f f 
    . . f c c c c c c 3 c f f f 
    . f c c c c c c c c 3 3 f . 
    . f c c c c c c c c f f f . 
    . f f 3 a a c c c f f f f . 
    . f f 3 a a f b f 9 9 f f . 
    . . f f d d f 1 9 d 9 f . . 
    . . . f d d d d 9 f f f . . 
    . . . f 3 9 9 9 3 3 f . . . 
    . . . f a a a 3 d d 9 . . . 
    . . . f a a a 3 d d 3 . . . 
    . . . f 9 9 9 f 3 3 f . . . 
    . . . . f f f f f f . . . . 
    . . . . . . f f f . . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . . . . f f f f f . f f f . 
    . . . f f c c c c f f f f f 
    . . f c c c c c c b f f f f 
    . . f c c c c c c 3 c f f f 
    . f c c c c c c c c 3 3 f . 
    . f c c c c c c c c f f f . 
    . f f c a a c c c f f f f . 
    . f f f a a f b f 9 9 f f . 
    . . f f d d f 1 9 d 9 f . . 
    . . . f d d d 3 3 f f f . . 
    . . . f 3 9 3 d d 9 f . . . 
    . . . f a a 3 d d 3 f . . . 
    . . f f 9 9 f 3 3 f f f . . 
    . . f f f f f f f f f f . . 
    . . . f f f . . . f f . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . . . . f f f f f . f f f . 
    . . . f f c c c c f f f f f 
    . . f c c c c c c b f f f f 
    . . f c c c c c c 3 c f f f 
    . f c c c c c c c c 3 3 f . 
    . f c c c c c c c c f f f . 
    . f f c a a c c c f f f f . 
    . f f f a a f b f 9 9 f f . 
    . . f c d d f 1 9 d 9 f f . 
    . . . f d d d d 9 f f f . . 
    . . . f 3 9 9 9 3 d d 9 . . 
    . . . f a a a a 3 d d 3 . . 
    . . f f 9 9 9 9 f 3 3 f . . 
    . . f f f f f f f f f f . . 
    . . . f f f . . . f f . . . 
    `],
500,
characterAnimations.rule(Predicate.MovingLeft)
)
characterAnimations.loopFrames(
Gamer,
[img`
    . . . . . . . . . . . . . . 
    . f f f . f f f f f . . . . 
    f f f f f c c c c f f . . . 
    f f f f b c c c c c c f . . 
    f f f c 3 c c c c c c f . . 
    . f 3 3 c c c c c c c c f . 
    . f f f c c c c c c c c f . 
    . f f f f c c c a a c f f . 
    . f f 9 9 f b f a a f f f . 
    . f f 9 d 9 1 f d d c f . . 
    . . f f f 9 d d d d f . . . 
    . . 9 d d 3 9 9 9 3 f . . . 
    . . 3 d d 3 a a a a f . . . 
    . . f 3 3 f 6 6 6 6 f f . . 
    . . f f f f f f f f f f . . 
    . . . f f . . . f f f . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . f f f . f f f f f . . . . 
    f f f f f c c c c f f . . . 
    f f f f b c c c c c c f . . 
    f f f c 3 c c c c c c f . . 
    . f 3 3 c c c c c c c c f . 
    . f f f c c c c c c c c f . 
    . f f f f c c c a a c f f . 
    . f f 9 9 f b f a a f f f . 
    . . f 9 d 9 1 f d d f f . . 
    . . f f f 3 3 d d d f . . . 
    . . . f 9 d d 9 9 3 f . . . 
    . . . f 3 d d 3 a a f . . . 
    . . f f f 3 3 f 6 6 f f . . 
    . . f f f f f f f f f f . . 
    . . . f f . . . f f f . . . 
    `,img`
    . f f f . f f f f f . . . . 
    f f f f f c c c c f f . . . 
    f f f f b c c c c c c f . . 
    f f f c 3 c c c c c c f . . 
    . f 3 3 c c c c c c c c f . 
    . f f f c c c c c c c c f . 
    . f f f f c c c a a 3 f f . 
    . f f 9 9 f b f a a 3 f f . 
    . . f 9 d 9 1 f d d f f . . 
    . . f f f 9 d d d d f . . . 
    . . . f 3 3 9 9 9 3 f . . . 
    . . . 9 d d 3 a a a f . . . 
    . . . 3 d d 3 a a a f . . . 
    . . . f 3 3 f 9 9 9 f . . . 
    . . . . f f f f f f . . . . 
    . . . . . f f f . . . . . . 
    `],
500,
characterAnimations.rule(Predicate.MovingRight)
)
loadLevel()
scene.cameraFollowSprite(Gamer)
scene.setBackgroundColor(15)
