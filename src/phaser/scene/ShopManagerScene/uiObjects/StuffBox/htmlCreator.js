import * as action from './action';

export const createStuffListHtml = (width, height, stuffs) => {
  return `<div class="stuff-list__main">
      ${stuffs
        .map(stuff => {
          return `
          <div
            class="stuff-list__stuff"
            onclick="(() => {
              event.action='${action.SHOW_STUFF_INFO}';
              event.stuffId=${stuff.getStuffId()};
            })()"
          >
            <div class="stuff-list__stuff-img">
              <img src="${stuff.getImageUrl()}" />
            </div>
            <div class="stuff-list__stuff-info">
              <div class="stuff-list__stuff-name">${stuff.getName()}</div>
              <div class="stuff-list__stuff-price">${stuff.getPrice()}</div>
            </div>
          </div>`;
        })
        .join('')}
    </div>
    <style type="text/css">
      .stuff-list__main {
        width: ${width}px;
        height: ${height}px;
        background: white;
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
      }
      
      .stuff-list__stuff {
        width: 480px;
        height: 340px;
      }

      .stuff-list__stuff-img {
        width: 100%;
        height: 88%;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
      }
      
      .stuff-list__stuff-img > img {
        width: 100%;
        height: 100%;
      }

      .stuff-list__stuff-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .stuff-list__stuff-name {
        padding-left: 22px;
      }
      
      .stuff-list__stuff-price {
        padding-right: 22px;
      }
    </style>`;
};

export const createStuffInfoHtml = (width, height, stuff) => {
  return `<div class="stuff-info__main">
    ${stuff.getName()}
  </div>
  <style type="text/css">
    .stuff-info__main {
      width: ${width}px;
      height: ${height}px;
      background: white;
      overflow-y: scroll;
    }
  </style>`;
};