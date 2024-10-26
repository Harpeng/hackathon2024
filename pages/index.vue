<template>
     <section class="kanban">
        <KanbanHeader></KanbanHeader>
        <KanbanKanbanella></KanbanKanbanella>
     </section>
</template>
<script>
    import KanbanHeader from '@/components/kanban/header.vue'
    import KanbanKanbanella from '@@/components/kanban/kanbanella.vue'
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