const Main = {
    tasks: [], 

    // ======================== INIT ============ CACHE =========== BIND =================================
    init: function () { 
        this.cacheSelectors() 
        this.bindEvents()     
        this.getStoraged()    /
        this.buildTasks()     
        this.saveScrollPosition()
        this.getScrollPosition()
    },

    cacheSelectors: function () { 
        this.$checkbox = document.querySelector('.checkbox')
        this.$listWrapper = document.querySelector('.list-wrapper')
        this.$checkButtons = document.querySelectorAll('.check') 
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeTaskButtons = document.querySelectorAll('.remove')
    },

    bindEvents: function () { 
        this.$checkbox.onchange = this.events.showRemoveTaskBtns.bind(this)
        this.$checkButtons.forEach((input) => {input.onclick = this.events.checkButtonClick.bind(this)})
        this.$inputTask.onkeypress = this.events.inputTask_keypress.bind(this)
        this.$removeTaskButtons.forEach((button) => {button.onclick = this.events.removeTask.bind(this)})
    },
    // ===================================================================================================

    getStoraged: function () { 
        const _tasks = localStorage.getItem('tasks')

        if (_tasks) {
            this.tasks = JSON.parse(_tasks) 
        } else {
            localStorage.setItem('tasks', JSON.stringify([])) 
        }
    },

    buildTaskHtml: function (task, isDone) { 
        return `
            <li class="${isDone ? 'done' : ''}" data-task="${task}">
                <input type="checkbox" class="check">
                <label class="task">
                    ${task}
                </label>
                <button class="remove" data-task="${task}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </li>
        ` // 
    },

    buildTasks: function () { 
        let html = ''

        this.tasks.forEach(key => {
            html += this.buildTaskHtml(key.task, key.done)
        })

        this.$list.innerHTML = html

        this.cacheSelectors()
        this.bindEvents()
    },

    saveScrollPosition: function () {
        const item = this.$listWrapper

        item.addEventListener('scroll', () => {
            sessionStorage.setItem('listScrollPosition', item.scrollTop)
        })
    },

    getScrollPosition: function () {
        const item = this.$listWrapper

        item.scrollTop = sessionStorage.getItem('listScrollPosition')
    },

    // =========================================== EVENTS =================================================
    events: { 
        checkButtonClick: function (e) {
            const $li = e.target.parentElement
            const value = $li.dataset['task']
            const isDone = $li.classList.contains('done')
            
            e.target.style.transform = "scale(1.2)";
            setTimeout(() => {
                e.target.style.transform = "scale(1)";
            }, 100)

            const newTasksState = this.tasks.map(item => {
                if (item.task === value) {
                    item.done = !isDone // on the first click, "isDone" starts as "false"
                }

                return item // the map method needs a return to know what insert into the array (newTasksState)
            })
            localStorage.setItem('tasks', JSON.stringify(newTasksState))

            
            if (!isDone) {
                return $li.classList.add('done')
            }
            $li.classList.remove('done')
        },

        inputTask_keypress: function (e) {
            const key = e.key
            const value = e.target.value

            if (key === 'Enter' && this.$inputTask.value != '') {
                this.$list.innerHTML += this.buildTaskHtml(value)
                
                e.target.value = ''

                this.cacheSelectors() 
                this.bindEvents()   

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksObj = JSON.parse(savedTasks)


                const tasksArr = [ // This is the model of our tasks object:
                    ...savedTasksObj, // 1 - the storaged tasks             
                    { task: value, done: false }, // 2 - new tasks                       
                ]

                const jsonTasks = JSON.stringify(tasksArr) 
                
                this.tasks = tasksArr 
                localStorage.setItem('tasks', jsonTasks) 
                
                this.$checkbox.checked = false
                this.$removeTaskButtons.forEach(item => {
                    item.style.visibility = 'hidden'
                    item.style.opacity = '0'
                })
            }
        },

        removeTask: function (e) {
            const li = e.target.parentElement
            const value = e.target.dataset['task']
            
            // =============================== removing the task from the screen ===============================
            li.classList.add('removed')

            setTimeout(() => {
                li.remove()                 
            }, 300)                         

            // ============================ removing the task from the local storage ==========================
            const newTasksState = this.tasks.filter(key  => key.task != value)
            localStorage.setItem('tasks', JSON.stringify(newTasksState)) 
            this.tasks = newTasksState                                    
        },

        showRemoveTaskBtns: function () {
            const buttons = this.$removeTaskButtons

            if (this.$checkbox.checked) {
                return buttons.forEach(item => {
                    item.style.visibility = 'visible'
                    item.style.opacity = '1'
                })
            }
            buttons.forEach(item => {
                item.style.visibility = 'hidden'
                item.style.opacity = '0'
            })
        }
    }
}

Main.init() 