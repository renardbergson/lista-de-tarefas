const Main = {

    init: function () { // this property will call the other ones
        this.cacheSelectors() // we use "this" to say that an element is inside the principal element
        this.bindEvents()  
    },

    cacheSelectors: function () { // this property will select the html elements 
        this.$checkButtons = document.querySelectorAll('.check') // we use "this"to make the element usable by the other functions
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeTaskButtons = document.querySelectorAll('.remove')
    },

    bindEvents: function () { // this property will call (connect) the events
        this.$checkButtons.forEach((input) => {input.onclick = this.events.checkButtonClick})
        this.$inputTask.onkeypress = this.events.inputTask_keypress.bind(this)
        this.$removeTaskButtons.forEach((button) => {button.onclick = this.events.removeTask})
    },

    events: { // inside this property we will have the events
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
                    <!-- <div class="check"></div> -->
                    <label class="task">
                        ${value}
                    </label>
                    <button class="remove"></button>
                </li>
                `
                e.target.value = ''

                this.cacheSelectors() // we call these functions again because the earlier instruction modifies the DOM, which means
                this.bindEvents()   // that it adds all the LI's again and the new one, but without our class reference, so add it again
            }
        },

        removeTask: (e) => {
            const li = e.target.parentElement
            li.classList.add('removed')
            
            setTimeout(() => {
                li.remove() // the remove method removes an element from the document
            }, 300) // only after 300ms we'll delete the item, this time is defined in the element animation
        }
    }
}

Main.init() // this part of the code will call the init property

/* 
1 - inside an event, "this" will always refers to the target element, to solve this, we use the BIND method, that will rebind the 
correct one to our event

2 - we can't use BIND to change the value of "this" inside an arrow function, instead we must use a normal function !!
*/

