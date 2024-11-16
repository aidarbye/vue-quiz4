<template>
  <div id="app">
    <h1>To-Do List</h1>
    <AddTask @add-task="addTask" />
    <div class="filter-options">
      <label
        v-for="option in filterOptions"
        :key="option.value"
        class="filter-button"
        :class="{ active: filter === option.value }"
        @click="filter = option.value"
      >
        {{ option.label }}
      </label>
    </div>
    <transition-group name="fade" tag="ul" class="task-list">
      <TodoList
        :tasks="filteredTasks"
        @delete-task="deleteTask"
        @toggle-task="toggleTaskCompletion"
        @update-priority="updateTaskPriority"
      />
    </transition-group>
    <p class="task-summary">Pending Tasks: {{ pendingTaskCount }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from "vue";
import AddTask from "./components/AddTask.vue";
import TodoList from "./components/TodoList.vue";
import type { Task } from "./types";

export default defineComponent({
  name: "App",
  components: { AddTask, TodoList },
  setup() {
    const tasks = ref<Task[]>([]);
    const filter = ref<string>("all");

    const addTask = (newTask: Task) => {
      tasks.value.push(newTask);
      nextTick(() => {
        const lastTask = document.querySelector(".task-list li:last-child");
        lastTask?.scrollIntoView({ behavior: "smooth" });
      });
    };

    const deleteTask = (id: number) => {
      tasks.value = tasks.value.filter((task) => task.id !== id);
    };

    const toggleTaskCompletion = (id: number) => {
      const task = tasks.value.find((t) => t.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    };

    const updateTaskPriority = (id: number, newPriority: "high" | "medium" | "low") => {
      const task = tasks.value.find((t) => t.id === id);
      if (task) {
        task.priority = newPriority;
      }
    };

    const filteredTasks = computed(() => {
      const priorities = { high: 1, medium: 2, low: 3 };
      const sortedTasks = [...tasks.value].sort(
        (a, b) => priorities[a.priority] - priorities[b.priority]
      );

      if (filter.value === "completed") {
        return sortedTasks.filter((task) => task.completed);
      }
      if (filter.value === "incomplete") {
        return sortedTasks.filter((task) => !task.completed);
      }
      return sortedTasks;
    });

    const pendingTaskCount = computed(() =>
      tasks.value.filter((task) => !task.completed).length
    );

    const filterOptions = [
      { label: "All", value: "all" },
      { label: "Completed", value: "completed" },
      { label: "Incomplete", value: "incomplete" },
    ];

    return {
      tasks,
      filter,
      addTask,
      deleteTask,
      toggleTaskCompletion,
      updateTaskPriority,
      filteredTasks,
      pendingTaskCount,
      filterOptions,
    };
  },
});
</script>

<style>
#app {
  font-family: "Arial", sans-serif;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  color: #333;
}

h1 {
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 20px;
}

.filter-options {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.filter-button {
  padding: 10px 20px;
  border-radius: 20px;
  background: #f0f0f0;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.filter-button.active {
  font-weight: bold;
}

.filter-button:nth-child(1).active {
  color: #007bff;
}

.filter-button:nth-child(2).active {
  color: #28a745;
}

.filter-button:nth-child(3).active {
  color: #dc3545;
}

.task-summary {
  margin-top: 20px;
  font-size: 1.2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
