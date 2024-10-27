<template>
    <div class="filter">
        <div class="filter-period">
            <input type="date" id="period-from" @change="checkInput">
            -
            <input type="date" id="period-to" @change="checkInput">
        </div>
        <DropDown @responsible="setResponsible"></DropDown>
    </div>
</template>
<script>
    import DropDown from '@/components/ui/Dropdown.vue';
    export default {
        components: {DropDown},
        data() {
            return {
                filter: {
                    responseId: 0,
                    dateFrom: 0,
                    dateTo: 0,
                }
            }
        },
        methods: {
            setResponsible(id) {
                this.filter.responseId = id;
                this.$emit('filter', this.filter);
            },
            checkInput(event) {
                
                const [year, month, day] = event.target.value.split('-').map(Number);

                const date = new Date(year, month - 1, day);
                const timestamp = date.getTime() / 1000;
                
                if (event.target.id === 'period-from') {
                    this.filter.dateFrom = timestamp;
                }
                else {
                    this.filter.dateTo = timestamp;
                }
                this.$emit('filter', this.filter);
            },
        }
    }
</script>
<style lang="scss">
.filter-period {
    margin-bottom: 40px ;
}
    input {
        padding: 8px 12px;
        border: 1px solid $gray-light;
        border-radius: 4px;
    }
</style>