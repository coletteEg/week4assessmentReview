const magic_set_container = document.querySelector('#magic-set-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:8000/api/magic_set`

const get_all_sets = () => {
    axios.get(baseURL)
        .then((res) => {
            display_sets(res.data)
        })
        .catch(err => {
            console.log(err.response.data);
        })
};

const create_set = (body) => {
    axios.post(baseURL, body)
        .then((res) => {
            display_sets(res.data)
        })
        .catch(err => {
            console.log(err.response.data);
        })
};

const delete_set = (id) => {
    axios.delete(`${baseURL}/${id}`)
        .then((res) => {
            display_sets(res.data)
        })
        .catch(err => {
            console.log(err.response.data);
        })
};

const update_set = (id, body) => {
    axios.put(`${baseURL}/${id}`, body)
        .then((res) => {
            display_sets(res.data)
        })
        .catch(err => {
            console.log(err.response.data);
        })
};

function submit_set(e) {
    e.preventDefault()

    let magic_set = document.querySelector('.create-magic-set')

    let new_Set = {
        set_name: magic_set.value
    }
    console.log(new_Set);
    create_set(new_Set)

    magic_set.value = ''
}

function edit_set(e , id) {
    e.preventDefault()
    console.log("who talking ------------------------------------------");
    let edit_set = document.querySelector(`.edit-magic-set-${id}`)

    let edit_set_obj = {
        set_name: edit_set.value
    }
    
    update_set(id, edit_set_obj)

    edit_set.value = ''
}

function create_set_card(set) {
    const magic_set_card = document.createElement('div')
    magic_set_card.classList.add('set-card')

    magic_set_card.innerHTML = `
    <p class="set-title">${set.set_name}</p>
    <button onclick="delete_set(${set.id})">delete</button>
    <form class="edit-form" onsubmit="edit_set(event, ${set.id})">
        <input type="text" name="edit_magic_set" class="edit-magic-set-${set.id}">
        <button type="submit" value="submit">Edit</button>
    </form>
    `
    magic_set_container.appendChild(magic_set_card)
}

function display_sets(arr) {
    magic_set_container.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        create_set_card(arr[i])
    }
}

form.addEventListener('submit', submit_set)

get_all_sets()