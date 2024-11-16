<template>
  <li class="task-item">
    <div :class="['task-content', { completed: task.completed }]">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="toggleTask(task.id)"
      />
      <span
        class="task-title"
        contenteditable
        @blur="updateTaskTitle(task.id, $event)"
      >
        {{ task.title }}
      </span>
      <select
        class="task-priority"
        :value="task.priority"
        @change="updateTaskPriority(task.id, $event)"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    <button @click="deleteTask(task.id)" class="delete-btn">Delete</button>
  </li>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { type Task } from "../types";

export default defineComponent({
  name: "TodoList",
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  emits: ["delete-task", "toggle-task", "update-priority", "update-title"],
  methods: {
    deleteTask(id: number) {
      this.$emit("delete-task", id);
    },
    toggleTask(id: number) {
      this.$emit("toggle-task", id);
    },
    updateTaskPriority(id: number, event: Event) {
      const newPriority = (event.target as HTMLSelectElement).value;
      this.$emit("update-priority", id, newPriority);
    },
    updateTaskTitle(id: number, event: FocusEvent) {
      const newTitle = (event.target as HTMLElement).innerText.trim();
      this.$emit("update-title", id, newTitle);
    },
  },
});
</script>

<style scoped>
.task-item {
  list-style: none;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.task-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-content.completed .task-title {
  text-decoration: line-through;
  color: gray;
  opacity: 0.6;
}

.task-priority {
  padding: 5px;
  font-size: 0.9rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #d9363e;
}
</style>
