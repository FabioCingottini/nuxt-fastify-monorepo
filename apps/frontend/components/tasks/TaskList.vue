<template>
  <div>
    <!-- Loading and Error States -->
    <div v-if="status === 'pending'">Loading tasks...</div>
    <div v-else-if="error">Error fetching tasks: {{ error.message }}</div>
    <!-- Display Tasks -->
    <ul v-else>
      <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @task-updated="onTaskUpdated"
          @task-deleted="onTaskDeleted"
          @view-details="onViewDetails"
      />
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import TaskItem from './TaskItem.vue';

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  error: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(['view-details', 'task-updated', 'task-deleted']);

function onViewDetails(taskId) {
  emit('view-details', taskId);
}

function onTaskUpdated() {
  emit('task-updated');
}

function onTaskDeleted() {
  emit('task-deleted');
}
</script>

<style scoped>
/* Include your styles or use Tailwind CSS classes */
</style>
