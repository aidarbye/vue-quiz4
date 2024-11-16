<template>
  <transition-group name="list" tag="ul" class="task-list">
    <li
      v-for="task in tasks"
      :key="task.id"
      :class="['task', task.priority, { completed: task.completed }]"
    >
      <div class="task-info">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggleTaskCompletion(task.id)"
        />
        <span
          class="task-title"
          :class="{
            'text-completed': task.completed,
            'text-incomplete': !task.completed,
          }"
        >
          {{ task.title }}
        </span>
        <select
          class="task-priority"
          :value="task.priority"
          @change="updateTaskPriority(task, $event)"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button @click="deleteTask(task.id)" class="delete-btn">Delete</button>
    </li>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { type Task } from "../types";

export default defineComponent({
  name: "TodoList",
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
    },
  },
  emits: ["delete-task", "toggle-task", "update-priority"],
  methods: {
    deleteTask(id: number) {
      this.$emit("delete-task", id);
    },
    toggleTaskCompletion(id: number) {
      this.$emit("toggle-task", id);
    },
    updateTaskPriority(task: Task, event: Event) {
      const newPriority = (event.target as HTMLSelectElement).value;
      this.$emit("update-priority", task.id, newPriority);
    },
  },
});
</script>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  transition: transform 0.3s, background-color 0.3s;
}

.task.completed {
  background-color: #e0e0e0;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-title.text-completed {
  color: green;
  text-decoration: none;
}

.task-title.text-incomplete {
  color: red;
}

.task-priority {
  padding: 5px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d9363e;
}
</style>
