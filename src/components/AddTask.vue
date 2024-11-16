<template>
  <div class="add-task">
    <input
      type="text"
      v-model="title"
      placeholder="Enter task title"
      @keyup.enter="submitTask"
    />
    <select v-model="priority">
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <button @click="submitTask">Add Task</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Task } from "../types";

export default defineComponent({
  name: "AddTask",
  emits: ["add-task"],
  setup(_, { emit }) {
    const title = ref("");
    const priority = ref("low");

    const submitTask = () => {
      if (!title.value.trim()) return;
      emit("add-task", {
        id: Date.now(),
        title: title.value.trim(),
        priority: priority.value,
        completed: false,
      } as Task);
      title.value = "";
      priority.value = "low";
    };

    return { title, priority, submitTask };
  },
});
</script>

<style scoped>
.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-task input,
.add-task select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-task button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.add-task button:hover {
  background-color: #218838;
}
</style>
