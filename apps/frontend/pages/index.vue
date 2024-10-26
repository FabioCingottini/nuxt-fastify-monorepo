<template>
  <div class="tasks">
    <h1>Task List</h1>

    <!-- Add Task Form -->
    <TaskForm @task-added="refreshTaskList" />

    <!-- Task List -->
    <TaskList
        :tasks="tasks"
        :status="status"
        :error="error"
        @view-details="openTaskDetails"
        @task-updated="refreshTaskList"
        @task-deleted="refreshTaskList"
    />

    <!-- Task Details Modal -->
    <TaskDetails :task-id="selectedTaskId" :show="showModal" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TaskForm from '@/components/tasks/TaskForm.vue';
import TaskList from '@/components/tasks/TaskList.vue';
import TaskDetails from '@/components/tasks/TaskDetails.vue';

// Fetch tasks in the parent component
const { data: tasks, pending: status, error, refresh } = useFetch('http://127.0.0.1:3001/tasks');

const selectedTaskId = ref(null);
const showModal = ref(false);

function refreshTaskList() {
  refresh();
}

function openTaskDetails(taskId) {
  selectedTaskId.value = taskId;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedTaskId.value = null;
}
</script>

<style scoped>
/* Include your styles or use Tailwind CSS classes */
</style>
