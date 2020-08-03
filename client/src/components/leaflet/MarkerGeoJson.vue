<template>
<q-card>
  <q-bar
    class="bg-primary text-white absolute top-0"
    style="z-index: 1000; width: 100%"
  >
    <div class="text-h6">{{ $t('setDeliveryLocation') }}</div>
    <q-space />
    <q-btn
      v-close-popup
      icon="close"
      dense flat
      @click="$emit('confirm-destine')"
    />
  </q-bar>

  <q-card-section
    style="height: 100vh"
    class="q-pa-none"
  >
    <q-no-ssr>
      <l-map
        ref="refMap"
        :zoom="map.zoom"
        :center="map.latLng"
        @update:center="emitUpdateMap"
        @update:zoom="emitUpdateMap"
      >

        <l-tile-layer
          ref="tileLayer"
          :url="tileLayer.url"
          @tileerror="onTileError"
        />

        <!-- mark btn -->
        <l-control
          v-if="controlBtn"
          position="bottomleft"
        >
          <q-btn
            color="primary"
            icon="fad fa-flag"
            round glossy push
            @click="onClickBtnMarker"
          >
            <q-tooltip
              max-width="8rem"
              max-height="4rem"
              style="white-space: nowrap"
            >
              <div>{{ $t('setMark') }}</div>
            </q-tooltip>
          </q-btn>
        </l-control>

        <!-- confirm btn -->
        <l-control
          v-if="controlBtn"
          position="bottomright"
        >
          <q-btn
            color="primary"
            icon="fas fa-check"
            rounded glossy push
            :label="$t('confirm')"
            @click="$emit('confirm-destine')"
          />
        </l-control>

        <l-marker
          v-if="marker.visible"
          :lat-lng="marker.latLng"
          :options="{
            title: $t('destine.place'),
          }"
          :draggable="marker.draggable"
          @update:lat-lng="onUpdateMarker"
        >
          <l-popup :content="$t('destine.place')" />
        </l-marker>
      </l-map>
    </q-no-ssr>
  </q-card-section>
</q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

/* eslint-disable array-bracket-newline */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export default defineComponent({
  name: 'MarkerGeoJson',

  props: {
    map: {
      type: Object,
      default: () => ({
        latLng: [],
        zoom: 26
      })
    },
    marker: {
      type: Object,
      default: () => ({
        latLng: [],
        visible: false,
        draggable: true
      })
    },
    tileLayer: {
      type: Object,
      default: () => ({
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      })
    },
    controlBtn: {
      type: Boolean, default: false
    }
  },

  methods: {
    setMarkerInvisible () {
      this.marker.visible = false;
    },

    onUpdateMarker ({ lat, lng }) {
      this.$emit('update:marker', { latLng: [lat, lng], visible: true, draggable: true });
    },

    onClickBtnMarker () {
      this.onUpdateMarker(this.$refs.refMap.mapObject.getCenter());
    },

    onTileError () {
      this.$emit('on-tile-error');
    },

    emitUpdateMap () {
      const latLng = this.$refs.refMap.mapObject.getCenter();
      const zoom = this.$refs.refMap.mapObject.getZoom();
      this.$emit('update:map', { latLng, zoom });
    }
  }
});
</script>

<style>
.leaflet-control-zoom {
  top: 30px;
}
</style>
