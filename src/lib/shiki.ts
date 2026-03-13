import type { HighlighterCore } from '@shikijs/core'

let highlighterPromise: Promise<HighlighterCore> | null = null

export function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = Promise.all([
      import('@shikijs/core'),
      import('@shikijs/engine-javascript'),
      import('@shikijs/langs/css'),
      import('@shikijs/langs/html'),
      import('@shikijs/langs/javascript'),
      import('@shikijs/langs/typescript'),
      import('@shikijs/langs/python'),
      import('@shikijs/langs/sql'),
      import('@shikijs/langs/bash'),
      import('@shikijs/themes/one-dark-pro'),
    ]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }, langCss, langHtml, langJs, langTs, langPy, langSql, langBash, theme]) =>
      createHighlighterCore({
        engine: createJavaScriptRegexEngine(),
        themes: [theme.default],
        langs: [langCss.default, langHtml.default, langJs.default, langTs.default, langPy.default, langSql.default, langBash.default],
      })
    )
  }
  return highlighterPromise
}

export const SUPPORTED_LANGS = new Set(['css', 'html', 'javascript', 'typescript', 'python', 'sql', 'bash'])
