import {
  commands,
  ExtensionContext,
  TextEditor,
  window,
} from 'vscode'
import debounce from 'lodash.debounce'
import head from 'lodash.head'

export function activate(context: ExtensionContext) {
  context.subscriptions.push(window.onDidChangeVisibleTextEditors(debounce(collapseThenReveal, 0, { leading: false, trailing: true })))
}

async function collapseThenReveal(editors?: TextEditor[]) {
  if (editors && editors.length && head(editors)!.document.uri.scheme === 'file') {
    await commands.executeCommand('workbench.files.action.collapseExplorerFolders')
    await commands.executeCommand('revealInExplorer')
    window.showTextDocument(editors[0].document)
  }
}
