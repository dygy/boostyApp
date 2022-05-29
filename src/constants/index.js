import {API_URL, WS_URL} from '@env';
export const API_BASE_URL = API_URL ? API_URL : 'http://127.0.0.1:3000/api/';
console.log('check env', API_BASE_URL);
export const WS_BASE_URL = WS_URL ? WS_URL : 'ws://127.0.0.1:3000/ws/';
export const DADATA_TOKEN = '';
export const GET_STAYS = '/stays/';
export const GET_STAY = '/stays/:id/';
export const POST_STAY_BY_CODE = '/stays/create_by_hotel_code/';

export const GET_NOTIFICATIONS = '/notifications/';
export const REMOVE_NOTIFICATION = '/notifications/:id/remove/';

export const GET_CONVERSATIONS = '/conversations/';
export const GET_CONVERSATION = '/conversations/:id/';
export const CLOSE_CONVERSATION = '/conversations/:id/close/';
export const REMOVE_CONVERSATION = '/conversations/:id/remove/';

export const GET_SAFETY = '/safety/:id/';

export const GET_PROFILE = '/profile/';

export const GET_ORDERS = '/service_orders/detailed/';
export const POST_ORDER = '/service_orders/';
export const GET_ORDER = '/service_orders/:id/';
export const GET_ORDER_STATUSES = '/service_orders/statuses/';

export const GET_SERVICES = '/services/';
export const GET_SERVICE = '/services/:id/';
export const GET_GEO_LEVELS = '/services/geo_levels/';

export const GET_CATEGORIES = '/categories/';
export const GET_CATEGORY = '/categories/:id/';

export const POST_TOKEN = '/devices/register/';

export const GET_MENUS = '/menus/';
export const GET_MENU_ITEMS = '/menu_items/';

export const GET_HOTELS = '/hotels/';

export const GET_MESSAGES_TYPES = '/messages/types/';

export const GET_CONFIG = '/config/';
export const GET_LANGUAGES = '/config/langs/';

export const GET_HOTEL_PICS = '/images/hotel/:id/';
export const GET_ROOM_PICS = '/images/room/:id/';

export const GET_CITY_CATEGORIES = '/content/sights-categories/';
export const GET_CITY_ITEMS = '/content/sights/';
export const GET_CITY_ITEM = '/content/sights/:id/'

export const GET_SAFETY_CATEGORIES = '/content/safety-categories/';
export const GET_SAFETY_ITEMS = '/content/safety/';
export const GET_SAFETY_ITEM = '/content/safety/:id/'