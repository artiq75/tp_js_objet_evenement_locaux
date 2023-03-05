import { LocalEventStatusColor } from '../../core/constants'
import Entity from '../../core/Entity'

const NOW = Date.now()

export default class LocalEvent extends Entity {
  title = null

  description = null

  lng = null

  lat = null

  start = null

  end = null

  constructor(data) {
    super()
    this.hydrate(data)
    this.start = new Date(this.start)
    this.end = new Date(this.end)
  }

  getStatus() {
    const day = Math.ceil((this.start.getTime() - NOW) / 1000 / 3600 / 24)

    if (day > 3) {
      return {
        color: LocalEventStatusColor.GREEN,
        message: ''
      }
    }

    if (day > 0) {
      return {
        color: LocalEventStatusColor.ORANGE,
        message: `Attention, commence dans ${start} jours et ${this.start.toLocaleTimeString(
          process.env.LOCALE
        )} heures`
      }
    }

    return {
      color: LocalEventStatusColor.RED,
      message: 'Quel dommage! Vous avez raté cet événement!'
    }
  }
}
