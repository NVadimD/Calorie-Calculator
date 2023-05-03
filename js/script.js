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

let activeBox = document.querySelector('.wrapper_activeBox');
let bmr = document.querySelector('.yourBMR span');

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
    coef: undefined,
    activeCalorazh: undefined,
    
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
            this.calorazh = Math.floor((10 * this.yourWeight) + (6.25 * this.yourHeight) - ( 5 * this.yourAge) + 5);
        } else if (this.yourGender === 'female') {
            this.calorazh = Math.floor((10 * this.yourWeight) + (6.25 * this.yourHeight) - (5 * this.yourAge) - 161);
        }          
        this.showActiveBox();
    },

    showActiveBox: function () {
        bmr.innerHTML = `${this.calorazh} ccal`;
        activeBox.classList.remove('hide');
        window.scroll ({
            top: activeBox.offsetTop - 24,
            behavior: "smooth"
        })
    },

    checkActive: function () {
        if (inputRage.value == 0) {
            console.log('xyu');
        } else {
            this.coef = 1 + (Number(inputRage.value) / 10);
            this.calculateActiveCalories();
        }
    },

    calculateActiveCalories: function () {
        this.activeCalorazh = this.calorazh * this.coef;
        console.log(this.activeCalorazh);
    }

}


// ----------------------------------------Запускаем процесс расчета по нажатию на кнопку----------------------------------

let countButton1 = document.querySelector('.wrapper_startBox .countButton');

countButton1.addEventListener ('click', function () {
    calculation.checkGender();
})



let countButton2 = document.querySelector('.wrapper_activeBox .countButton');

countButton2.addEventListener ('click', function () {
    calculation.checkActive();
})


