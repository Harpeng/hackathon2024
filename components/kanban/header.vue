<template>
    <header class="header">
        <h1 
            :class="['header__title', inputState ? 'close' : '']"
            >
            Разработка
        </h1>
        <nav class="header__nav">
            <div class="header__search">
                <KanbanInput 
                    @checkInput="checkInput" 
                    :dataTasks="dataTasks" 
                    v-model:query="query"
                    @update:query="handleQueryUpdate"
                    ></KanbanInput>
            </div>
            <div :class="['header__icons', inputState ? 'close' : '']">
                <a href="https://coco-jamboo.ru/api/tasks/export" class="header__icon" id="import">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 9L6 9C3.79086 9 2 10.7909 2 13L2 18C2 20.2091 3.79086 22 6 22L18 22C20.2091 22 22 20.2091 22 18L22 13C22 10.7909 20.2091 9 18 9L16 9" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M9 5L11.2929 2.70711C11.6834 2.31658 12.3166 2.31658 12.7071 2.70711L15 5" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M12 3L12 14" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </a>
                <div class="header__icon" id="filter" @click="openModal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V5.41751C21 6.17739 20.7116 6.90895 20.1932 7.46447L15.2379 12.7737C14.8922 13.144 14.7 13.6317 14.7 14.1383V17.682C14.7 18.0607 14.486 18.407 14.1472 18.5764L10.7472 20.2764C10.0823 20.6088 9.3 20.1253 9.3 19.382V14.1383C9.3 13.6317 9.10776 13.144 8.76211 12.7737L3.80684 7.46447C3.28836 6.90895 3 6.17739 3 5.41751V5Z" stroke="#9E9E9E" stroke-width="1.5"/>
                    </svg>
                </div>
                <div class="header__icon" id="user">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4.21842" cy="4.21842" r="4.21842" transform="matrix(-1 0 0 1 16.5354 3.51074)" stroke="#9E9E9E" stroke-width="1.5"/>
                        <path d="M4.76831 17.7619C4.76831 16.8166 5.37323 15.9773 6.27006 15.6784V15.6784C9.98935 14.4386 14.0104 14.4386 17.7297 15.6784V15.6784C18.6265 15.9773 19.2315 16.8166 19.2315 17.7619V18.8688C19.2315 19.9973 18.2375 20.8675 17.1189 20.7183L15.5683 20.5116C13.1998 20.1958 10.7999 20.1958 8.43147 20.5116L6.88087 20.7183C5.76226 20.8675 4.76831 19.9973 4.76831 18.8688V17.7619Z" stroke="#9E9E9E" stroke-width="1.5"/>
                    </svg>
                </div>
            </div>
        </nav>
        <teleport to="body">
            <MainModal
                v-if="modalOpen"
                title="Фильтр"
                variantLeftBtn="full-purple"
                variantRightBtn="link"
                textColorLeftBtn="#ffff"
                textColorRightBtn="#a64aed"
                :modalOpen="modalOpen"
                @isCloseModal="closeModal()"
            >
                <Filter @filter="getFilter"></Filter>
            </MainModal>
        </teleport>
    </header>
</template>
<script>
   import KanbanInput from '@/components/kanban/input.vue';
   import MainModal from "@/components/ui/MainModal.vue";
   import Filter from "@/components/ui/Filter.vue";

    export default {
        components: {KanbanInput, MainModal, Filter},
        props: {
            dataTasks: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                inputState: false,
                query: '',
                modalOpen: false,
            }
        },
        methods: {
            checkInput(param) {
                this.inputState = param;
            },
            handleQueryUpdate(newQuery) {
                this.$emit('update-query', newQuery);
            },
            openModal() {
                this.modalOpen = true;
                document.body.style.overflowY = "hidden";
                this.$router.push({
                    query: { ...this.$route.query, modal: true, filter: true},
                });
            },
            closeModal() {
                this.modalOpen = false;
                document.body.style.overflowY = "scroll";
                this.$router.push({
                    query: { ...this.$route.query, modal: undefined, filter: undefined },
                });
            },
            getFilter(param) {
                this.$emit('getFilter', param);
            }
        },
    }

</script>
<style lang="scss">
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 40px;
        margin: 40px 0;
        &__title {
            font-size: 1.25rem;
            font-weight: 500;
        }
        &__title.close {
            display: none;
        }
        &__nav {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 30px;
            svg {
                width: 20px;
                height: 20px;
            }
        }
        &__search {
            flex: 1 1 auto;
        }
        &__icons {
            display: flex;
            align-items: center;
            gap: 30px;
        }
        &__icons.close {
            display: none;
        }
        &__icon {
            cursor: pointer;
            svg {
                path, circle {
                    transition: .2s;
                }
            }
        }
        &__icon:hover svg {
            path, circle {
                stroke: $black;
            }
        }
        #import {
            display: none;
        }
    }
    @media (min-width: 768px) {
        .header {
            &__nav {
                width: 100%;
                gap: 40px;
                svg {
                    width: 32px;
                    height: 32px;
                }
            }
            &__title {
                font-size: 1.6rem;
            }
            #import {
                display: block;
            }
        }
    }
</style>