import DomBox from '@/phaser/scene/ShopManagerScene/uiObjects/DomBox';

class TextBox extends DomBox {
  constructor(scene, contents, color = 0xffffff, width = 0, height = 0) {
    super(scene, `text-box-dom-wrapper`, width, height);
    this._setColor(color);
    this.setContents(contents);
    scene.add.existing(this);
  }

  setContents(contents) {
    const html = `
      <div class="text-box">
        ${contents}
      </div>
      <style>
        .text-box {
            text-align: center;
            font-size: 1.5rem;
            color: white;
            line-height: 2;
            padding-left: 10px;
            padding-right: 10px;
        }
      </style>
    `;
    this._clearHTML();
    this._domWrapper.insertAdjacentHTML('beforeend', html);
  }
}

export default TextBox;
