import Panel from './Panel'
import Viewport from './Viewport'
import PersistState from '../core/PersistState'
import { PersistStateKey, EventLikeType } from '../core/constants'
import LocalEvent from './Entity/LocalEvent'
import Outliner from './Outliner'
import State from '../core/State'

export default class App {
  viewport = {}

  panel = {}

  outliner = {}

  element = {}

  localEventState = {}

  editable = {}

  constructor() {
    this.element = document.createElement('main')
    this.element.classList.add('app')
    this.viewport = new Viewport(this)
    this.panel = new Panel(this)
    this.outliner = new Outliner(this)
    this.localEventState = new PersistState(PersistStateKey.LOCAL_EVENT, [])
    this.editable = new State({})
  }

  start() {
    this.panel.form.element.addEventListener(
      EventLikeType.FORM_VALIDATED,
      this.onFormValidate.bind(this)
    )

    this.outliner.start()
    this.viewport.start()
    this.panel.start()

    this.render()
  }

  onFormValidate({ detail }) {
    const localEvent = new LocalEvent(detail)
    this.editable.set(() => ({}))
    this.localEventState.set((state) => [localEvent.toJson(), ...state])
  }

  render() {
    document.body.appendChild(this.element)
  }
}
