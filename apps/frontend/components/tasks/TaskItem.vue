<template>
  <li>
    <!-- Editing Mode -->
    <div v-if="isEditing">
      <div class="form-group">
        <label>Title:</label>
        <input v-model="editedTitle" required/>
      </div>
      <div class="form-group">
        <label>Description:</label>
        <input v-model="editedDescription" required/>
      </div>
      <button @click="updateTask" class="save-btn">Save</button>
      <button @click="cancelEdit" class="cancel-btn">Cancel</button>
    </div>
    <!-- Display Mode -->
    <div v-else>
      <strong>{{ task.title }}</strong>: {{ task.description }}
      <button @click="viewDetails" class="details-btn">Details</button>
      <button @click="startEditing" class="edit-btn">Edit</button>
      <button @click="deleteTask" class="delete-btn">Delete</button>
    </div>
  </li>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['task-updated', 'task-deleted', 'view-details']);

const isEditing = ref(false);
const editedTitle = ref(props.task.title);
const editedDescription = ref(props.task.description);

function startEditing() {
  isEditing.value = true;
  editedTitle.value = props.task.title;
  editedDescription.value = props.task.description;
}

function cancelEdit() {
  isEditing.value = false;
}

async function updateTask() {
  try {
    const updatedData = {
      title: editedTitle.value,
      description: editedDescription.value,
    };
    await $fetch(`http://127.0.0.1:3001/tasks/${props.task.id}`, {
      method: 'PUT',
      body: updatedData,
    });
    isEditing.value = false;
    emit('task-updated');
  } catch (err) {
    console.error('Error updating task:', err);
    alert('Failed to update task. Please try again.');
  }
}

async function deleteTask() {
  if (confirm('Are you sure you want to delete this task?')) {
    try {
      await $fetch(`http://127.0.0.1:3001/tasks/${props.task.id}`, {
        method: 'DELETE',
      });
      emit('task-deleted');
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task. Please try again.');
    }
  }
}

function viewDetails() {
  emit('view-details', props.task.id);
}
</script>

<style scoped>
/* Existing styles remain unchanged */

/* Add styles for the Details button */
.details-btn {
}

.details-btn:hover {
}
</style>
