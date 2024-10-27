<template>
    <div class="search">
        <input 
            type="search" 
            placeholder="Поиск..."
            :class="openInput ? 'active' : ''" 
            @input="inputQuery"
            :value="query"
            />
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            @click="checkInput(true)" 
            id="open"
            :class="openInput ? 'close' : ''"
            >
            <circle cx="11" cy="11" r="8" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.5 16.958L21.5 21.958" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            id="close" 
            @click="checkInput(false)"
            :class="[openInput ? 'active' : '']"
            >
            <path d="M4.42099 4.42129L19.5787 19.579" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.42105 19.5789L19.5787 4.42119" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
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
                openInput: false,
                query: '',
            }
        },
        methods: {
            checkInput(param) {
                if (document.body.clientWidth < 768) {
                    this.openInput = param;
                    this.$emit('checkInput', param);
                }
            },
            inputQuery(event) {
                this.query = event.target.value;
                this.$emit('update:query', event.target.value);
            }
        },
        // computed: {
        //     dataQuery() {
        //         const newList = this.dataTasks.map(status => {
        //             return status.tasks.filter(task => task.title.toLowerCase().includes(this.query.toLowerCase()));
        //         })

        //         this.$emit('searchList', this.newList);
        //     },
        // }
    }
</script>
<style lang="scss">
    .search {
        flex: 1 1 auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 20px;
        input {
            width: 0;
            opacity: 0;
            user-select: none;
            font-weight: 500;
            font-size: 1rem;
            border: 1px solid $gray;
            border-radius: 14px;
            outline: none;
        }
        input:focus {
            border-color: $purple-dark;
        }
        input.active {
            width: 60%;
            opacity: 1;
            user-select: auto;
            padding: 14px 64px 14px 20px;
        }
        #open {
            position: relative;
            bottom: 3px;
        }
        #open.close {
            display: none;
        }
        #close {
            display: none;
        }
        #close.active {
            display: block;
        }
    }
    @media (min-width: 768px) {
        .search {
            gap: 40px;
            input {
                max-width: 540px;
                width: 100%;
                opacity: 1;
                padding: 14px 64px 14px 20px;
                user-select: auto;
            }
            #open {
                position: absolute;
                top: 8px;
                right: 20px;
            }
        }
    }
</style>
