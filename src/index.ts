import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

export const GcodeLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      foldNodeProp.add({
        Object: foldInside
      }),
      styleTags({
        "StartMovement StartConfig": t.namespace,
        Extrusion: t.atom,
        Coordinates: t.className,
        Feed: t.string,
        LineComment: t.lineComment,
        "START_CURRENT_OBJECT END_CURRENT_OBJECT": t.macroName
      })
    ]
  }),
  languageData: {
    commentTokens: {
      line: ';',
      block: {
        open: "; thumbnail begin",
        close: "; thumbnail end"
      }
    }
  }
})

export function Gcode() {
  return new LanguageSupport(GcodeLanguage)
}
