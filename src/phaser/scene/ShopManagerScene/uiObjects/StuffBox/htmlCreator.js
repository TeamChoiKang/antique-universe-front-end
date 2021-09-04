import * as action from './action';

export const createStuffListHtml = (width, height, stuffs) => {
  return `<div class="stuff-list__main">
      ${stuffs
        .map(stuff => {
          return `
          <div
            class="stuff-list__stuff"
            onclick="(() => {
              event.action='${action.CHANGE_TO_STUFF_INFO_HTML}';
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
        cursor: pointer;
      }

      .stuff-list__stuff-img {
        width: 100%;
        height: 88%;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .stuff-list__stuff-img > img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
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

export const createShopAdminStuffListHtml = (width, height, stuffs) => {
  return `<div class="stuff-list__main">
      ${stuffs
        .map(stuff => {
          return `
          <div
            class="stuff-list__stuff"
            onclick="(() => {
              event.action='${action.CHANGE_TO_STUFF_INFO_HTML}';
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
        <div
          class="stuff-list__stuff stuff-list__add-stuff"
          onclick="(() => {
            event.action='${action.CHANGE_TO_ADD_STUFF_HTML}';
          })()"
        >
          <div>+</div>
        </div>
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
        cursor: pointer;
      }

      .stuff-list__stuff-img {
        width: 100%;
        height: 88%;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .stuff-list__stuff-img > img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
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

      .stuff-list__add-stuff {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10rem;
      }
    </style>`;
};

export const createStuffInfoHtml = (width, height, stuff) => {
  return `<div class="stuff-info">
    <div class="stuff-info__head">
      <div
        class="stuff-info__back-btn"
        onclick="(() => {
          event.action='${action.CHANGE_TO_STUFF_LIST_HTML}';
        })()"
      >
        목록으로 돌아가기
      </div>
    </div>
    <div class="stuff-info__body">
      <div class="stuff-info__stuff-img">
        <img src="${stuff.getImageUrl()}" />
      </div>
      <div class="stuff-info__stuff-name">${stuff.getName()}</div>
      <div class="stuff-info__stuff-price">${stuff.getPrice()}</div>
      <div class="stuff-info__stuff-description">${stuff.getDescription()}</div>
    </div>
  </div>
  <style type="text/css">
    .stuff-info {
      width: ${width}px;
      height: ${height}px;
      background: white;
      overflow-y: scroll;
    }
    
    .stuff-info__head {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .stuff-info__back-btn {
      cursor: pointer
    }

    .stuff-info__body {
      width: 100%;
    }
    
    .stuff-info__stuff-img {
      width: 100%;
      height: 500px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .stuff-info__stuff-img > img {
      width: auto;
      height: auto;
      max-width: 70%;
      max-height: 100%;
    }
    
    .stuff-info__stuff-name {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    
    .stuff-info__stuff-price {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    
    .stuff-info__stuff-description {
      padding-left: 10%;
      padding-right: 10%;
      margin-bottom: 20px;
    }
  </style>`;
};
