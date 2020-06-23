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

	var calculateTotal = function(type){
		var sum = 0;
		data.allItems[type].forEach(function(cur){
			sum += cur.value;
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1,
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

		},

		calculateBudget: function() {
			calculateTotal('inc');
			calculateTotal('exp');
			data.budget = data.totals.inc = data.totals.exp;
			if(data.totals.inc > 0){
				data.percentage = Math.round(data.totals.exp / data.totals.inc) * 100;
			} else {
				data.percentage = -1;
			}
			
		},

		getBudget: function() {
			return {
				budget: data.budget,
				percentage: data.percentage,
				totalIncome: data.totals.inc,
				totalExpense: data.totals.exp
			};
		},

	};

})();


var UIController = (function () {
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		addButton: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list'
	};

	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			};
		},
		addListItem: function(obj, type) {
			var html, newHTML, element;
			
			if(type === 'inc'){
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}else {
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			
			newHTML = html.replace('%id%', obj.id);
			newHTML = newHTML.replace('%description%', obj.description);
			newHTML = newHTML.replace('%value%', obj.value);

			element = type === 'inc' ? DOMstrings.incomeContainer : DOMstrings.expenseContainer;
			
			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

		},
		clearFields: function() {
			var fields, fieldsArray;
			
			fields = document.querySelectorAll(DOMstrings.inputDescription +',' +DOMstrings.inputValue);
			// Loop array and clear
			fieldsArray = Array.prototype.slice.call(fields);

			fieldsArray.forEach(function(cur, index, array){
				cur.value = '';
			});

			fieldsArray[0].focus();
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


	var updateBudget = function(){
		// Calc the budget
		calculateTotal('exp');
		calculateTotal('inc');
		// Return budget
		budget = BudgetCtrl.getBudget();
		// Display budget on UI
	};


	var ctrlAddItem = function () {
		var input, newItem;
		
		input = UICtrl.getInput();
		if(input.description !== "" && !isNaN(input.value) && input.value > 0){
			newItem = BudgetCtrl.addItem(input.type, input.description, input.value);
			UICtrl.addListItem(newItem, input.type);
			UICtrl.clearFields();

			updateBudget();
		}
		
	};

	return {
		init: function () {
			console.log('Application Started');
			setupEventListeners();
		}
	};

})(budgetController, UIController);

controller.init();