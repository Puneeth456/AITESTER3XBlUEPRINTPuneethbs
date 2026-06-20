export function parseAdf(node) {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.type === 'text') return node.text || ''

  const children = node.content || []

  switch (node.type) {
    case 'doc':
      return children.map(parseAdf).join('\n')
    case 'paragraph':
      return children.map(parseAdf).join('') + '\n'
    case 'heading':
      return '#'.repeat(node.attrs?.level || 1) + ' ' + children.map(parseAdf).join('') + '\n'
    case 'bulletList':
      return children.map((item) => '• ' + parseAdf(item).trim()).join('\n') + '\n'
    case 'orderedList':
      return children.map((item, i) => `${i + 1}. ` + parseAdf(item).trim()).join('\n') + '\n'
    case 'listItem':
      return children.map(parseAdf).join(' ')
    case 'codeBlock':
      return '```\n' + children.map(parseAdf).join('') + '\n```\n'
    case 'code':
      return '`' + (node.text || '') + '`'
    case 'hardBreak':
      return '\n'
    case 'rule':
      return '\n---\n'
    case 'blockquote':
      return children.map(parseAdf).join('').split('\n').map(l => '> ' + l).join('\n') + '\n'
    case 'table':
      return children.map(parseAdf).join('\n') + '\n'
    case 'tableRow':
      return '| ' + children.map(parseAdf).join(' | ') + ' |'
    case 'tableHeader':
    case 'tableCell':
      return children.map(parseAdf).join('').trim()
    default:
      return children.map(parseAdf).join('')
  }
}
