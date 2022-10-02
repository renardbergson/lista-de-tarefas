const Main = {

    init: function () { // this property will call the other ones
        this.cacheSelectors() // we use "this" to say that an element is inside the principal element
        this.bindEvents()  
    },

    cacheSelectors: function () { // this property will select the html elements 
        this.$checkButtons = document.querySelectorAll('.check') // we use "this"to make the element usable by the other functions
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
    },

    bindEvents: function () { // this property will call (connect) the events
        this.$checkButtons.forEach((input) => {input.onclick = this.events.checkButtonClick})
        this.$inputTask.onkeypress = this.events.inputTask_keypress.bind(this)
    },

    events: { // inside this property we will have the events
        checkButtonClick: (e) => {
            const $task = e.target.nextElementSibling
            $task.classList.toggle('taskDone')
        },

        inputTask_keypress: function (e) {
            console.log(this)

            const key = e.key
            const value = e.target.value

            if (key === 'Enter') {
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
        }
    }
}

Main.init() // this part of the code will call the init property

/* 
1 - inside an event, "this" will always refers to the target element, to solve this, we use the BIND method, that will rebind the 
correct one to our event

2 - we can't use BIND to change the value of "this" inside an arrow function, instead we must use a normal function !!
*/

