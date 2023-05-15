function buildCardTemplate(data) {
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

function buildUsersTemplate (data) {
  return `
    <option id="${data.id}" value="${data.name}">${data.name}</option>
  `
}


export { buildCardTemplate, buildCountersTemplate, buildUsersTemplate }
