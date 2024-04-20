<template>
  <div class="flex flex-col items-center">
    <h2>Cats</h2>
    <div v-for="(cat, n) in cats" :key="n" class="flex items-center mb-4">
      <span class="cat mr-2">{{ cat }}</span>
      <button @click="removeCat(n)" class="btn btn-blue">Remove</button>
    </div>

    <p>
      <input v-model="newCat" class="border border-gray-300 px-4 py-2 mr-2">
      <button @click="addCat" class="btn btn-blue">Add Cat</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cats: [],
      newCat: null
    };
  },
  mounted() {
    if (localStorage.getItem('cats')) {
      try {
        this.cats = JSON.parse(localStorage.getItem('cats'));
      } catch(e) {
        localStorage.removeItem('cats');
      }
    }
  },
  methods: {
    addCat() {
      if (!this.newCat) {
        return;
      }

      this.cats.push(this.newCat);
      this.newCat = '';
      this.saveCats();
    },
    removeCat(x) {
      this.cats.splice(x, 1);
      this.saveCats();
    },
    saveCats() {
      const parsed = JSON.stringify(this.cats);
      localStorage.setItem('cats', parsed);
    }
  }
}
</script>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>
