import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'

import ts from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage('ts', ts);

const md = new MarkdownIt({
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                // This is only for full CommonMark compatibility.
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                // useful for external highlighters.
    linkify:      false,        // Autoconvert URL-like text to links
  
    // Enable some language-neutral replacement + quotes beautification
    typographer:  false,
  
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',
  
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (str, lang) {
      console.log('attempting to highlight with lang:', lang)
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (__) {}
        }
    
        return ''; // use external default escaping
      }
});

const render = (content) => md.render(content)

export default render