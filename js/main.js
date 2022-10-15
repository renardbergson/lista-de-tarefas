const Main = {
    tasks: [], // this is the array that is gonna get the storaged and new tasks

    // ==================================== INIT ============ CACHE =========== BIND =============================================
    init: function () { // this method will call the other ones
        this.cacheSelectors() 
        this.bindEvents()     
        this.getStoraged()    // we use "this" to say that an element is inside the principal element 
        this.buildTasks()     // // and make it visible to the other methods
        console.log(this.tasks)
    },

    cacheSelectors: function () { // this property will select the html elements 
        this.$checkButtons = document.querySelectorAll('.check') // we use "this"to make the element usable by the other functions
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeTaskButtons = document.querySelectorAll('.remove')
    },

    bindEvents: function () { // this method will call (connect) the events method
        this.$checkButtons.forEach((input) => {input.onclick = this.events.checkButtonClick})
        this.$inputTask.onkeypress = this.events.inputTask_keypress.bind(this)
        this.$removeTaskButtons.forEach((button) => {button.onclick = this.events.removeTask.bind(this)})
    },
    // =========================================================================================================================

    getStoraged: function () { // here we get and convert the saved taskes in the local storage 
        const _tasks = localStorage.getItem('tasks')

        if (_tasks) {
            this.tasks = JSON.parse(_tasks) // if there's a key called 'tasks', feed our array with it
        } else {
            localStorage.setItem('tasks', JSON.stringify([])) // if there isn't a key called 'tasks', save that key with an empty array
        }
    },

    buildTasks: function () { // here we build an html with the saved tasks that were pushed into our array
        let html = ''

        this.tasks.forEach(key => {
            html += `
                <li>
                    <input type="checkbox" class="check">
                    <label class="task">
                        ${key.task}
                    </label>
                    <button class="remove" data-banana="${key.task}"></button>
                </li>
        ` // we're inserting a parameter with any ID, it receives the label value
        })

        this.$list.innerHTML = html

        this.cacheSelectors()
        this.bindEvents()
    },

    // ====================================================== EVENTS ===========================================================
    events: { // inside this method we'll have the events
        checkButtonClick: (e) => {
            const $task = e.target.nextElementSibling
            $task.classList.toggle('taskDone')
            
            e.target.classList.toggle('checked')

            e.target.classList.add('animated')
            
            setTimeout(() => {
                e.target.classList.remove('animated')
            }, 200)
        },

        inputTask_keypress: function (e) {
            const key = e.key
            const value = e.target.value

            if (key === 'Enter' && this.$inputTask.value != '') {
                this.$list.innerHTML += `
                    <li>
                        <input type="checkbox" class="check">
                        <label class="task">
                            ${value}
                        </label>
                        <button class="remove" data-banana="${value}"></button> 
                    </li>
                ` // we're inserting a parameter with any ID, it receives the label value
                e.target.value = ''

                this.cacheSelectors() // we call these functions again because the earlier instruction modifies the DOM, which means
                this.bindEvents()   // that it adds all the LI's again and the new one, but without our class reference, so add it again

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksObj = JSON.parse(savedTasks)


                const tasksArr = [ // here we set the model of our tasks object:
                    ...savedTasksObj, // 1 - the storaged tasks             *this is the spread operator*
                    { task: value }, // 2 - new tasks                       
                ]

                const jsonTasks = JSON.stringify(tasksArr) // here we convert the whole tasks array to json
                
                this.tasks = tasksArr // we refresh the principal array and
                localStorage.setItem('tasks', jsonTasks) // refresh the local storage as well but in a json format

                //console.log(this.tasks)
            }
        },

        removeTask: function (e) {
            const li = e.target.parentElement
            const value = e.target.dataset['banana']
            
            // =============================== removing the task from the screen ===============================
            li.classList.add('removed')

            setTimeout(() => {
                li.remove()                 // the remove method removes an element from the document
            }, 300)                         // only after 300ms we'll do that, this time is defined in the element animation

            // ============================ removing the task from the local storage ==========================
            const newTasksState = this.tasks.filter(key  => key.task != value)
            localStorage.setItem('tasks', JSON.stringify(newTasksState))                // we refresh the local storage
            this.tasks = newTasksState                                                  // and our array as well
            
            console.log(this.tasks)
        }
    }
}

Main.init() // this part of the code will call the method that calls the other ones

/* 
1 - inside an event, "this" will always refers to the target element, to solve this, we use the BIND method, that will rebind the 
correct one to our event

2 - we can't use BIND to change the value of "this" inside an arrow function, instead we must use a normal function !!
*/

