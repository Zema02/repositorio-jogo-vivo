class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.image('background', 'assets/background.jpeg');
        this.load.audio('bgMusic', 'assets/Begin%20Your%20Journey.mp3');
    }

    create() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        const playText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'Clique para iniciar a música',
            { font: '20px Arial', fill: '#ffffff' }
        ).setOrigin(0.5);

        playText.setInteractive();
        playText.on('pointerdown', () => {
            const music = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
            music.play();
            playText.destroy();
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [StartScene]
};

const game = new Phaser.Game(config);