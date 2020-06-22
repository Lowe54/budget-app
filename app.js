
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMStrings: function() {
            return DOMstrings;
        }
    };
})();

var controller = (function(UICtrl){

    function setupEventListeners() {
        var DOMstrings = UICtrl.getDOMStrings();

        document.querySelector(DOMstrings.addButton).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    }


   

    var ctrlAddItem = function() {
        var input = UICtrl.getInput();
        console.log(input);
    };

    return {
        init: function(){
            console.log('Application Started');
            setupEventListeners();
        }
    };
    
})(UIController);

controller.init();