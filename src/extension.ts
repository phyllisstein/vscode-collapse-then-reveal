import {
	commands,
	ExtensionContext,
	TextEditor,
	window,
} from 'vscode'

export function activate(context: ExtensionContext) {
	context.subscriptions.push(window.onDidChangeActiveTextEditor(collapseThenReveal))
}

function collapseThenReveal(editor?: TextEditor) {
	commands.executeCommand('workbench.files.action.collapseExplorerFolders')

	if (editor) {
		commands.executeCommand('revealInExplorer')
		window.showTextDocument(editor.document)
	}
}
