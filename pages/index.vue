
<template>
     <section class="kanban">
        <KanbanHeader 
            :dataTasks="data" 
            @update-query="queryHandler"
            ></KanbanHeader>
        <KanbanKanbanella :dataTasks="tasksAfterSearch"></KanbanKanbanella>
     </section>
</template>

<script setup>
import KanbanHeader from '@/components/kanban/header.vue';
import KanbanKanbanella from '@/components/kanban/kanbanella.vue';

import { ref, computed } from 'vue';

definePageMeta({
  middleware: "auth",
});

const tasks = ref([]);
const query = ref('');
const data = [
                    {
                        code: 'backlog',
                        title: 'Беклог',
                        tasks: [
                            {
                                code: 'test',
                                id: 1,
                                title: 'Работа битрикс24',
                                description: 'Как говорится ничего не говорится.....',
                                performer: {
                                    id: 2,
                                    name: 'Владимир Иваныч'
                                },
                                creator: {
                                    id: 1,
                                    name: 'Создатель'
                                },
                            },
                            {
                                code: 'test-2',
                                id: 2,
                                title: 'Работа БУС',
                                description: 'Как говорится ничего не говорится.....',
                                performer: {
                                    id: 3,
                                    name: 'Владимир Романович'
                                },
                                creator: {
                                    id: 1,
                                    name: 'Создатель'
                                },
                            },
                            {
                                code: 'test-3',
                                id: 3,
                                title: 'Девопс',
                                description: 'Как говорится ничего не говорится.....',
                                performer: {
                                    id: 3,
                                    name: 'Владимир Романович'
                                },
                                creator: {
                                    id: 1,
                                    name: 'Создатель'
                                },
                            },
                        ],
                    },
                    {
                        code: 'development',
                        title: 'В работе',
                        tasks: [
                            {
                                code: 'tester',
                                id: 23,
                                title: 'Настройка сервера',
                                description: 'Как говорится ничего не говорится.....',
                                performer: {
                                    id: 2,
                                    name: 'Владимир Иваныч'
                                },
                                creator: {
                                    id: 1,
                                    name: 'Создатель'
                                },
                            },
                        ],
                    },
                    {
                        code: 'finish',
                        title: 'Финиш',
                        tasks: [
                            {
                                code: 'testing',
                                id: 42,
                                title: 'Покушать',
                                description: 'Как говорится ничего не говорится.....',
                                performer: {
                                    id: 2,
                                    name: 'Владимир Иваныч'
                                },
                                creator: {
                                    id: 1,
                                    name: 'Создатель'
                                },
                            },
                        ],
                    },
                ];


const queryHandler = (param) => {
    query.value = param;
}                
const tasksAfterSearch = computed(() => {
    if (query.value.trim() === '') {
        return [...data];
    }
    return data.map(status => {
        const filteredTasks = status.tasks.filter(task => 
            task.title.toLowerCase().includes(query.value.toLowerCase())
        );
        return {
            code: status.code,
            title: status.title,
            tasks: filteredTasks
        }
    })
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
