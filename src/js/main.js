// import * as bootstrap from 'bootstrap'
import { getData, setData, render, renderUsers, renderCount } from './helpers'
import { users } from './server'
import { Card } from './constructor'
import { Modal } from 'bootstrap'

// Variables

let data = getData()
const listContentTodoElement = document.querySelector('#listContentTodo')
const listContentProgressElement = document.querySelector('#listContentProgress')
const listContentDoneElement = document.querySelector('#listContentDone')
const formElement = document.querySelector('#form')
const formChangeElement = document.querySelector('#form2')
const inputListElement = document.querySelector('#inputList')
const textareaListElement = document.querySelector('#textareaList')
const userElement = document.querySelector('#user')
const user2Element = document.querySelector('#user2')
const bgColorElement = document.querySelector('#bgColor')
const todoElement = document.querySelector('#todo')
const buttonDeleteAll = document.querySelector('#deleteAll')
const buttonModalDeleteAll = document.querySelector('#deleteAllCard')
const exampleModal = document.getElementById('exampleModal2')
const modalProgressElement = document.querySelector('#modalProgress')
const modalDeleteAllElemnt = document.querySelector('#modalDelete')
const countTodoElement = document.querySelector('#countTodo')
const countProgressElement = document.querySelector('#countProgress')
const countDoneElement = document.querySelector('#countDone')
const hourElement = document.querySelector('#hour')
const minuteElement = document.querySelector('#minute')
const secondElement = document.querySelector('#second')

const modalTitle = exampleModal.querySelector('.modal-title')
const modalBodyInput = exampleModal.querySelector('.modal-body input')
const modalTextArea = exampleModal.querySelector('#textareaList2')
const modalBgColor = exampleModal.querySelector('#bgColor2')
const modalUser = exampleModal.querySelector('#user2')
const cardIdInput = exampleModal.querySelector('#card-id-input')

// const progressModal = new bootstrap.Modal(modalProgressElement)
const progressModal = new Modal(modalProgressElement)
const modalDeleteAll = new Modal(modalDeleteAllElemnt)


// Listeners

formElement.addEventListener('submit', handleSubmitForm) // Добавление карточки
todoElement.addEventListener('change', changeStatus) // Перенос в другую колонку через Select status
todoElement.addEventListener('click', hendleDeleteCard) // Удаление карточки через кнопку Remove
buttonDeleteAll.addEventListener('click', hendleDeleteAllCard) // Вызов модалки после нажатие Delete All
window.addEventListener('beforeunload', handleBeforeUnload) // Вызов данных
exampleModal.addEventListener('show.bs.modal', hendleEditForm) // Открытие формы через Edit
buttonModalDeleteAll.addEventListener('click', modalDeleteAllDone) // Удаляет все данные в Done после потверждения
formChangeElement.addEventListener('submit', hendleSumbitEditForm)

// Init
users('https://jsonplaceholder.typicode.com/users/')
  .then(data => {
    // Users for first modal
    renderUsers(data, userElement)
    // Users for second modal
    renderUsers(data, user2Element)
  })

// Time
setInterval(() => {
  const deg = 6
  let day = new Date()

  let hour = day.getHours() * 30
  let min = day.getMinutes() * deg
  let sec = day.getSeconds() * deg

  hourElement.style.transform = `rotateZ(${(hour) + (min / 12)}deg)`
  minuteElement.style.transform = `rotateZ(${(min)}deg)`
  secondElement.style.transform = `rotateZ(${(sec)}deg)`
})

render(data, listContentTodoElement, listContentProgressElement, listContentDoneElement)
renderCount(data, countTodoElement, countProgressElement, countDoneElement)

// Hendlers


// Открытие формы через Edit
function hendleEditForm (event) {
  const button = event.relatedTarget
  // Extract info from data-bs-* attributes
  const recipient = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an Ajax request here
  // and then do the updating in a callback.

  // Update the modal's content.

  modalTitle.textContent = `New message to ${recipient}`
  modalBodyInput.value = recipient

  // Получение нужной карточки
  const cardID = button.getAttribute('data-bs-card-id')
  // Отрисовка имеющихся значений в форме через edit
  const cardOpen = data.find((card) => card.id == cardID)
  cardIdInput.value = cardID
  console.log(cardID)
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
  modalTextArea.value = cardOpen.description
  // Делаем отправку формы с переданными и измененными данными
}

function hendleSumbitEditForm (event) {
  event.preventDefault()

  const cardID = cardIdInput.value
  const title = modalBodyInput.value
  const description = modalTextArea.value
  const user = modalUser.value
  const bgColor = modalBgColor.value

  const newData = { title, description, user, bgColor }
  const todoIndex = data.findIndex(todo => todo.id == cardID)

  if (todoIndex >= 0) {
    // создаем новый объект, используя старый объект и новые данные
    const updatedTodo = { ...data[todoIndex], ...newData }
    // заменяем старый объект на обновленный в массиве data
    data.splice(todoIndex, 1, updatedTodo)
    render(data, listContentTodoElement, listContentProgressElement, listContentDoneElement)
    renderCount(data, countTodoElement, countProgressElement, countDoneElement)
  }
}

function handleSubmitForm(event) {
  event.preventDefault()

  const title = inputListElement.value
  const description = textareaListElement.value
  const user = userElement.value
  const bgColor = bgColorElement.value
  const todo = new Card(title, description, user, bgColor)

  data.push(todo)
  render(data, listContentTodoElement, listContentProgressElement, listContentDoneElement)
  renderCount(data, countTodoElement, countProgressElement, countDoneElement)
  formElement.reset()
}

function changeStatus(event) {
  const card = event.target.closest('.card')
  const selectedStatus = event.target.value
  const id = card.id
  const progressCards = data.filter(card => card.status === 'progress')

  if (selectedStatus == 'todo') {
    let datas = data.find((card) => card.id == id)
    datas.status = 'todo'
    render(data, listContentTodoElement, listContentProgressElement, listContentDoneElement)
    renderCount(data, countTodoElement, countProgressElement, countDoneElement)
  }
  if (selectedStatus == 'progress') {
    if (progressCards.length <= 5) {
      let datas = data.find((card) => card.id == id)
      datas.status = 'progress'
      render(data, listContentTodoElement, listContentProgressElement, listContentDoneElement)
      renderCount(data, countTodoElement, countProgressElement, countDoneElement)
    } else {
      progressModal.show()
      render(data, listContentTodoElement, listContentProgressElement, listContentDoneElement)
      renderCount(data, countTodoElement, countProgressElement, countDoneElement)
    }

  }
  if (selectedStatus == 'done') {
    let datas = data.find((card) => card.id == id)
    datas.status = 'done'
    render(data, listContentTodoElement, listContentProgressElement, listContentDoneElement)
    renderCount(data, countTodoElement, countProgressElement, countDoneElement)
  }
}

// Удаление определенной карточки через Remove
function hendleDeleteCard(event) {
  const { target: button} = event
  const role = button.role
  if (role == 'deleteCard') {
    const card = button.closest('.card')
    const cardID = card.id
    data = data.filter((item) => item.id != cardID)
    render(data, listContentTodoElement, listContentProgressElement, listContentDoneElement)
    renderCount(data, countTodoElement, countProgressElement, countDoneElement)
  }
}

// Удаление все карточек в колонке Done
function hendleDeleteAllCard() {
  modalDeleteAll.show()

}

function modalDeleteAllDone() {
  const doneCards = data.filter(card => card.status === 'done')
  doneCards.forEach(card => {
    const index = data.indexOf(card)
    if (index !== -1) {
      data.splice(index, 1)
    }
  })
  render(data, listContentTodoElement, listContentProgressElement, listContentDoneElement)
  renderCount(data, countTodoElement, countProgressElement, countDoneElement)
}


function handleBeforeUnload() {
  setData(data)
}



todoElement.addEventListener('dragstart', drag)
todoElement.addEventListener('dragend', dragEnd)


function drag(event) {
  const card = event.target.closest('.card')
  card.classList.add('dragging')
  console.log(card)
}

function dragEnd() {
  const dragging = document.querySelector('.dragging')
  dragging.classList.remove('dragging')
  console.log(dragging)
}

listContentTodoElement.addEventListener('dragover', (e) => {
  e.preventDefault()
  const afterElement = getDraggingAfreElement(listContentTodoElement, e.clientY)
  const dragging = document.querySelector('.dragging')
  const cardId = dragging.id
  let datas = data.find((card) => card.id == cardId)
  datas.status = 'todo'

  if (afterElement == null) {
    listContentTodoElement.append(dragging)
  } else {
    listContentTodoElement.insertBefore(dragging, afterElement)
  }
})

listContentProgressElement.addEventListener('dragover', (e) => {
  e.preventDefault()
  const afterElement = getDraggingAfreElement(listContentProgressElement, e.clientY)
  const dragging = document.querySelector('.dragging')
  const cardId = dragging.id
  let datas = data.find((card) => card.id == cardId)
  datas.status = 'progress'

  if (afterElement == null) {
    listContentProgressElement.append(dragging)
  } else {
    listContentProgressElement.insertBefore(dragging, afterElement)
  }
})

listContentDoneElement.addEventListener('dragover', (e) => {
  e.preventDefault()
  const afterElement = getDraggingAfreElement(listContentDoneElement, e.clientY)
  const dragging = document.querySelector('.dragging')
  const cardId = dragging.id
  let datas = data.find((card) => card.id == cardId)
  datas.status = 'done'

  if (afterElement == null) {
    listContentDoneElement.append(dragging)
  } else {
    listContentDoneElement.insertBefore(dragging, afterElement)
  }
})

function getDraggingAfreElement (container, y) {
  const draggablElement = [...container.querySelectorAll('.card:not(.dragging)')]

 return draggablElement.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
   if ( offset < 0 && offset > closest.offset) {
    return { offset: offset, element: child}
   } else {
    return closest
   }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

