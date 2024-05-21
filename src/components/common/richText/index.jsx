import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import EmbeddedEntryContainer from './embeddedEntry.jsx'
import EmbeddedAssetContainer from './embeddedAsset.jsx'
import HyperlinkContainer from './hyperlink.jsx'
import Blurb from '@components/common/blurb'

const defaultParser = (options) => ({
  renderText: (text) =>
    text
      .split('\n')
      .reduce(
        (children, textSegment, index) => [
          ...children,
          index > 0 && <br key={index} />,
          textSegment,
        ],
        []
      ),
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="my-4 font-tacticSansExt text-[40px] font-extrabold uppercase leading-[48px] lg:text-5xl lg:leading-[56px] xl:text-6xl xl:leading-[64px]">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="my-4 font-tacticSansExt text-[40px] font-extrabold uppercase leading-[48px] lg:text-5xl lg:leading-[56px] xl:text-6xl xl:leading-[64px]">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="my-4 w-full font-tacticSansExt text-xl lg:text-2xl xl:text-4xl">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="text-l my-4 w-full font-tacticSansExt lg:text-xl xl:text-2xl">
        {children}
      </h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5 className="text-md lg:text-l my-4 w-full font-tacticSansExt xl:text-xl">
        {children}
      </h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <p className="w-full font-itcGothic text-[22px] leading-10">{children}</p>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="w-full text-lg leading-8">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="my-2 w-full text-left">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="my-2 w-full list-decimal text-left">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (node, children) => <Blurb>{children}</Blurb>,
    [BLOCKS.HR]: () => (
      <hr className="my-12 w-[240px] border-2 border-orange" />
    ),
    [BLOCKS.TABLE]: (node, children) => (
      <table className="w-full table-auto border-2 border-neutral-50 text-left">
        {children}
      </table>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
      <th className="border-b-2 border-r-2 border-neutral-50 pl-2">
        {children}
      </th>
    ),
    [BLOCKS.TABLE_ROW]: (node, children) => (
      <tr className="border-b-2 border-r-2 border-neutral-50 pl-2">
        {children}
      </tr>
    ),
    [BLOCKS.TABLE_CELL]: (node, children) => (
      <td className="border-b-2 border-r-2 border-neutral-50 pl-2">
        {children}
      </td>
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => (
      <EmbeddedEntryContainer node={node} {...options}>
        {children}
      </EmbeddedEntryContainer>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
      <EmbeddedAssetContainer node={node} {...options}>
        {children}
      </EmbeddedAssetContainer>
    ),
    [INLINES.EMBEDDED_ENTRY]: (node, children) => (
      <EmbeddedEntryContainer node={node} {...options}>
        {children}
      </EmbeddedEntryContainer>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <HyperlinkContainer node={node} {...options}>
        {children}
      </HyperlinkContainer>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node, children) => (
      <HyperlinkContainer node={node} {...options}>
        {children}
      </HyperlinkContainer>
    ),
    [INLINES.ASSET_HYPERLINK]: (node, children) => (
      <HyperlinkContainer node={node} {...options}>
        {children}
      </HyperlinkContainer>
    ),
  },
})

export const renderRichText = (
  richText,
  options,
  customParser = defaultParser
) => {
  if (!richText) return null
  // Case for preview
  // Need to manually query for references
  if (!richText?.raw)
    return documentToReactComponents(richText, customParser(options))
  // Case where richText is in the shape {raw, references}
  // Gatsby-source-contentful generates `raw` and `references`
  return documentToReactComponents(
    JSON.parse(richText?.raw),
    customParser({ references: richText?.references, ...options })
  )
}
