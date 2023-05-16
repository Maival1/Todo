// function Card(title, description, user, bgColor) {

//   this.id = new Date().getTime()
//   this.date = new Date().toISOString()
//   this.title = title
//   this.description = description
//   this.user = user
//   this.bgColor = bgColor
//   this.status = 'todo'

// }

class Card {
  id = crypto.randomUUID()
  status = 'todo'
  date = new Date().toISOString()

  constructor (title, description, user, bgColor) {
    this.title = title
    this.description = description
    this.user = user
    this.bgColor = bgColor
  }
}

export { Card }



