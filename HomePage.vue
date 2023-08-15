<script>
import { mapActions, mapState } from 'pinia'
import { useRenderArticleStore, useRenderCategoryStore } from '../stores/counter'
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'

export default {
  name: 'HomePage',
  data() {
    return {
      dataSearch: {
        title: ''
      }
    }
  },
  components: {
    Navbar,
    Card
  },
  computed: {
    ...mapState(useRenderArticleStore, ['articles', 'totalPage', 'isFavorite']),
    ...mapState(useRenderCategoryStore, ['category'])
  },
  methods: {
    ...mapActions(useRenderArticleStore, ['renderArticle', 'renderSearch']),
    ...mapActions(useRenderCategoryStore, ['renderCategory'])
  },
  created() {
    this.renderArticle()
    this.renderCategory()
  }
}
</script>

<template>
  <Navbar />
  <div class="mx-auto mt-8">
    <form class="flex justify-end">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-50">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          class="flex justify-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
          v-model="this.dataSearch.title"
        />
      </div>
      <button
        type="submit"
        class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click.prevent="renderSearch(this.dataSearch.title)"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span class="sr-only">Search</span>
      </button>
    </form>
    <!-- filter dropdown -->
    <div class="dropdown flex justify-end mt-2">
      <label tabindex="0" class="btn m-1">Filter</label>
      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a @click.prevent="renderArticle()">All Post</a></li>
        <li>
          <a
            v-for="(data, index) in category"
            :key="data.id"
            @click.prevent="renderArticle(1, data.id)"
            >{{ data.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
  <!-- card 1 -->
  <!-- <div class="container mx-2 mt-8"> -->
  <div class="flex flex-wrap gap-4 items-center">
    <Card v-for="data in articles" :key="data.id" :data="data" :isFavorite="this.isFavorite" />
  </div>
  <br />
  <!-- pagination -->
  <div class="fixed bottom-1 right-5 join">
    <button
      class="join-item btn"
      v-for="(tp, index) in totalPage"
      :key="tp.id"
      @click.prevent="renderArticle(tp)"
    >
      {{ tp }}
    </button>
  </div>
</template>

<style scoped></style>
