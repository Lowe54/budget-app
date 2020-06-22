var budgetController = (function () {

	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};



	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function (type, des, val) {

			var ID, newItem;
			// Create new ID
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
			if (type === 'inc') {
				newItem = new Income(ID, des, val);
			} else {
				newItem = new Expense(ID, des, val);
			}

			data.allItems[type].push(newItem);
			return newItem;

		}
	};

})();


var UIController = (function () {
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		addButton: '.add__btn'
	};

	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			};
		},

		getDOMStrings: function () {
			return DOMstrings;
		}
	};
})();

var controller = (function (BudgetCtrl, UICtrl) {

	function setupEventListeners() {
		var DOMstrings = UICtrl.getDOMStrings();

		document.querySelector(DOMstrings.addButton).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function () {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
	}




	var ctrlAddItem = function () {
		var input, newItem;
		
		input = UICtrl.getInput();
		newItem = BudgetCtrl.addItem(input.type, input.description, input.value);
	};

	return {
		init: function () {
			console.log('Application Started');
			setupEventListeners();
		}
	};

})(budgetController, UIController);

controller.init();