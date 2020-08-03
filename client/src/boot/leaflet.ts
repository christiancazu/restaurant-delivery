import Vue from 'vue';

import {
  LMap,
  LTileLayer,
  LMarker,
  LControl,
  LPopup
} from 'vue2-leaflet';

import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete Icon.Default.prototype._getIconUrl;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-control', LControl);
Vue.component('l-popup', LPopup);
