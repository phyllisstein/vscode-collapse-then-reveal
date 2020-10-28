import * as vscode from 'vscode'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'

export class Collapser {
  disposable: vscode.Disposable

  constructor() {
    const collapseDisposable = vscode.window.onDidChangeActiveTextEditor(
      this.collapseThenReveal
    )
    this.disposable = vscode.Disposable.from(collapseDisposable)
  }

  private collapseThenReveal = async (editor?: vscode.TextEditor) => {
    if (editor && editor.document.uri.scheme === 'file') {
      await vscode.commands.executeCommand('workbench.files.action.collapseExplorerFolders')
      await vscode.commands.executeCommand('revealInExplorer')
      await vscode.window.showTextDocument(editor.document)
      return
    }
  }
}
