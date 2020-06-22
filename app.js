
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add_description',
        inputvalue: '.add__value'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).nodeValue,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        }
    }
})();

