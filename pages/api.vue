<template>
  <div>
    <input type="text" v-model="keyword">
    <button @click="search">検索する</button>

    <ul v-if="searchResults.length">
      <li v-for="book in searchResults" :key="book.id">
        {{ book.title }}
      </li>
    </ul>
    <p v-else>検索結果がありません。</p>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';

const keyword = ref('');
const searchResults = ref([]);

const search = async () => {
  searchResults.value = [];
  const baseUrl = 'https://www.googleapis.com/books/v1/volumes?';
  const params = {
    q: `intitle:${keyword.value}`,
    maxResults: 10
  };
  const queryParams = new URLSearchParams(params)
  console.log(baseUrl + queryParams)

  try {
    const response = await fetch(baseUrl + queryParams).then(response => response.json());
    //const data = await response.json();
    
    for (let book of response.items) {
      let title = book.volumeInfo.title;
      let img = book.volumeInfo.imageLinks;
      let description = book.volumeInfo.description;
      console.log("title" + title)
      searchResults.value.push({
        title: title ? title : '',
        image: img ? img.thumbnail : '',
        description: description ? description.slice(0, 40) : ''
      });
      console.log(book.volumeInfo.title)
    }
    console.log(response.items)
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }

};
</script>
