export const createStuffListHtml = stuffList => {
  return `<div class="stuff-list__main">
      ${stuffList
        .map(stuff => {
          return `<div class="stuff-list__stuff">
            <div class="stuff-list__stuff-img">
            <img src="${stuff.getThumbNail()}" />
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
        width: 990px;
        height: 680px;
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
        height: 300px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
      }
      
      .stuff-list__stuff-img > img {
        width: 450px;
        height: 300px;
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
