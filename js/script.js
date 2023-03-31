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





//-----------------------------------------------Расчет калорий на день---------------------------------------------------

let comment = document.querySelector('.comment');

function displayMessage (message) {
    comment.innerHTML = message;
}


const gender = document.querySelectorAll('input[name="gender"]');
let weight = document.querySelector('input[name="weight"]');
let height = document.querySelector('input[name="height"]');
let age = document.querySelector('input[name="age"]');
let active = document.querySelector('input[name="active"]')

active.onchange = function() {
    console.log(this.value);
}


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
            this.calorazh = 88.36 + (13.4 * this.yourWeight) + (4.8 * this.yourHeight) - ( 5.7 * this.yourAge);
          } else if (this.yourGender === 'female') {
            this.calorazh = 447.6 + (9.2 * this.yourWeight) + (3.1 * this.yourHeight) - (4.3 * this.yourAge);
          }          
          
         displayMessage(`Ваша дневная норма калорий в состоянии покоя - ${Math.floor(this.calorazh)}`);
    }

}


let countButton = document.querySelector('.countButton');



countButton.addEventListener ('click', function () {
    calculation.checkGender();
})


