//-----------------------------------------------Переключение окошек информации---------------------------------------

let switches = Array.from(document.querySelectorAll('.switch'));
let infos = Array.from(document.querySelectorAll('.info'));

for (let i = 0; i < switches.length; i++) {
    switches[i].addEventListener('click', function () {
        for (let i = 0; i < switches.length; i++) {
            switches[i].classList.remove('active');
            infos[i].classList.remove('activeInfo');
        }
        this.classList.add('active');
        infos[i].classList.add('activeInfo');
    })
}


//-----------------------------------------------Настраиваю ползунок физ активности---------------------------------------

let activeValue = document.querySelector('.activeValue');
let inputRage = document.querySelector('.inputRage');

activeValue.innerHTML = inputRage.value;

inputRage.onchange = function () {
    activeValue.innerHTML = inputRage.value;
}

//-----------------------------------------------Расчет калорий на день---------------------------------------------------

let comment = document.querySelector('.comment');

function displayMessage (message) {
    comment.innerHTML = message;
}


const gender = document.querySelectorAll('input[name="gender"]');
let weight = document.querySelector('input[name="weight"]');
let height = document.querySelector('input[name="height"]');
let age = document.querySelector('input[name="age"]');

let calculation = {
    yourGender: undefined,
    yourWeight: undefined,
    yourHeight: undefined,
    yourAge: undefined,
    calorazh: undefined,
    
    checkGender: function () {
        for (const g of gender) {
            if (g.checked) {
                this.yourGender = g.value
                displayMessage('');
                this.checkWeight();
                return true;
            }
        }
        if (this.yourGender === undefined) {
            displayMessage('Вы не выбрали пол!');
            return false;
        }     
    },

    checkWeight: function () {
        if (weight.value === '') {
            displayMessage('Вы не ввели ваш вес!');
        } else if (isNaN(weight.value)) {
            displayMessage('Вы ввели вес некорректно! Необходимо указать число без единиц измерения.');
        } else if (weight.value < 34 || weight.value > 240) {
            displayMessage('Вы ввели ненастоящий вес! Укажите реальную цифру.');
        } else {
            this.yourWeight = weight.value;
            this.checkHeight();
        }
    },

    checkHeight: function () {
        if (height.value === '') {
            displayMessage('Вы не ввели ваш рост!');
        } else if (isNaN(height.value)) {
            displayMessage('Вы ввели рост некорректно! Необходимо указать число без единиц измерения.');
        } else if (height.value < 100 || height.value > 250) {
            displayMessage('Вы ввели ненастоящий рост! Укажите реальную цифру.');
        } else {
            this.yourHeight = height.value;
            this.checkAge();
        }
    },

    checkAge: function () {
        if (age.value === '') {
            displayMessage('Вы не ввели ваш возраст!');
        } else if (isNaN(age.value)) {
            displayMessage('Вы ввели возраст некорректно! Необходимо указать количество полных лет.');
        } else if (age.value < 3 || age.value > 100) {
            displayMessage('Вы ввели ненастоящий возраст! Укажите реальную цифру.');
        } else {
            this.yourAge = age.value;
            this.calculateCalories();
        }
    },

    calculateCalories: function () {
        if (this.yourGender === 'male') {
            this.calorazh = (10 * this.yourWeight) + (6.25 * this.yourHeight) - ( 5 * this.yourAge) + 5;
        } else if (this.yourGender === 'female') {
            this.calorazh = (10 * this.yourWeight) + (6.25 * this.yourHeight) - (5 * this.yourAge) - 161;
        }          
        
        displayMessage(`Ваша дневная норма калорий в состоянии покоя - ${Math.floor(this.calorazh)}`);
    }

}


let countButton = document.querySelector('.countButton');



countButton.addEventListener ('click', function () {
    calculation.checkGender();
})





let infoActive = document.querySelector('.infoActive');

activeValue.onmouseover = function () {
    infoActive.style.display = 'block';
}
activeValue.onmouseout = function () {
    infoActive.style.display = 'none';
}