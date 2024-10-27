
<template>
     <section class="kanban">
        <KanbanHeader 
            :dataTasks="tasks" 
            @update-query="queryHandler"
            ></KanbanHeader>
        <KanbanKanbanella :dataTasks="tasksAfterSearch"></KanbanKanbanella>
     </section>
</template>

<script setup>
import KanbanHeader from '@/components/kanban/header.vue';
import KanbanKanbanella from '@/components/kanban/kanbanella.vue';
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  middleware: "auth",
});

const query = ref('');
const tasks = ref([]);

const queryHandler = (param) => {
    query.value = param;
}                
const tasksAfterSearch = computed(() => {
    if (query.value.trim() === '') {
        return [...tasks.value];
    }
    return tasks.value.map(status => {
        const filteredTasks = status.items.filter(task => 
            task.title.toLowerCase().includes(query.value.toLowerCase())
        );
        return {
            code: status.code,
            title: status.title,
            items: filteredTasks
        }
    })
})

const getToken = () => {
    return localStorage.getItem('user').replace(/"/g, '');
}

onMounted(async () => {
    const {data} = await useFetch('https://coco-jamboo.ru/api/tasks', {
        headers: {
            authorization: 'Bearer ' + getToken(),
        },
        method: 'get'
    })
    tasks.value = data.value.data;
})

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
