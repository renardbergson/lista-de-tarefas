const Main = {

    init: function () { // this property will call the other ones
        this.cacheSelectors() // we use "this" to say that an element is inside the principal element
        this.bindEvents()  
    },

    cacheSelectors: function () { // this property will select the html elements 
        this.$checkButtons = document.querySelectorAll('.check') // we use "this"to make the element usable by the other functions
    },

    bindEvents: function () { // this property will call (connect) the events
        this.$checkButtons.forEach((input) => {input.onclick = this.events.checkButtonClick})
    },

    events: { // inside this property we will have the events
        checkButtonClick: (e) => {
            const $task = e.target.nextElementSibling
            $task.classList.toggle('taskDone')
        }
    }
}

Main.init() // this part of the code will call the init property