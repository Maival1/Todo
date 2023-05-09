// import * as bootstrap from 'bootstrap'


// // Variables

// let data = getData() // Данные колонки Todo
// let dataProggres = getDataProggres() // Данные колонки Proggres
// let dataDone = getDataDone() // Данные колонки Done
// const listContentTodoElement = document.querySelector('#listContentTodo')
// const listContentProggresElement = document.querySelector('#listContentProggres')
// const listContentDoneElement = document.querySelector('#listContentDone')
// const formElement = document.querySelector('#form')
// const inputListElement = document.querySelector('#inputList')
// const textareaListElement = document.querySelector('#textareaList')
// const userElement = document.querySelector('#user')
// const bgColorElement = document.querySelector('#bgColor')
// const todoMainElement = document.querySelector('#todoMain')
// const buttonDeleteAll = document.querySelector('#deleteAll')
// const exampleModal = document.getElementById('exampleModal2')


// // Listeners

// formElement.addEventListener('submit', handleSubmitForm) // Добавление карточки
// listContentTodoElement.addEventListener('click', hendleDropDeskTodo) // Перенос карточки в Todo
// listContentProggresElement.addEventListener('click', hendleDropDeskProggres) // Перенос карточки в Proggres
// listContentDoneElement.addEventListener('click', hendleDropDeskDone) // Перенос карточк в Done
// todoMainElement.addEventListener('click', hendleDeleteCard) // Удаление карточки через кнопку Remove
// buttonDeleteAll.addEventListener('click', hendleDeleteAllCard) // Удаление всех карточек в Done
// exampleModal.addEventListener('show.bs.modal', hendleEditForm)
// window.addEventListener('beforeunload', handleBeforeUnload)

// // Init

// render(data, listContentTodoElement)
// render(dataProggres, listContentProggresElement)
// render(dataDone, listContentDoneElement)


// // Hendlers

// // Открытие формы через Edit
// function hendleEditForm(event) {
//   const button = event.relatedTarget
//   // Extract info from data-bs-* attributes
//   const recipient = button.getAttribute('data-bs-whatever')
//   // If necessary, you could initiate an Ajax request here
//   // and then do the updating in a callback.

//   // Update the modal's content.
//   const modalTitle = exampleModal.querySelector('.modal-title')
//   const modalBodyInput = exampleModal.querySelector('.modal-body input')
//   const modalTextArea = exampleModal.querySelector('#textareaList2')
//   const modalBgColor = exampleModal.querySelector('#bgColor2')
//   const modalUser = exampleModal.querySelector('#user2')

//   modalTitle.textContent = `New message to ${recipient}`
//   modalBodyInput.value = recipient

//   // Получение нужной карточки в нужной колонки
//   const desk = button.closest('.desk')
//   const deskID = desk.id
//   const list = desk.closest('.list__content')
//   const listID = list.id


//   // Отрисовка имеющихся значений в форме через edit
//   if (listID == 'listContentTodo') {
//     const deskOpen = data.find((card) => card.id == deskID)
//     // Делаем selected в форме edit
//     for (let i = 0; i < modalBgColor.options.length; i++) {
//       const option = modalBgColor.options[i]
//       if (option.value === deskOpen.bgColor) {
//         option.selected = true
//         break
//       }
//     }

//     // Передаем данные в Textarea
//     modalTextArea.textContent = deskOpen.description
//   }

//   if (listID == 'listContentProggres') {
//     const deskOpen = dataProggres.find((card) => card.id == deskID)

//     // Делаем selected в форме edit
//     for (let i = 0; i < modalBgColor.options.length; i++) {
//       const option = modalBgColor.options[i]
//       if (option.value === deskOpen.bgColor) {
//         option.selected = true
//         break
//       }
//     }

//     // Передаем данные в Textarea
//     modalTextArea.textContent = deskOpen.description
//   }

//   if (listID == 'listContentDone') {
//     const deskOpen = dataDone.find((card) => card.id == deskID)

//     // Делаем selected в форме edit
//     for (let i = 0; i < modalBgColor.options.length; i++) {
//       const option = modalBgColor.options[i]
//       if (option.value === deskOpen.bgColor) {
//         option.selected = true
//         break
//       }
//     }

//     // Передаем данные в Textarea
//     modalTextArea.textContent = deskOpen.description
//   }
// }

// // Отправка формы и отрисовка
// function handleSubmitForm(event) {
//   event.preventDefault()

//   const title = inputListElement.value
//   const description = textareaListElement.value
//   const user = userElement.value
//   const bgColor = bgColorElement.value
//   const todo = new Desk(title, description, user, bgColor)

//   data.push(todo)
//   render(data, listContentTodoElement)
//   formElement.reset()
// }

// // Перенос карточки из колонки Todo через выпадающее окно
// function hendleDropDeskTodo(event) {

//   const button = event.target.closest('.dropdown-item')
//   if (button) {
//     const value = button.value
//     const desk = button.closest('.desk')
//     const deskID = desk.id
//     if (value == 'progress') {
//       if (dataProggres.length <= 5) {
//         console.log(dataProggres.length)
//         dataProggres.push(data.find((item) => item.id == `${deskID}`))
//         data.forEach(function (item, i) {
//           if (item.id == `${deskID}`) data.splice(i, 1)
//         })
//         render(dataProggres, listContentProggresElement)
//         render(data, listContentTodoElement)
//       } else {
//         alert('В данной колонке может быть только 6 дел')
//       }

//     }
//     if (value == 'done') {
//       dataDone.push(data.find((item) => item.id == `${deskID}`))
//       data.forEach(function (item, i) {
//         if (item.id == `${deskID}`) data.splice(i, 1)
//       })
//       render(dataDone, listContentDoneElement)
//       render(data, listContentTodoElement)
//     }
//   }
// }

// // Перенос карточки из колонки Proggres через выпадающее окно
// function hendleDropDeskProggres(event) {

//   const button = event.target.closest('.dropdown-item')
//   if (button) {
//     const value = button.value
//     const desk = button.closest('.desk')
//     const deskID = desk.id
//     if (value == 'todo') {
//       data.push(dataProggres.find((item) => item.id == `${deskID}`))
//       dataProggres.forEach(function (item, i) {
//         if (item.id == `${deskID}`) dataProggres.splice(i, 1)
//       })
//       render(dataProggres, listContentProggresElement)
//       render(data, listContentTodoElement)
//     }
//     if (value == 'done') {
//       dataDone.push(dataProggres.find((item) => item.id == `${deskID}`))
//       dataProggres.forEach(function (item, i) {
//         if (item.id == `${deskID}`) dataProggres.splice(i, 1)
//       })
//       render(dataDone, listContentDoneElement)
//       render(dataProggres, listContentProggresElement)
//     }
//   }
// }

// // Перенос карточки из колонки Done через выпадающее окно
// function hendleDropDeskDone(event) {

//   const button = event.target.closest('.dropdown-item')
//   if (button) {
//     const value = button.value
//     const desk = button.closest('.desk')
//     const deskID = desk.id
//     if (value == 'progress') {
//       if (dataProggres.length <= 5) {
//         dataProggres.push(dataDone.find((item) => item.id == `${deskID}`))
//         dataDone.forEach(function (item, i) {
//           if (item.id == `${deskID}`) dataDone.splice(i, 1)
//         })
//         render(dataProggres, listContentProggresElement)
//         render(dataDone, listContentDoneElement)
//       } else {
//         alert('В данной колонке может быть только 6 дел')
//       }

//     }
//     if (value == 'todo') {
//       data.push(dataDone.find((item) => item.id == `${deskID}`))
//       dataDone.forEach(function (item, i) {
//         if (item.id == `${deskID}`) dataDone.splice(i, 1)
//       })
//       render(dataDone, listContentDoneElement)
//       render(data, listContentTodoElement)
//     }
//   }
// }

// // Удаление определенной карточки через Remove
// function hendleDeleteCard(event) {
//   const button = event.target
//   const role = button.role
//   if (role == 'deleteCard') {
//     const desk = button.closest('.desk')
//     const deskID = desk.id
//     const list = desk.closest('.list__content')
//     const listID = list.id
//     if (listID == 'listContentTodo') {
//       data = data.filter((item) => item.id != deskID)
//       render(data, listContentTodoElement)
//     }
//     if (listID == 'listContentProggres') {
//       dataProggres = dataProggres.filter((item) => item.id != deskID)
//       render(dataProggres, listContentProggresElement)
//     }
//     if (listID == 'listContentDone') {
//       dataDone = dataDone.filter((item) => item.id != deskID)
//       render(dataDone, listContentDoneElement)
//     }
//   }
// }

// // Удаление все карточек в колонке Done
// function hendleDeleteAllCard() {
//   dataDone.length = 0
//   render(dataDone, listContentDoneElement)
// }

// // Constructors
// function Desk(title, description, user, bgColor) {

//   this.id = new Date().getTime()
//   this.date = new Date().toISOString()
//   this.title = title
//   this.description = description
//   this.user = user
//   this.bgColor = bgColor

// }

// // Templates

// function buildDeskTemplate(data) {
//   const time = new Date(data.date).toLocaleString()

//   return `
//   <div id="${data.id}" class="desk ${data.bgColor}">
//     <div class="desk__head d-flex">
//       <div class="desk__title">${data.title}</div>
//       <time class="desk__time">${time}</time>
//     </div>
//     <p class="desk__text">${data.description}</p>
//     <div class="desk__user">${data.user}<img></div>
//     <div class="desk__navigator d-flex">
//       <div class="dropdown">
//         <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//         Dropdown button
//         </button>
//         <ul class="dropdown-menu" data-role="select>
//         <li><button class="dropdown-item todo-btn" value="todo">todo</button></li>
//         <li><button class="dropdown-item progress-btn" value="progress">in progress</button></li>
//         <li><button class="dropdown-item done-btn" value="done">done</button></li>
//       </div>
//       <button type="button" class="btn btn-info" role="edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="${data.title}">Edit</button>
//       <button class="btn btn-danger" role="deleteCard">Remove</button>
//     </div>
//   </div>`
// }



// // Helpers

// // function render(collection, wrapper) {
// //   let templates = ''
// //   collection.forEach((item) => {
// //     const template = buildDeskTemplate(item)

// //     templates += template
// //   })

// //   wrapper.innerHTML = templates
// // }

// function getData() {
//   return JSON.parse(localStorage.getItem('data')) || []
// }

// function getDataProggres() {
//   return JSON.parse(localStorage.getItem('dataProggres')) || []
// }

// function getDataDone() {
//   return JSON.parse(localStorage.getItem('dataDone')) || []
// }

// function setData(source, source2, source3) {
//   localStorage.setItem('data', JSON.stringify(source))
//   localStorage.setItem('dataProggres', JSON.stringify(source2))
//   localStorage.setItem('dataDone', JSON.stringify(source3))
// }

// function handleBeforeUnload() {
//   setData(data, dataProggres, dataDone)
// }



