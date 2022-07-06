let url = 'http://localhost:3001'
axios.get(url)
    .then(res => reload(res.data))



let header = document.querySelector('.header')



let btn = document.querySelector('button')
let input = document.querySelector('input')
let form = document.forms.todo
let cont = document.querySelector('.container_one')
let cont_two = document.querySelector('.container_two')
let cont_three = document.querySelector('.container_three')
let btns = document.querySelectorAll('button[data-limit]')


function react() {
    axios.get(url + '/cars')
        .then(res => {
            if (res.status === 201 || res.status === 200) {
                reload(res.data)
            }
        })
}
react()

let limites = {
    limitOne: 3, 
    limitTwo: 3, 
    limitThree: 3 
}
function reload(arr) {
    cont.innerHTML = ""
    let one = 0
    let two = 0
    let three = 0
   
    for (let item of arr) {
        let box = document.createElement('div')
        let div3 = document.createElement('div')
        let p = document.createElement('p')
        let img = document.createElement('img')
        let p2 = document.createElement('p')
        let h3 = document.createElement('h4')
        let hr = document.createElement('hr')
        hr.classList.add('hr_one')



        box.classList.add('list')
        div3.classList.add('p_img')
        p.innerHTML = item.manufacturer
        h3.innerHTML = item.model
        p2.innerHTML = new Date().getHours() + ':' + new Date().getMinutes()

        box.append(div3, h3, p2)
        div3.append(p, img)

        
        
        
        if(item.year) {
            let year = 2022 - item.year
            if(year <= 15) {
                if(one <= limites.limitOne) {
                    cont.append(box)
                }
                one++
            } else if(year <= 25) {
                if(two <= limites.limitTwo) {
                    cont_two.append(box)
                }
                two++
            } else {
                if(three <= limites.limitThree) {
                    cont_three.append(box)
                }
                three++
            }
        }
    }
}
btns.forEach(btn => {
    btn.onclick = () => {
        let key = btn.getAttribute('data-limit')

        limites[key] = 12
        react()
    }
});

form.onsubmit = (event) => {
    event.preventDefault()

    let task = {
        id: Math.random(),
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        isDone: false
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        task[key] = value
    })

    axios.post(url + '/cars', task)
        .then(res => {
            if (res.status === 201 || res.status === 200) {
                react()
            }
        })

}