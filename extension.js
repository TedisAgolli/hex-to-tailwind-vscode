// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const hexToTailwind = require("hex-to-tailwind");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "hex-to-tailwind" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "hex-to-tailwind.hex-to-tailwind",
    function () {
      vscode.window
        .showInputBox({ prompt: "Hex Color", placeHolder: "#FFFFFF" })
        .then((hexInput) => {
          try {
            const { tailwind, deltaE } = hexToTailwind(hexInput);
            if (tailwind) {
              vscode.env.clipboard.writeText(tailwind);
              vscode.window.showInformationMessage(
                `Copied ${tailwind} with a deltaE of ${deltaE} to clipboard!`
              );
            }
          } catch (e) {
            console.log(e);
            vscode.window.showInformationMessage(
              "Hex to Tailwind: Invalid input."
            );
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
