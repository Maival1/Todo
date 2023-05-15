function Card(title, description, user, bgColor) {

  this.id = new Date().getTime()
  this.date = new Date().toISOString()
  this.title = title
  this.description = description
  this.user = user
  this.bgColor = bgColor
  this.status = 'todo'

}

export { Card }
