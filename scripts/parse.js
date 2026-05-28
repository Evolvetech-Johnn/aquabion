const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const content = fs.readFileSync('C:\\Users\\dlpun\\.gemini\\antigravity-ide\\brain\\1e783258-15ea-4961-8265-a5ac17cafbdd\\.system_generated\\steps\\9\\content.md', 'utf-8');
const dom = new JSDOM(content);
const document = dom.window.document;

function traverse(node, depth) {
  if (node.nodeType === 3) {
    const text = node.textContent.trim();
    if (text) {
      console.log(' '.repeat(depth * 2) + text);
    }
  } else if (node.nodeType === 1) {
    if (node.tagName === 'IMG' || node.tagName === 'IMAGE' || node.style.backgroundImage) {
      console.log(' '.repeat(depth * 2) + '[IMAGE: ' + (node.src || node.style.backgroundImage) + ']');
    }
    // Print common structural tags
    if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'BUTTON', 'A'].includes(node.tagName)) {
        console.log(' '.repeat(depth * 2) + `<${node.tagName}>`);
    }
    for (const child of node.childNodes) {
      traverse(child, depth + 1);
    }
  }
}

traverse(document.body, 0);
