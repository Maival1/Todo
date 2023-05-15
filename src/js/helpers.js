import { buildCardTemplate, buildCountersTemplate, buildUsersTemplate } from './tempates'


function renderUsers (data, wrapper) {
  let tempaltes = ''
  data.forEach((item) => {
    const template = buildUsersTemplate(item)
    tempaltes += template
  })
  wrapper.innerHTML = tempaltes
}

function render(data, wrapper, wrapper2, wrapper3) {
  let templates = ''
  let templatesProgress = ''
  let templatesDone = ''

  data.forEach((item) => {
    const template = buildCardTemplate(item)
    if (item.status == 'todo') {
      templates += template
    }

    if (item.status == 'progress') {
      templatesProgress += template
    }

    if (item.status == 'done') {
      templatesDone += template
    }
  })

  wrapper.innerHTML = templates
  wrapper2.innerHTML = templatesProgress
  wrapper3.innerHTML = templatesDone
}

function renderCount (data, wrapper, wrapper2, wrapper3) {
let countTodo = 0
let countProgress = 0
let countDone = 0

data.forEach((item) => {
  if (item.status == 'todo') {
    countTodo++
  }

  if (item.status == 'progress') {
    countProgress++
  }

  if (item.status == 'done') {
    countDone++
  }
})

const templatesTodo = buildCountersTemplate(countTodo)
const templatesProgress = buildCountersTemplate(countProgress)
const templatesDone = buildCountersTemplate(countDone)


wrapper.innerHTML = templatesTodo
wrapper2.innerHTML = templatesProgress
wrapper3.innerHTML = templatesDone

}


function getData() {
  return JSON.parse(localStorage.getItem('data')) || []
}

function setData(data) {
  localStorage.setItem('data', JSON.stringify(data))
}


export { getData, setData, render, renderUsers, renderCount }
