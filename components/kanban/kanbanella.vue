<template>
    <div class="content">
        <ul class="content-list">
            <li class="content-item">
                <h2 class="content-title" id="backlog" @click="setActive">
                    Беклог
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10L11.3753 13.5002C11.7405 13.7924 12.2595 13.7924 12.6247 13.5002L17 10" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </h2>
                <ul class="content-sublist sublist">
                    <li class="sublist-item task">
                        <h3 class="task-title">
                            Внедрение Я. Метрики
                            <div class="task-menu">
                                <span class="task-btn">...</span>
                            </div>
                        </h3>
                        <p class="task-text">
                            Настроить интеграция Метрики и Директа: номер счётчика указан в параметрах кампании, включена разметка для ссылок.
                        </p>
                        <a href="#" class="task-link">Иванов И.А.</a>
                    </li>
                    <li class="sublist-item task">
                        <h3 class="task-title">
                            Внедрение Я. Метрики
                            <div class="task-menu">
                                <span class="task-btn">...</span>
                            </div>
                        </h3>
                        <p class="task-text">
                            Настроить интеграция Метрики и Директа: номер счётчика указан в параметрах кампании, включена разметка для ссылок.
                        </p>
                        <button class="task-button">Добавить ответственного</button>
                    </li>
                </ul> 
                <button class="content-button"> + Добавить задачу</button>
            </li>
            <li class="content-item">
                <h2 class="content-title" id="develop" @click="setActive">
                    Разработка
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10L11.3753 13.5002C11.7405 13.7924 12.2595 13.7924 12.6247 13.5002L17 10" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </h2>
                <ul class="content-sublist sublist">
                    <li class="sublist-item task">
                        <h3 class="task-title">
                            Оптимизация запросов
                            <div class="task-menu">
                                <span class="task-btn">...</span>
                            </div>
                        </h3>
                        <p class="task-text">
                            Настроить интеграция Метрики и Директа: номер счётчика указан в параметрах кампании, включена разметка для ссылок.
                        </p>
                        <a href="#" class="task-link">Иванов И.А.</a>
                    </li>
                    <li class="sublist-item task">
                        <h3 class="task-title">
                            Внедрение Я. Метрики
                            <div class="task-menu">
                                <span class="task-btn">...</span>
                            </div>
                        </h3>
                        <p class="task-text">
                            Настроить интеграция Метрики и Директа: номер счётчика указан в параметрах кампании, включена разметка для ссылок.
                        </p>
                        <button class="task-button">Исполнители пока не добавлены</button>
                    </li>
                </ul> 
                <button class="content-button"> + Добавить задачу</button>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        methods: {
            setActive(event) {
                event.target.parentNode.classList.toggle('active');
            }
        }
    }
</script>
<style lang="scss">
    .content {
        &-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
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
            font-weight: 500;
            font-size: 1rem;
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
        .sublist {
            margin-bottom: 40px;
            margin-right: auto;
            &-item {
                box-shadow: 0px 1px 4px 0px #8B8B8B4F;
                border-radius: 30px;
                padding: 20px;
            }
        }
        .task {
            &-title {
                color: $black;
                font-weight: 500;
                font-size: 20px;
                display: flex;
                align-items: center;
                margin-bottom: 20px;
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
            }
            &-btn {
                position: relative;
                bottom: 5px;
                left: 2px;
            }
            &-text {
                display: -webkit-box; /* Устанавливаем как гибкий контейнер */
                -webkit-box-orient: vertical; /* Устанавливаем направление по вертикали */
                -webkit-line-clamp: 2; /* Ограничиваем до 2 строк */
                overflow: hidden; /* Скрываем переполнение */
                text-overflow: ellipsis; /* Добавляем многоточие */
                margin-bottom: 40px;
            }
            &-link {
                font-weight: 700;
            }
            &-button {
                background: none;
                border: none;
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
        }
        &-button:hover {
            color: $white;
            background: $purple-light;
        }
    }
</style>