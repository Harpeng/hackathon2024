<template>
    <div class="content">
        <ul class="content-list">
            <li class="content-item" v-for="(status, index) in data" :key="status.code">
                <h2 class="content-title" @click="setActive">
                    <span>{{ status.title }}</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10L11.3753 13.5002C11.7405 13.7924 12.2595 13.7924 12.6247 13.5002L17 10" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </h2>
                <ul 
                    class="content-sublist sublist"
                    @drop.prevent="drop"
                    @dragover.prevent
                    @dragenter="dragEnter(index)"
                    @dragend="dragEnd"
                    :id="status.code"
                    >
                    <li 
                        class="sublist-item task"
                        v-for="task in status.items" 
                        :key="task.code"
                        :draggable="true"
                        @dragstart="drag"
                        :id="task.id"
                        >
                        <h3 class="task-title">
                            <span>{{ task.title }}</span>
                            <div class="task-menu">
                                <span class="task-btn" @click="checkMenu">...</span>
                                <ul class="task-edit edit">
                                    <li class="edit-item">
                                        <a href="#">Редактировать</a>
                                    </li>
                                    <li class="edit-item" v-if="index !== data.length - 1">
                                        <button @click="taskMove(index, task.id)">Переместить</button>
                                    </li>
                                    <li class="edit-item">
                                        <button>Удалить</button>
                                    </li>
                                </ul>
                            </div>
                        </h3>
                        <p class="task-text">
                            {{ task.description }}
                        </p>
                        <a href="#" class="task-link">{{ task.performer.name }}</a>
                    </li>
                </ul> 
                <button class="content-button"> + Добавить задачу</button>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            dataTasks: {
                type: Array,
                required: true,
            }
        },
        data() {
            return {
                data: [],
                dragItem: '',
                dropList: [],
                currentList: 0,
            }
        },
        methods: {
            setActive(event) {
                if (document.body.clientWidth <= 768) {
                    event.target.parentNode.classList.toggle('active');
                }
            },
            checkMenu(event) {
                event.currentTarget.parentNode.classList.toggle('active');
            },
            drag(event) {
                this.dragItem = event.target;
            },
            //кидать запрос на изменение статуса
            drop() {
                this.getLists().forEach(item => {
                    item.classList.remove('drag');
                });

                let currentItem;
                let currentStatus;
                
                this.data.forEach((status, index) => {
                    const indexTask = status.items.findIndex(task => task.id === +this.dragItem.id);
                    
                    if (indexTask !== -1) {
                        currentItem = indexTask;
                        currentStatus = index;
                    }
                })
                const newData = this.data;
                
                const deleteItem = newData[currentStatus].items.splice(currentItem, 1)[0];
                
                newData[this.currentList].items.unshift(deleteItem);
                this.data = newData;
            },
            dragEnter(index) {
                this.getLists()[index].classList.add('drag');
                this.currentList = index;
            },
            getLists() {
                if (this.dropList.count) {
                    return this.dropList;
                }
                this.dropList = document.querySelectorAll('.sublist');
                return this.dropList;
            },
            dragEnd(){
                this.getLists().forEach(item => {
                    item.classList.remove('drag');
                });
            },
            //кидать запрос на изменение статуса
            taskMove(currentStatus, taskId) {
                let currentItem;

                this.data.forEach((status) => {
                    const indexTask = status.items.findIndex(task => task.id === taskId);
                    
                    if (indexTask !== -1) {
                        currentItem = indexTask;
                    }
                })
                const newData = this.data;
                
                const deleteItem = newData[currentStatus].items.splice(currentItem, 1)[0];
                
                newData[currentStatus + 1].items.unshift(deleteItem);
                this.data = [...newData];
            },
            
        },
        mounted() {
            this.data = [...this.dataTasks];
        },
        watch: {
            dataTasks: {
                immediate: true,
                handler(newData) {
                    this.data = [...newData];
                }
            }
        }

    }
</script>
<style lang="scss">
    .content {
        &-list {
            display: flex;
            flex-direction: column;
        }
        &-item {
            display: flex;
            flex-direction: column;
        }
        &-title {
            width: 100%;
            border: 1px solid $gray;
            border-radius: 14px;
            padding: 12px 20px;
            font-size: 1rem;
            font-weight: 500;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 40px;
            margin-bottom: 20px;
        }
        &-title svg {
            transition: .3s;
        }
        &-item.active &-title svg {
            transform: rotate(180deg);
        }
        &-item.active &-sublist{
            display: flex;
        }
        &-sublist {
            display: none;
            flex-direction: column;
            gap: 20px;
        }
        &-sublist.drag {
            opacity: .3;
        }
        .sublist {
            margin-bottom: 40px;
            min-height: 250px;
            &-item {
                box-shadow: 0px 1px 4px 0px #8B8B8B4F;
                border-radius: 30px;
                padding: 20px;
                cursor:grab;
            }
        }
        .task {
            &-title {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                font-weight: 500;
                font-size: 20px;
                color: $black;
                &::before {
                    content: '';
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: $green;
                    margin-right: 10px;
                }
            }
            &-menu {
                width: 25px;
                height: 25px;
                border: 1px solid $gray;
                border-radius: 4px;
                margin-left: auto;
                background: none;
                cursor: pointer;
                user-select: none;
                position: relative;
            }
            &-btn {
                position: relative;
                bottom: 5px;
                left: 2px;
                color: $gray;
            }
            &-text {
                display: -webkit-box;
                -webkit-box-orient: vertical; 
                -webkit-line-clamp: 2; 
                overflow: hidden; 
                text-overflow: ellipsis;
                margin-bottom: 40px;
                color: $gray;
            }
            &-link {
                font-weight: 700;
            }
            &-button {
                background: none;
                border: none;
            }
            &-edit {
                position: absolute;
                top: 120%;
                right: 0;
                border: 1px solid $gray-light;
                border-radius: 10px;
                padding: 6px 10px;
                font-weight: 500;
                font-size: 1rem;
                display: none;
                flex-direction: column;
                gap: 6px;
                background: $white;
                z-index: 2;
            }
            .edit {
                &-item {
                    * {
                        display: block;
                        background: none;
                        padding: 6px 10px;
                        border: none;
                    }
                }
                &-item:hover {
                    * {
                        color: rgb(166, 74, 237)
                    }
                }
                &-item:not(:last-child) {
                    border-bottom: 1px solid $gray-light;
                }
            }
            &-menu.active .task-edit{
                display: flex;
            }
        }
        &-item.active &-button {
            display: block;
        }
        &-button {
            display: none;
            color: $purple-light;
            border: 1px solid $purple-light;
            padding: 12px 24px;
            background: none;
            border-radius: 14px;
            transition: .2s;
            align-self: end;
            margin-bottom: 64px;
        }
        &-button:hover {
            color: $white;
            background: $purple-light;
        }
    }
    @media (min-width: 768px) {
        .content {
            &-item {
                flex-grow: 1;
            }
            &-title {
                border: none;
                border-radius: 0;
                padding: 0;
                font-weight: 700;
                font-size: 1.125rem;
                justify-content: start;
                gap: 0;
                color: $gray;
            }
            &-title svg {
                display: none;
            }
            &-sublist {
                display: flex;
            }
            &-button {
                display: block;
            }
        }
    }
    @media (min-width: 1200px) {
        .content {
            &-list {
                flex-direction: row;
                gap: 10px;
            }
            &-item {
                padding: 0 20px 0 10px;
            }
            &-item:not(:last-child) {
                border-right: 1px solid $gray-light;
            }
            &-title {
                margin-bottom: 30px;
            }
            .task {
                &-title {
                    color: $black;
                    margin-bottom: 20px;
                }
                &-menu {
                    width: 25px;
                    height: 25px;
                    border: 1px solid $gray;
                    border-radius: 4px;
                    margin-left: auto;
                    background: none;
                }
                &-btn {
                    position: relative;
                    bottom: 5px;
                    left: 2px;
                }
                &-link {
                    font-weight: 700;
                }
                &-button {
                    background: none;
                    border: none;
                }
            }
        }
        @media (min-width: 1440px) {
            .content {
                .task {
                    &-title {
                        font-size: 26px;
                    }
                    &-btn {
                        bottom: 10px;
                        left: 2.5px;
                        font-size: 20px;
                    }
                }
            }
        }
    }
</style>