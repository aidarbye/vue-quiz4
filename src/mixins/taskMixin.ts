import type { Task } from "@/types";

export default {
  methods: {
    filterTasks(tasks: Task[], filter: string): Task[] {
      if (filter === "completed") {
        return tasks.filter((task) => task.completed);
      } else if (filter === "incomplete") {
        return tasks.filter((task) => !task.completed);
      }
      return tasks;
    },
  },
  watch: {
    tasks: {
      deep: true,
      handler(newTasks: Task[]) {
        console.log("Tasks updated:", newTasks);
      },
    },
  },
};
