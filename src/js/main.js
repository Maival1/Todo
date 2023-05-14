import * as bootstrap from 'bootstrap' // По другому модалки не работают

// Variables

let data = getData()
const listContentTodoElement = document.querySelector('#listContentTodo')
const listContentProggresElement = document.querySelector('#listContentProggres')
const listContentDoneElement = document.querySelector('#listContentDone')
const formElement = document.querySelector('#form')
const formChangeElement = document.querySelector('#form2')
const inputListElement = document.querySelector('#inputList')
const textareaListElement = document.querySelector('#textareaList')
const userElement = document.querySelector('#user')
const bgColorElement = document.querySelector('#bgColor')
const todoElement = document.querySelector('#todo')
const buttonDeleteAll = document.querySelector('#deleteAll')
const exampleModal = document.getElementById('exampleModal2')
const modalProggresElement = document.querySelector('#modalProggres')
const user1Element = document.querySelector('#userOption1') // User for first modal
const user2Element = document.querySelector('#userOption2') // User for first modal
const user3Element = document.querySelector('#userOption3') // User for first modal
const user1SecondElement = document.querySelector('#user1Option1') // User for second modal
const user2SecondElement = document.querySelector('#user2Option2') // User for second modal
const user3SecondElement = document.querySelector('#user3Option3') // User for second modal
const countTodoElement = document.querySelector('#countTodo')
const countProggresElement = document.querySelector('#countProggres')
const countDoneElement = document.querySelector('#countDone')

// const myModal = new Modal(document.getElementById('#modalProggres')) // Устаревший способ
const Proggresmodal = new bootstrap.Modal(modalProggresElement)

// Server data

const users = async (urls) => {
  const data = await fetch(urls)

  if(!data.ok) {
    console.log(data.status)
  }

  return await data.json()
}

users('https://jsonplaceholder.typicode.com/users/')
.then(data => {
  const filterUser = data.filter(user => [1, 2, 3].includes(user.id))
  const namesUser = filterUser.map(user => user.name)

  // Users for first modal

  user1Element.textContent = namesUser[0]
  user1Element.value = namesUser[0]
  user2Element.textContent = namesUser[1]
  user2Element.value = namesUser[1]
  user3Element.textContent = namesUser[2]
  user3Element.value = namesUser[2]

  // Users for second modal

  user1SecondElement.textContent = namesUser[0]
  user1SecondElement.value = namesUser[0]
  user2SecondElement.textContent = namesUser[1]
  user2SecondElement.value = namesUser[1]
  user3SecondElement.textContent = namesUser[2]
  user3SecondElement.value = namesUser[2]

})

// Listeners

formElement.addEventListener('submit', handleSubmitForm) // Добавление карточки
todoElement.addEventListener('change', changeStatus) // Перенос в другую колонку через Select status
todoElement.addEventListener('click', hendleDeleteCard) // Удаление карточки через кнопку Remove
buttonDeleteAll.addEventListener('click', hendleDeleteAllCard) // Удаление всех карточек в Done
window.addEventListener('beforeunload', handleBeforeUnload) // Вызов данных
exampleModal.addEventListener('show.bs.modal', hendleEditForm) // Открытие формы через Edit


// Init

render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
renderCount(data, countTodoElement, countProggresElement, countDoneElement)

// Hendlers

// Открытие формы через Edit
function hendleEditForm(event) {
  const button = event.relatedTarget
  // Extract info from data-bs-* attributes
  const recipient = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an Ajax request here
  // and then do the updating in a callback.

  // Update the modal's content.
  const modalTitle = exampleModal.querySelector('.modal-title')
  const modalBodyInput = exampleModal.querySelector('.modal-body input')
  const modalTextArea = exampleModal.querySelector('#textareaList2')
  const modalBgColor = exampleModal.querySelector('#bgColor2')
  const modalUser = exampleModal.querySelector('#user2')

  modalTitle.textContent = `New message to ${recipient}`
  modalBodyInput.value = recipient

  // Получение нужной карточки
  const card = button.closest('.card')
  const cardID = card.id
  // Отрисовка имеющихся значений в форме через edit
  const cardOpen = data.find((card) => card.id == cardID)
  // Делаем selected BgColor в форме edit
  for (let i = 0; i < modalBgColor.options.length; i++) {
    const option = modalBgColor.options[i]
    if (option.value === cardOpen.bgColor) {
      option.selected = true
      break
    }
  }
  // Делаем selected Users в форме через edit
  for (let i = 0; i < modalUser.options.length; i++) {
    const option = modalUser.options[i]
    if (option.value === cardOpen.user) {
      option.selected = true
      break
    }
  }

  // Передаем данные в Textarea
  modalTextArea.textContent = cardOpen.description

  // Делаем отправку формы с переданными и измененными данными
  formChangeElement.addEventListener('submit', (event) => {
    event.preventDefault()

  const title = modalBodyInput.value
  const description = modalTextArea.value
  const user = modalUser.value
  const bgColor = modalBgColor.value

  const newData = {title, description, user, bgColor}

  const todoIndex = data.findIndex(todo => todo.id == cardID)

  if (todoIndex >= 0) {
    // создаем новый объект, используя старый объект и новые данные
    const updatedTodo = { ...data[todoIndex], ...newData }

    // заменяем старый объект на обновленный в массиве data
    data.splice(todoIndex, 1, updatedTodo)
    render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
    renderCount(data, countTodoElement, countProggresElement, countDoneElement)
  }
  })
}


function handleSubmitForm(event) {
  event.preventDefault()

  console.log(users)

  const title = inputListElement.value
  const description = textareaListElement.value
  const user = userElement.value
  const bgColor = bgColorElement.value
  const todo = new Desk(title, description, user, bgColor)

  data.push(todo)
  render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
  renderCount(data, countTodoElement, countProggresElement, countDoneElement)
  formElement.reset()
}

function changeStatus(event) {
  const card = event.target.closest('.card')
  const selectedStatus = event.target.value
  const id = card.id
  const proggressCards = data.filter(card => card.status === 'progress')

  if (selectedStatus == 'todo') {
    let datas = data.find((card) => card.id == id)
    datas.status = 'todo'
    render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
    renderCount(data, countTodoElement, countProggresElement, countDoneElement)
  }
  if (selectedStatus == 'progress') {
    if (proggressCards.length <= 5) {
      let datas = data.find((card) => card.id == id)
      datas.status = 'progress'
      render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
      renderCount(data, countTodoElement, countProggresElement, countDoneElement)
    } else {
      Proggresmodal.show() // РАБОТАЕТ ТОЛЬКО ОДИН РАЗ
    }

  }
  if (selectedStatus == 'done') {
    let datas = data.find((card) => card.id == id)
    datas.status = 'done'
    render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
    renderCount(data, countTodoElement, countProggresElement, countDoneElement)
  }
}

// Удаление определенной карточки через Remove
function hendleDeleteCard(event) {
  const button = event.target
  const role = button.role
  if (role == 'deleteCard') {
    const card = button.closest('.card')
    const cardID = card.id
    data = data.filter((item) => item.id != cardID)
    render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
    renderCount(data, countTodoElement, countProggresElement, countDoneElement)
  }
}

// Удаление все карточек в колонке Done
function hendleDeleteAllCard() {
  const doneCards = data.filter(card => card.status === 'done')
  doneCards.forEach(card => {
    const index = data.indexOf(card)
    if (index !== -1) {
      data.splice(index, 1)
    }
  })
  render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
  renderCount(data, countTodoElement, countProggresElement, countDoneElement)
}


// Constuctors

function Desk(title, description, user, bgColor) {

  this.id = new Date().getTime()
  this.date = new Date().toISOString()
  this.title = title
  this.description = description
  this.user = user
  this.bgColor = bgColor
  this.status = 'todo'

}


// Templates

function buildDeskTemplate(data) {
  const time = new Date(data.date).toLocaleString()
  const statusTodo = data.status == 'todo' //? 'selected' : ''
  const statusProgress = data.status == 'progress' //? 'selected' : ''
  const statusDone = data.status == 'done' //? 'selected' : ''
  return `
  <div id="${data.id}" class="card m-2 rounded-3 ${data.bgColor}">
    <div class="card__head d-flex justify-content-between p-2">
      <div class="card__title">${data.title}</div>
      <time class="card__time">${time}</time>
    </div>
    <p class="card__text mt-2 p-2">${data.description}</p>
    <div class="card__user p-2">${data.user}<img></div>
    <div class="card__navigator d-flex gap-1">
    <select class="form-select form-select-lg" data-role="select">
      <option selected>Chose Collumn</option>
      <option value="todo" ${statusTodo}>Todo</option>
      <option value="progress" ${statusProgress}>In progress</option>
      <option value="done" ${statusDone}>Done</option>
    </select>
    <button type="button" class="btn btn-info" role="edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="${data.title}">Edit</button>
    <button class="btn btn-danger" role="deleteCard">Remove</button>
    </div>
  </div>`
}

function buildCountersTemplate (count) {
  return `
    <span class="ms-2">Count: ${count}</span>
  `
}

// Helpers

function render(data, wrapper, wrapper2, wrapper3) {
  let templates = ''
  let templatesProggres = ''
  let templatesDone = ''

  data.forEach((item) => {
    const template = buildDeskTemplate(item)
    if (item.status == 'todo') {
      templates += template
    }

    if (item.status == 'progress') {
      templatesProggres += template
    }

    if (item.status == 'done') {
      templatesDone += template
    }
  })

  wrapper.innerHTML = templates
  wrapper2.innerHTML = templatesProggres
  wrapper3.innerHTML = templatesDone
}

function renderCount (data, wrapper, wrapper2, wrapper3) {
let countTodo = 0
let countProggres = 0
let countDone = 0

data.forEach((item) => {
  if (item.status == 'todo') {
    countTodo++
  }

  if (item.status == 'progress') {
    countProggres++
  }

  if (item.status == 'done') {
    countDone++
  }
})

const templatesTodo = buildCountersTemplate(countTodo)
const templatesProggres = buildCountersTemplate(countProggres)
const templatesDone = buildCountersTemplate(countDone)


wrapper.innerHTML = templatesTodo
wrapper2.innerHTML = templatesProggres
wrapper3.innerHTML = templatesDone

}


function getData() {
  return JSON.parse(localStorage.getItem('data')) || []
}

function setData(data) {
  localStorage.setItem('data', JSON.stringify(data))
}

function handleBeforeUnload() {
  setData(data)
}
