import * as bootstrap from 'bootstrap'

// Variables

let data = getData() // Данные колонки Todo
let dataProggres = getDataProggres() // Данные колонки Proggres
let dataDone = getDataDone() // Данные колонки Done
const listContentTodoElement = document.querySelector('#listContentTodo')
const listContentProggresElement = document.querySelector('#listContentProggres')
const listContentDoneElement = document.querySelector('#listContentDone')
const listAddElemnt = document.querySelector('#listAdd')
const formElement = document.querySelector('#form')
const inputListElement = document.querySelector('#inputList')
const textareaListElement = document.querySelector('#textareaList')
const userElement = document.querySelector('#user')
const bgColorElement = document.querySelector('#bgColor')
const buttonConfirmElement = document.querySelector('#confirmList')
const todoMainElement = document.querySelector('#todoMain')
const buttonDeleteAll = document.querySelector('#deleteAll')

// Listeners

formElement.addEventListener('submit', handleSubmitForm) // Добавление карточки
listContentTodoElement.addEventListener('click', hendleDropDeskTodo) // Перенос карточки в Todo
listContentProggresElement.addEventListener('click', hendleDropDeskProggres) // Перенос карточки в Proggres
listContentDoneElement.addEventListener('click', hendleDropDeskDone) // Перенос карточк в Done
todoMainElement.addEventListener('click', hendleDeleteCard) // Удаление карточки через кнопку Remove
buttonDeleteAll.addEventListener('click', hendleDeleteAllCard) // Удаление всех карточек в Done
window.addEventListener('beforeunload', handleBeforeUnload)

// Init

render(data, listContentTodoElement)
render(dataProggres, listContentProggresElement)
render(dataDone, listContentDoneElement)

// Hendlers

// Отправка формы и отрисовка
function handleSubmitForm (event) {
  event.preventDefault()

  const title = inputListElement.value
  const description = textareaListElement.value
  const user = userElement.value
  const bgColor = bgColorElement.value
  const todo = new Desk(title, description, user, bgColor)

  data.push(todo)
  render(data, listContentTodoElement)
  // formElement.reset()
}

// Перенос карточки в колонку Todo через выпадающее окно
function hendleDropDeskTodo (event) {

  const button = event.target.closest('.dropdown-item')
  if (button) {
    const value = button.value
    const desk = button.closest('.desk')
    const deskID = desk.id
    if(value == 'progress') {
      dataProggres.push(data.find((item) => item.id == `${deskID}`))
      data.forEach(function(item, i) {
        if (item.id == `${deskID}`) data.splice(i, 1)
      })
      render(dataProggres, listContentProggresElement)
      render(data, listContentTodoElement)
    }
    if(value == 'done') {
      dataDone.push(data.find((item) => item.id == `${deskID}`))
      data.forEach(function(item, i) {
        if (item.id == `${deskID}`) data.splice(i, 1)
      })
      render(dataDone, listContentDoneElement)
      render(data, listContentTodoElement)
    }
  }
}

// Перенос карточки в колонку Proggres через выпадающее окно
function hendleDropDeskProggres (event) {

  const button = event.target.closest('.dropdown-item')
  if (button) {
    const value = button.value
    const desk = button.closest('.desk')
    const deskID = desk.id
    if(value == 'todo') {
      data.push(dataProggres.find((item) => item.id == `${deskID}`))
      dataProggres.forEach(function(item, i) {
        if (item.id == `${deskID}`) dataProggres.splice(i, 1)
      })
      render(dataProggres, listContentProggresElement)
      render(data, listContentTodoElement)
    }
    if(value == 'done') {
      dataDone.push(dataProggres.find((item) => item.id == `${deskID}`))
      dataProggres.forEach(function(item, i) {
        if (item.id == `${deskID}`) dataProggres.splice(i, 1)
      })
      render(dataDone, listContentDoneElement)
      render(dataProggres, listContentProggresElement)
    }
  }
}

// Перенос карточки в колонку Done через выпадающее окно
function hendleDropDeskDone (event) {

  const button = event.target.closest('.dropdown-item')
  if (button) {
    const value = button.value
    const desk = button.closest('.desk')
    const deskID = desk.id
    if(value == 'progress') {
      dataProggres.push(dataDone.find((item) => item.id == `${deskID}`))
      dataDone.forEach(function(item, i) {
        if (item.id == `${deskID}`) dataDone.splice(i, 1)
      })
      render(dataProggres, listContentProggresElement)
      render(dataDone, listContentDoneElement)
    }
    if(value == 'todo') {
      data.push(dataDone.find((item) => item.id == `${deskID}`))
      dataDone.forEach(function(item, i) {
        if (item.id == `${deskID}`) dataDone.splice(i, 1)
      })
      render(dataDone, listContentDoneElement)
      render(data, listContentTodoElement)
    }
  }
}

// Удаление определенной карточки через Remove
function hendleDeleteCard (event) {
  const button = event.target
  const role = button.role
  console.log(role)
  if (role == 'deleteCard') {
    const desk = button.closest('.desk')
    const deskID = desk.id
    console.log(desk)
    console.log(deskID)
    const list = desk.closest('.list__content')
    const listID = list.id
    console.log(list)
    console.log(listID)
    if (listID == 'listContentTodo') {
      data = data.filter((item) => item.id != deskID)
      render(data, listContentTodoElement)
    }
    if (listID == 'listContentProggres') {
      dataProggres = dataProggres.filter((item) => item.id != deskID)
      render(dataProggres, listContentProggresElement)
    }
    if (listID == 'listContentDone') {
      dataDone = dataDone.filter((item) => item.id != deskID)
      render(dataDone, listContentDoneElement)
    }
  }
}

// Удаление все карточек в колонке Done
function hendleDeleteAllCard () {
  dataDone.length = 0
  render(dataDone, listContentDoneElement)
}

// Constructors
function Desk (title, description, user, bgColor) {

  this.id = new Date().getTime()
  this.date = new Date().toISOString()
  this.title = title
  this.description = description
  this.user = user
  this.bgColor = bgColor

}

// Templates

function buildDeskTemplate (data) {
  const time = new Date(data.date).toLocaleString()

  return `
  <div id="${data.id}" class="desk ${data.bgColor}">
    <div class="desk__head d-flex">
      <div class="desk__title">${data.title}</div>
      <time class="desk__time">${time}</time>
    </div>
    <p class="desk__text">${data.description}</p>
    <div class="desk__user">${data.user}<img></div>
    <div class="desk__navigator d-flex">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
        </button>
        <ul class="dropdown-menu">
        <li><button class="dropdown-item todo-btn" value="todo">todo</button></li>
        <li><button class="dropdown-item progress-btn" value="progress">in progress</button></li>
        <li><button class="dropdown-item done-btn" value="done">done</button></li>
      </div>
      <button class="btn btn-primary">Edit</button>
      <button class="btn btn-danger" role="deleteCard">Remove</button>
    </div>
  </div>`
}

// Helpers

function render(collection, wrapper) {
  let templates = ''
  collection.forEach((item) => {
    const template = buildDeskTemplate(item)

    templates += template
  })

  wrapper.innerHTML = templates
}

function getData () {
  return JSON.parse(localStorage.getItem('data')) || []
}

function getDataProggres () {
  return JSON.parse(localStorage.getItem('dataProggres')) || []
}

function getDataDone () {
  return JSON.parse(localStorage.getItem('dataDone')) || []
}

function setData (source, source2, source3) {
  localStorage.setItem('data', JSON.stringify(source))
  localStorage.setItem('dataProggres', JSON.stringify(source2))
  localStorage.setItem('dataDone', JSON.stringify(source3))
}

function handleBeforeUnload() {
  setData(data, dataProggres, dataDone)
}
