<script>
import { mapActions, mapState } from 'pinia'
import { useDetailArticleStore } from '../stores/counter'
export default {
  name: 'Card',
  props: ['data', 'isFavorite'],
  methods: {
    ...mapActions(useDetailArticleStore, ['detailArticle'])
  }
}
</script>

<template>
  <!-- <div class="flex flex-wrap gap-4 ml-10 mt-5"> -->
  <div class="card card-compact w-96 bg-base-100 shadow-xl">
    <figure>
      <img :src="data.imgUrl" class="h-200 w-300" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ data.title }}</h2>
      <p>{{ data.content }}</p>
      <div class="card-actions justify-end">
        <button
          class="btn btn-primary"
          @click.prevent="detailArticle(data.id)"
          v-if="this.isFavorite === false"
        >
          Detail
        </button>
        <!-- <button
            class="btn btn-primary"
            @click.prevent="deletefav(data.id)"
            v-if="this.isFavorite === true"
          >
            Remove
          </button> -->
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped></style>
