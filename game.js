// Player stats
let playerStats = JSON.parse(localStorage.getItem('veridiaPlayer')) || {
    money: 0, fame: 0, followers: 0, level: 1
};

const statsEl = document.getElementById('stats');

// Phaser config
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: null,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y:0 }, debug:false }
    },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);

let player, cursors, coins, npcs;

function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('npc', 'assets/npc.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('building', 'assets/building.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemap.json');
    this.load.image('tiles', 'assets/building.png');
}

function create() {
    // Map
    const map = this.make.tilemap({ key:'map' });
    const tileset = map.addTilesetImage('building', 'tiles');
    map.createLayer('Ground', tileset);
    
    // Player
    player = this.physics.add.sprite(400,300,'player');
    player.setCollideWorldBounds(true);

    // NPCs
    npcs = this.physics.add.group();
    for(let i=0;i<5;i++){
        let npc=this.physics.add.sprite(Phaser.Math.Between(100,700),Phaser.Math.Between(100,500),'npc');
        npc.setVelocity(Phaser.Math.Between(-50,50),Phaser.Math.Between(-50,50));
        npc.setBounce(1,1);
        npc.setCollideWorldBounds(true);
        npcs.add(npc);
    }

    // Coins
    coins = this.physics.add.group();
    for(let i=0;i<10;i++){
        let coin=this.physics.add.sprite(Phaser.Math.Between(50,750),Phaser.Math.Between(50,550),'coin');
        coins.add(coin);
    }

    this.physics.add.overlap(player, coins, collectCoin, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    updateStatsDisplay();
}

function update() {
    player.setVelocity(0);

    if(cursors.left.isDown) player.setVelocityX(-200);
    if(cursors.right.isDown) player.setVelocityX(200);
    if(cursors.up.isDown) player.setVelocityY(-200);
    if(cursors.down.isDown) player.setVelocityY(200);
}

function collectCoin(playerObj, coin) {
    coin.disableBody(true,true);
    playerStats.money += 50;
    playerStats.fame += 10;
    playerStats.followers += 5;
    localStorage.setItem('veridiaPlayer', JSON.stringify(playerStats));
    updateStatsDisplay();
}

function updateStatsDisplay() {
    statsEl.textContent = `Money: ${playerStats.money} | Fame: ${playerStats.fame} | Followers: ${playerStats.followers} | Level: ${playerStats.level}`;
}

// Offline service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(e=>console.log('SW fail',e));
}
