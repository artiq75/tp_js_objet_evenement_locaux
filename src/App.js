import Panel from './Panel'
import Viewport from './Viewport'
import PersistState from '../core/PersistState'
import { PersistStateKey, EventLikeType } from '../core/constants'
import LocalEvent from './Entity/LocalEvent'

export default class App {
  viewport = {}

  panel = {}

  element = {}

  localEventState = {}

  constructor() {
    this.element = document.createElement('main')
    this.element.classList.add('app')
    this.viewport = new Viewport(this)
    this.panel = new Panel(this)
    this.localEventState = new PersistState(PersistStateKey.LOCAL_EVENT)
  }

  start() {
    this.viewport.start()
    this.panel.start()

    console.log(this.localEventState.get())

    this.panel.form.element.addEventListener(
      EventLikeType.FORM_VALIDATE,
      this.onFormValidate.bind(this)
    )

    this.render()
  }

  onFormValidate({ detail }) {
    this.localEventState.set([
      new LocalEvent(detail),
      ...this.localEventState.get()
    ])
  }

  render() {
    document.body.appendChild(this.element)
  }
}