import {Collapser} from './collapser'
import {ExtensionContext} from 'vscode'

export function activate(context: ExtensionContext) {
  const collapser = new Collapser()
  context.subscriptions.push(collapser.disposable)
}
