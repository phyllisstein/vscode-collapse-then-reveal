import {
  commands,
  Disposable,
  ExtensionContext,
  TextEditor,
  window,
} from 'vscode'
import debounce from 'lodash.debounce'

export class Collapser {
  disposable: Disposable

  constructor() {
    const collapseDisposable = window.onDidChangeActiveTextEditor(
      debounce(this.collapseThenReveal, 250, { leading: false, trailing: true }),
    )
    this.disposable = Disposable.from(collapseDisposable)
  }

  private collapseThenReveal = async (editor?: TextEditor) => {
    if (editor && editor.document.uri.scheme === 'file') {
      commands.executeCommand('workbench.files.action.collapseExplorerFolders')
      await commands.executeCommand('revealInExplorer')
      await Promise.resolve().then(resolve => {
        window.showTextDocument(editor.document)
      })
      return
    }

    if (editor == null && window.visibleTextEditors.length === 0) {
      await commands.executeCommand('workbench.files.action.collapseExplorerFolders')
    }
  }
}
