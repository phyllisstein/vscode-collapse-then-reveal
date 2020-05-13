import {
  commands,
  ExtensionContext,
  TextEditor,
  window,
} from 'vscode'

export function activate(context: ExtensionContext) {
  context.subscriptions.push(window.onDidChangeVisibleTextEditors(collapseThenReveal))
}

async function collapseThenReveal(editors?: TextEditor[]) {
  if (editors && editors.length) {
    await commands.executeCommand('workbench.files.action.collapseExplorerFolders')
    await commands.executeCommand('revealInExplorer')
    window.showTextDocument(editors[0].document)
  }
}
