import { Modal } from 'bootstrap'


// Server data



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

// Listeners

formElement.addEventListener('submit', handleSubmitForm) // Добавление карточки
todoElement.addEventListener('change', changeStatus) // Перенос в другую колонку через Select status
todoElement.addEventListener('click', hendleDeleteCard) // Удаление карточки через кнопку Remove
buttonDeleteAll.addEventListener('click', hendleDeleteAllCard) // Удаление всех карточек в Done
window.addEventListener('beforeunload', handleBeforeUnload) // Вызов данных
exampleModal.addEventListener('show.bs.modal', hendleEditForm) // Открытие формы через Edit


// Init

render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)

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
  const findIdElement = exampleModal.querySelector('#findID')

  modalTitle.textContent = `New message to ${recipient}`
  modalBodyInput.value = recipient

  // Получение нужной карточки
  const desk = button.closest('.desk')
  const deskID = desk.id
  // Отрисовка имеющихся значений в форме через edit
  const deskOpen = data.find((card) => card.id == deskID)
  // Делаем selected в форме edit
  for (let i = 0; i < modalBgColor.options.length; i++) {
    const option = modalBgColor.options[i]
    if (option.value === deskOpen.bgColor) {
      option.selected = true
      break
    }
  }
  // Передаем данные в Textarea
  modalTextArea.textContent = deskOpen.description

  formChangeElement.addEventListener('submit', (event) => {
    event.preventDefault()

  const id = findIdElement.value
  console.log(id)
  const title = modalBodyInput.value
  console.log(title)
  const description = modalTextArea.value
  const user = modalUser.value
  const bgColor = modalBgColor.value

  const newData = {title, description, user, bgColor}

  const todoIndex = data.findIndex(todo => todo.id == deskID)
  console.log(todoIndex)
  console.log(newData)
  if (todoIndex >= 0) {
    // создаем новый объект, используя старый объект и новые данные
    const updatedTodo = { ...data[todoIndex], ...newData }

    // заменяем старый объект на обновленный в массиве todos
    data.splice(todoIndex, 1, updatedTodo)
    render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
  }

  })
}


function handleSubmitForm(event) {
  event.preventDefault()

  const title = inputListElement.value
  const description = textareaListElement.value
  const user = userElement.value
  const bgColor = bgColorElement.value
  const todo = new Desk(title, description, user, bgColor)

  data.push(todo)
  render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
  formElement.reset()
}

function changeStatus(event) {
  const card = event.target.closest('.desk')
  const selectedStatus = event.target.value
  const id = card.id
  const proggressCards = data.filter(card => card.status === 'progress')

  if (selectedStatus == 'todo') {
    let datas = data.find((card) => card.id == id)
    datas.status = 'todo'
    render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
  }
  if (selectedStatus == 'progress') {
    if (proggressCards.length <= 5) {
      let datas = data.find((card) => card.id == id)
      datas.status = 'progress'
      render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
    } else {
      alert('В данной колонке может быть только 6 дел((')
    }

  }
  if (selectedStatus == 'done') {
    let datas = data.find((card) => card.id == id)
    datas.status = 'done'
    render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
  }
}

// Удаление определенной карточки через Remove
function hendleDeleteCard(event) {
  const button = event.target
  const role = button.role
  if (role == 'deleteCard') {
    const desk = button.closest('.desk')
    const deskID = desk.id
    data = data.filter((item) => item.id != deskID)
    render(data, listContentTodoElement, listContentProggresElement, listContentDoneElement)
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
  const statusTodo = data.status == 'todo' ? 'selected' : ''
  const statusProgress = data.status == 'progress' ? 'selected' : ''
  const statusDone = data.status == 'done' ? 'selected' : ''
  return `
  <div id="${data.id}" class="desk ${data.bgColor}">
    <div class="desk__head d-flex">
      <div class="desk__title">${data.title}</div>
      <time class="desk__time">${time}</time>
    </div>
    <p class="desk__text">${data.description}</p>
    <div class="desk__user">${data.user}<img></div>
    <div class="desk__navigator d-flex">
    <select class="form-select form-select-lg" data-role="select">
      <option value="todo" ${statusTodo}>Todo</option>
      <option value="progress" ${statusProgress}>In progress</option>
      <option value="done" ${statusDone}>Done</option>
    </select>
    <button type="button" class="btn btn-info" role="edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="${data.title}">Edit</button>
    <button class="btn btn-danger" role="deleteCard">Remove</button>
    </div>
  </div>`
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


function getData() {
  return JSON.parse(localStorage.getItem('data')) || []
}

function setData(data) {
  localStorage.setItem('data', JSON.stringify(data))
}

function handleBeforeUnload() {
  setData(data)
}
