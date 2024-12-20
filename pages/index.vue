<template>
  <section class="kanban">
    <KanbanHeader
      :dataTasks="tasks"
      @update-query="queryHandler"
      @getFilter="getFilter"
    ></KanbanHeader>
    <KanbanKanbanella :dataTasks="tasksAfterSearchAndFilter"></KanbanKanbanella>
  </section>
</template>

<script setup>
import KanbanHeader from "@/components/kanban/header.vue";
import KanbanKanbanella from "@/components/kanban/kanbanella.vue";
import { ref, computed, onMounted } from "vue";

definePageMeta({
  middleware: "auth",
});

const query = ref("");
const filter = ref({
  responseId: 0,
  dateFrom: 0,
  dateTo: 0,
});
const tasks = ref([]);

const queryHandler = (param) => {
  query.value = param;
};
const tasksAfterSearch = computed(() => {
  if (query.value.trim() === "") {
    return [...tasks.value];
  }
  return tasks.value.map((status) => {
    const filteredTasks = status.items.filter((task) =>
      task.title.toLowerCase().includes(query.value.toLowerCase())
    );
    return {
      code: status.code,
      title: status.title,
      items: filteredTasks,
    };
  });
});

const getFilter = (param) => {
  filter.value = param;
};

const tasksAfterSearchAndFilter = computed(() => {
  return tasksAfterSearch.value.map((status) => {
    if (
      filter.value.responseId === 0 &&
      filter.value.dateFrom === 0 &&
      filter.value.dateTo === 0
    ) {
      return status;
    }

    const filteredTasks = status.items.filter((task) => {
      if (
        filter.value.responseId !== 0 &&
        task.performer.id !== filter.value.responseId
      ) {
        return false;
      }

      if (!filter.value.dateFrom && !filter.value.dateFrom) {
        return true;
      }

      const dateFrom =
        filter.value.dateFrom || Math.floor(new Date().getTime() / 1000);
      const dateTo =
        filter.value.dateTo || Math.floor(new Date().getTime() / 1000);

      if (dateFrom <= task.created_at && task.created_at <= dateTo) {
        return true;
      }

      return false;
    });

    return {
      code: status.code,
      title: status.title,
      items: filteredTasks,
    };
  });
});

const getToken = () => {
  return localStorage.getItem("user").replace(/"/g, "");
};

onMounted(async () => {
  const { data } = await useFetch("https://coco-jamboo.ru/api/tasks", {
    headers: {
      authorization: "Bearer " + getToken(),
    },
    method: "get",
  });
  tasks.value = data.value.data;
});
</script>
<style lang="scss">
.kanban {
  padding: 1rem;
}
@media (min-width: 1440px) {
  .kanban {
    padding: 2.5rem;
  }
}
</style>
