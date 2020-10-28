import {Collapser} from './collapser'
import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const collapser = new Collapser()
  context.subscriptions.push(collapser.disposable)
}
