export const POPUP_TYPE = {
  DISP_PROFILE: 1,
};

export const DEFAULT_SHOP_ID = 1;

export const PRODUCT_CATEGORIES = {
  LIMITED_TIME: 1,
  BENTO: 2,
  SIDE_DISH_ONLY: 3,
  SIDE_MENU: 4,
  ALL: 5,
};

export const TABS = [
  { id: PRODUCT_CATEGORIES.ALL, name: '全て' },
  { id: PRODUCT_CATEGORIES.LIMITED_TIME, name: '  期間限定商品' },
  { id: PRODUCT_CATEGORIES.BENTO, name: '弁当' },
  { id: PRODUCT_CATEGORIES.SIDE_DISH_ONLY, name: 'おかずのみ' },
  { id: PRODUCT_CATEGORIES.SIDE_MENU, name: 'サイドメニュー' },
];

export const RICE_TYPE = {
  MEDIUM: 1,
  LARGE: 2,
  SMALL: 3,
  MEDIUM_STICKY_BARLEY: 4,
  LARGE_STICKY_BARLEY: 5,
  SMALL_STICKY_BARLEY: 6,
  SALAD: 7,
  NONE: 8,
};
