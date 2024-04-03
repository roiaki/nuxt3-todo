<template>
  <NuxtLayout>
    <div class="content-wrapper">
      <form @submit.prevent="addTask">      
        <div class="flex items-center" style="margin-top: 100px;">
          <input 
            v-model="newTask" 
            name="newTask" 
            autocomplete="off" 
            type="text" 
            id="first_name" 
            class="todo-input"
            placeholder="TODO" 
            required 
            style="width: 700px;"
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style="width: 150px; margin-left: 20px;">
            追加
          </button>
        </div>
      </form>
      <div class="table-container">
        <table class="tasktable" v-if="tasks.length > 0">
          <thead>
            <tr>
              <th style="width: 70%;">タスク</th>
              <th style="width: 30%;">アクション</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key="task">
              <td>
                <span v-if="isEditing || editIndex !== index">{{ index }}</span>
                <br>
                <br>
                <span v-if="isEditing || editIndex !== index">{{ task }}</span>
              </td>
              <td>
                <button
                  type="button"
                  class="delete-button"
                  @click="deleteTask(index)"
                >
                  削除
                </button>
                <button
                  type="button"
                  class="edit-button"
                  @click="openEditModal(index)"
                >
                  編集
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-tasks-message">
          <p>TODOデータはありません</p>
        </div>
      </div>

      <div class="button-right">
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          @click="clearTask"
          style="margin-top: 10px;"
          v-if="tasks.length > 0">
          全てをクリア
        </button>
      </div>
   
      <!-- 編集用のモーダル -->
      <div v-if="isEditing" class="modal">
        <div class="modal-content">
          <h1 style="margin-bottom: 20px; font-size: 1.2rem; font-weight: bold;">TODOを編集する</h1>

          <input
            v-model="editedTask"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="TODO"
            required
            style="width: 300px;"
            type="text"
          />
          <div class="flex justify-center" style="margin-top: 130px;">
            <button
              @click="saveEditedTask"
              style="margin-right: 10px;"
              class="rounded-lg bg-blue-500 text-white px-5 py-2.5 text-center text-sm font-medium shadow-sm transition-all hover:bg-blue-700 focus:ring focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
              保存
            </button>
            <button
              @click="closeModal"
              class="rounded-lg bg-red-500 text-white px-5 py-2.5 text-center text-sm font-medium shadow-sm transition-all hover:bg-red-700 focus:ring focus:ring-red-300 disabled:cursor-not-allowed disabled:bg-red-300"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<style scoped>
.content-wrapper {
  width: 50%;
  margin: 0 auto; /* 左右に中央寄せするために追加 */
}

.todo-input {
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  color: #111827;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.625rem;
}
.todo-input:focus {
  outline: none; /* フォーカス時の枠線を非表示にする */
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.5); /* フォーカス時の影を追加 */
}
.todo-input.dark {
  background-color: #374151;
  border-color: #4b5563;
  color: #d1d5db;
  placeholder-color: #9ca3af;
}
.clear-button {
  margin-top: 50px;
}
.button-right {
  text-align: right;
}
.tasktable{
  margin-top: 80px;
}
.no-tasks-message {
  text-align: center; /* テキストを中央に配置 */
  font-size: 30px;
  margin-top: 200px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
button {
  cursor: pointer;
}
.delete-button {
  outline: none;
  text-decoration: none;
  color: white;
  background-color: #DC2626;
  transition: background-color 0.3s ease;
  font-weight: 500;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  padding: 0.625rem 1.25rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.delete-button:hover {
  background-color: #C53030;
}

.delete-button:focus {
  ring: 4px;
  ring-color: #EF4444;
}

.edit-button {
  outline: none;
  text-decoration: none;
  color: #4B5563; /* text-gray-900 */
  background-color: #FFFFFF; /* bg-white */
  border: 1px solid #D1D5DB; /* border border-gray-300 */
  transition: background-color 0.3s ease;
  font-weight: 500;
  border-radius: 0.375rem; /* rounded-lg */
  font-size: 0.875rem; /* text-sm */
  padding: 0.625rem 1.25rem; /* px-5 py-2.5 */
  margin-right: 0.5rem; /* me-2 */
  margin-bottom: 0.5rem; /* mb-2 */
}

.edit-button:hover {
  background-color: #F3F4F6; /* hover:bg-gray-100 */
}

.edit-button:focus {
  ring: 4px;
  ring-color: #E5E7EB; /* focus:ring-gray-100 */
}

.edit-button.dark {
  color: #FFFFFF; /* dark:text-white */
  background-color: #374151; /* dark:bg-gray-800 */
  border-color: #374151; /* dark:border-gray-600 */
}

.edit-button.dark:hover {
  background-color: #1F2937; /* dark:hover:bg-gray-700 */
}

.edit-button.dark:focus {
  ring-color: #374151; /* dark:focus:ring-gray-700 */
}

.edit-modal {
  width: 400px; /* 幅を変更 */
  height: 200px; /* 高さを変更 */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* モーダルのスタイル */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(50, 50, 50, 0.5);  /* 青色の背景 */
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  /* モーダルの幅と高さを設定 */
  width: 500px;
  height: 300px;
}

</style>

<script setup>
import { ref } from 'vue'
const isModalOpen = ref(false);
const editIndex   = ref(-1);
const isEditing   = ref(false);
const editedTask  = ref('');
const newTask = ref('')

const tasks = useCookie(
  'tasks',
  {
    default: () => []
  }
);

// TODO追加
function addTask() {
  if(newTask.value.length >= 1) {
    tasks.value.push(newTask.value)
  }
  newTask.value = ''
};

// 編集用のモーダルを開く
const openEditModal = (index) => {
  isEditing.value  = true;
  editIndex.value  = index;
  editedTask.value = tasks.value[index];
};

// 編集を保存する
const saveEditedTask = () => {
  tasks.value[editIndex.value] = editedTask.value;
  closeModal();
};

// キャンセルで編集用のモーダルを閉じる
const closeModal = () => {
  isEditing.value   = false;
  editIndex.value   = -1;
  editedTask.value  = '';
  isModalOpen.value = false
};

// TODO削除
function deleteTask(index) {
  tasks.value.splice(index, 1)
};

// クリアボタンで全て削除
function clearTask() {
  tasks.value = []
};

</script>


