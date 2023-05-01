import * as bootstrap from 'bootstrap'


// Variables

let data = []
let dataProggres = []
let dataDone = []
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



// Listeners


formElement.addEventListener('submit', handleSubmitForm)

listContentTodoElement.addEventListener('click', hendleDropDeskTodo)
listContentProggresElement.addEventListener('click', hendleDropDeskProggres)
listContentDoneElement.addEventListener('click', hendleDropDeskDone)

// Hendlers

function handleSubmitForm (event) {
  event.preventDefault()

  const title = inputListElement.value
  const description = textareaListElement.value
  const user = userElement.value
  const bgColor = bgColorElement.value
  const todo = new Desk(title, description, user, bgColor)

  data.push(todo)
  console.log(data)

  render(data, listContentTodoElement)
  // formElement.reset()
}

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
        <li><button class="dropdown-item todo-btn" value="todo"  >todo</button></li>
        <li><button class="dropdown-item progress-btn" value="progress">in progress</button></li>
        <li><button class="dropdown-item done-btn" value="done">done</button></li>
    </div>
    <button class="btn btn-primary">Edit</button>
    <button class="btn btn-danger">Remove</button>
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

