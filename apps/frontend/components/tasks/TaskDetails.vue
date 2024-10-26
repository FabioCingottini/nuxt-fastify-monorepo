<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2>Task Details</h2>
      <div v-if="status === 'loading'">Loading task details...</div>
      <div v-else-if="error">Error fetching task details: {{ error.message }}</div>
      <div v-else>
        <p><strong>Title:</strong> {{ taskDetails.title }}</p>
        <p><strong>Description:</strong> {{ taskDetails.description }}</p>
        <!-- Additional details can be displayed here -->
      </div>
      <button @click="close" class="close-btn">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  taskId: {
    type: [String, Number],
    required: false,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);

const taskDetails = ref({});
const status = ref('idle');
const error = ref(null);

watch(
    () => props.taskId,
    async (newTaskId) => {
      if (props.show && newTaskId) {
        await fetchTaskDetails(newTaskId);
      }
    },
    { immediate: true }
);

async function fetchTaskDetails(taskId) {
  status.value = 'loading';
  error.value = null;
  try {
    const data = await $fetch(`http://127.0.0.1:3001/tasks/${taskId}`);
    taskDetails.value = data;
    status.value = 'loaded';
  } catch (err) {
    console.error('Error fetching task details:', err);
    error.value = err;
    status.value = 'error';
  }
}

function close() {
  emit('close');
}
</script>

<style scoped>
/* Include modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.close-btn {
  margin-top: 15px;
  background-color: #95a5a6;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #7f8c8d;
}
</style>
