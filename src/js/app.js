import * as bootstrap from 'bootstrap'


// Variables

let data = []
const listContentElement = document.querySelector('#listContent')
const listAddElemnt = document.querySelector('#listAdd')
const formElement = document.querySelector('#form')
const inputListElement = document.querySelector('#inputList')
const textareaListElement = document.querySelector('#textareaList')
const userElement = document.querySelector('#user')
const bgColorElement = document.querySelector('#bgColor')
const buttonConfirmElement = document.querySelector('#confirmList')
// Listeners


// formElement.addEventListener('submit', handleSubmitForm)
buttonConfirmElement.addEventListener('click', handleSubmitForm)

// Hendlers

function handleSubmitForm (event) {
  // event.preventDefault()

  const title = inputListElement.value
  const description = textareaListElement.value
  const user = userElement.value
  const bgColor = bgColorElement.value
  const todo = new Desk(title, description, user, bgColor)

  data.push(todo)
  console.log(data)

  render(data, listContentElement)
  // formElement.reset()
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
  const date = new Date(data.date).toLocaleString()

  return `
  <div class="desk ${data.bgColor}">
  <div class="desk__head d-flex">
    <div class="desk__title">${data.title}</div>
    <time class="desk__time">${date}</time>
  </div>
  <p class="desk__text">${data.description}</p>
  <div class="desk__user">${data.user}<img></div>
  <div class="desk__navigator d-flex">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">todo</a></li>
        <li><a class="dropdown-item" href="#">in progress</a></li>
        <li><a class="dropdown-item" href="#">done</a></li>
      </ul>
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

// Modal

// const exampleModal = document.getElementById('exampleModal')
// if (exampleModal) {
//   exampleModal.addEventListener('show.bs.modal', event => {
//     // Button that triggered the modal
//     const button = event.relatedTarget
//     // Extract info from data-bs-* attributes
//     const recipient = button.getAttribute('data-bs-whatever')
//     // If necessary, you could initiate an Ajax request here
//     // and then do the updating in a callback.

//     // Update the modal's content.
//     const modalTitle = exampleModal.querySelector('.modal-title')
//     const modalBodyInput = exampleModal.querySelector('.modal-body input')

//     modalTitle.textContent = `New message to ${recipient}`
//     modalBodyInput.value = recipient
//   })
// }
