import Phaser from '@/package/phaser';

class TextBox {
  constructor(scene, width, height, color, contents) {
    this._textBoxBackground = scene.add.rectangle(0, 0, width, height, color);
    this._contents = scene.add.text(0, 0, contents);

    Phaser.Display.Align.In.Center(this._contents, this._textBoxBackground);

    this._container = scene.add.container(0, 0, [this._textBoxBackground, this._contents]);
    this._container.setSize(width, height);

    return this._container;
  }
}

export default TextBox;
