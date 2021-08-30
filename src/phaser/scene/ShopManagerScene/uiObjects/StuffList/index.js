import * as htmlHelper from './htmlManager';

class StuffList {
  constructor(scene, width, height, stuffs) {
    const stuffListHtml = htmlHelper.createStuffListHtml(width, height, stuffs);
    const stuffListDom = scene.add.dom().createFromHTML(stuffListHtml);
    return stuffListDom;
  }
}

export default StuffList;
