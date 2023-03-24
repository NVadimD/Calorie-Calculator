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