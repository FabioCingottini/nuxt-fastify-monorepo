<template>
  <form @submit.prevent="addTask" class="task-form">
    <div class="form-group">
      <label for="title">Title:</label>
      <input v-model="newTitle" id="title" required />
    </div>
    <div class="form-group">
      <label for="description">Description:</label>
      <input v-model="newDescription" id="description" required />
    </div>
    <button type="submit">Add Task</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const newTitle = ref('');
const newDescription = ref('');

const emit = defineEmits(['task-added']);

async function addTask() {
  try {
    await $fetch('http://127.0.0.1:3001/tasks', {
      method: 'POST',
      body: {
        title: newTitle.value,
        description: newDescription.value,
      },
    });
    newTitle.value = '';
    newDescription.value = '';
    emit('task-added');
  } catch (err) {
    console.error('Error adding task:', err);
    alert('Failed to add task. Please try again.');
  }
}
</script>

<style scoped>
/* Include your styles or use Tailwind CSS classes */
</style>
