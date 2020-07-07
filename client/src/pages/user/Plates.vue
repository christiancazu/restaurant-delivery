<template>
<q-page
  padding
>
  <q-card
    style="min-height: 100vh"
    class="bg-grey-1"
    bordered
  >
    <div class="text-h6 text-center q-py-md">
      <q-icon name="fad fa-utensils-alt" /> Platillos
    </div>

    <q-separator inset />

    <q-card-section v-if="!loading">
      <q-carousel
        v-model="slide"
        swipeable
        animated
        arrows
        :fullscreen.sync="fullscreen"
        infinite
      >
        <q-carousel-slide
          v-for="(plate) in plates" :key="plate.id"
          :name="plate.id"
          :img-src="`${PATH_MEDIA}/${plate.avatar}`"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2 text-white text-center">{{ plate.name }}</div>
            <div class="text-subtitle1 text-white text-center">{{ plate.type.name }}</div>
          </div>
        </q-carousel-slide>

        <template v-slot:control>
          <q-carousel-control
            position="bottom-right"
            :offset="[18, 18]"
          >
            <q-btn
              push round dense color="white" text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="fullscreen = !fullscreen"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </q-card-section>
  </q-card>
</q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { useQuery, useResult } from '@vue/apollo-composable';
import { PLATES_QUERY } from '@core/graphql/querys/plates.query';

const PATH_MEDIA = process.env.URL_MEDIA.replace(/"/g, '');

export default defineComponent({
  data () {
    return {
      slide: 1,
      fullscreen: false
    };
  },

  setup () {
    const { result, loading } = useQuery(PLATES_QUERY);
    const plates = useResult(result);

    computed(() => console.warn(plates.value));

    return {
      plates,
      loading,
      PATH_MEDIA
    };
  }

});
</script>
