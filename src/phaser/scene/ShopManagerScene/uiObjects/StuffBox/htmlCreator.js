import * as action from './action';

export const createStuffListHtml = stuffs => {
  return `<div class="stuff-list__main">
      ${stuffs
        .map(stuff => {
          return `
          <div
            class="stuff-list__stuff"
            onclick="(() => {
              event.action='${action.CHANGE_TO_STUFF_INFO_HTML}';
              event.stuffId='${stuff.getStuffId()}';
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
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
      }
      
      .stuff-list__stuff {
        width: 50%;
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

export const createStuffInfoHtml = stuff => {
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
      width: 100%;
      height: 100%;
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

export const createAddStuffHtml = () => {
  return `<div class="add-stuff">
    <div class="add-stuff__back-btn">
      <div
        onclick="(() => {
          event.action='${action.CHANGE_TO_STUFF_LIST_HTML}';
        })()"
      >
        목록으로 돌아가기
      </div>
    </div>
    <div class="add-stuff__image-input add-stuff__input image-input">
      <input type="file" accept="image/*" name="stuffImage" />
    </div>
    <div class="add-stuff__name-input add-stuff__input text-input">
      <input type="text" placeholder="물건 이름" name="stuffName" />
    </div>
    <div class="add-stuff__price-input add-stuff__input text-input">
      <input type="number" placeholder="물건 가격" name="stuffPrice" />
    </div>
    <div
      class="add-stuff__only-adult-checkbox add-stuff__input checkbox-input"
    >
      <input type="checkbox" name="stuffOnlyAdult" />
      <label>어른이랑 거래 할래요</label>
    </div>
    <div class="add-stuff__description-input add-stuff__input text-input">
      <textarea placeholder="물건 설명" name="stuffDescription"></textarea>
    </div>
    <div class="add-stuff__add-stuff-btn add-stuff__input">
      <input
        type="submit"
        value="물건 추가하기"
        name="addStuff"
        onclick="(() => {
          event.action='${action.ADD_STUFF}';
        })()"
      />
    </div>
  </div>
  <style type="text/css">
    /* Remove number input arrow for Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    /* Remove number input arrow for Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }
    
    .add-stuff {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
    
    .add-stuff__back-btn {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .add-stuff__back-btn > div{
      cursor: pointer
    }

    .add-stuff__input {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    
    .add-stuff__name-input > input,
    .add-stuff__price-input > input {
      width: 30%;
      text-align: center;
    }
    
    .add-stuff__description-input {
      height: 50%;
    }
    
    .add-stuff__description-input > textarea {
      resize: none;
      width: 80%;
      height: 100%;
    }  
  </style>`;
};

export const createUpdateStuffHtml = stuff => {
  return `<div class="update-stuff">
    <div class="update-stuff__back-btn">
      <div
        onclick="(() => {
          event.action='${action.CHANGE_TO_STUFF_LIST_HTML}';
        })()"
      >
        목록으로 돌아가기
      </div>
    </div>
    <div class="update-stuff__image-input update-stuff__input image-input">
      <input type="file" accept="image/*" name="stuffImage" />
    </div>
    <div class="update-stuff__name-input update-stuff__input text-input">
      <input type="text" placeholder="물건 이름" name="stuffName" value="${stuff.getName()}" />
    </div>
    <div class="update-stuff__price-input update-stuff__input text-input">
      <input type="number" placeholder="물건 가격" name="stuffPrice" value="${stuff.getPrice()}" />
    </div>
    <div
      class="update-stuff__only-adult-checkbox update-stuff__input checkbox-input"
    >
      <input type="checkbox" name="stuffOnlyAdult" ${stuff.getOnlyAdult() ? 'checked' : ''} />
      <label>어른이랑 거래 할래요</label>
    </div>
    <div class="update-stuff__description-input update-stuff__input text-input">
      <textarea placeholder="물건 설명" name="stuffDescription">${stuff.getDescription()}</textarea>
    </div>
    <div class="update-stuff__update-stuff-btn update-stuff__input">
      <input
        type="submit"
        value="물건 수정하기"
        name="updateStuff"
        onclick="(() => {
          event.action='${action.UPDATE_STUFF}';
          event.stuffId='${stuff.getStuffId()}';
        })()"
      />
    </div>
  </div>
  <style type="text/css">
    /* Remove number input arrow for Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    /* Remove number input arrow for Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }
    
    .update-stuff {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
    
    .update-stuff__back-btn {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .update-stuff__back-btn > div{
      cursor: pointer
    }

    .update-stuff__input {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    
    .update-stuff__name-input > input,
    .update-stuff__price-input > input {
      width: 30%;
      text-align: center;
    }
    
    .update-stuff__description-input {
      height: 50%;
    }
    
    .update-stuff__description-input > textarea {
      resize: none;
      width: 80%;
      height: 100%;
    }  
  </style>`;
};

export const createShopAdminStuffListHtml = stuffs => {
  return `<div class="stuff-list__main">
      ${stuffs
        .map(stuff => {
          return `
          <div
            class="stuff-list__stuff"
            onclick="(() => {
              event.action='${action.CHANGE_TO_STUFF_INFO_HTML}';
              event.stuffId='${stuff.getStuffId()}';
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
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
      }
      
      .stuff-list__stuff {
        width: 50%;
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

export const createShopAdminStuffInfoHtml = stuff => {
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
      <div class="stuff-info__footer">
        <div class="stuff-info__update-btn">
          <input
            type="submit"
            value="물건 수정하기"
            name="updateStuff"
            onclick="(() => {
              event.action='${action.CHANGE_TO_UPDATE_STUFF_HTML}';
              event.stuffId='${stuff.getStuffId()}';
            })()"
          />
        </div>
        <div class="stuff-info__remove-btn">
          <input
            type="submit"
            value="물건 삭제"
            name="removeStuff"
            onclick="(() => {
              event.action='${action.REMOVE_STUFF}';
              event.stuffId='${stuff.getStuffId()}';
            })()"
          />
        </div>
      </div>
    </div>
    <style type="text/css">
      .stuff-info {
        width: 100%;
        height: 100%;
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
      
      .stuff-info__footer {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    </style>`;
};
