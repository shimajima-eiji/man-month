import React from "react"
import urlJoin from "url-join"  // need: url-join

// FYI: https://webcraftlog.net/best-gatsbyjs-plugins/
import Layout from "@components/layout"
import SEO from "@components/seo"
import PAGINATION from "@components/pagination"
import Share from "@components/share"

import Style from "./blog-post.module.css"

export default ( { pageContext } ) =>
{
  const { title, description, childConvertHtml, door, mainId, updatedAt, publishedAt, tags } = pageContext.post
  const body = childConvertHtml.convertedHtml
  const sns_title = title + " #" + pageContext.site.title
  const url = urlJoin( pageContext.site.url, mainId )
  console.log( door.url )
  return (
    <Layout>
      <SEO title={ title }
        description={ description }
        image={ door.url }
      />
      <article className={ Style.container }>
        <h1>{ title }</h1>
        <p><span>最終更新:{ updatedAt }（初公開:{ publishedAt }）</span></p>
        <Share
          title={ sns_title }
          url={ url }
        />
        <section className={ Style.contents } dangerouslySetInnerHTML={ { __html: body } } />
        <Share
          title={ sns_title }
          url={ url }
        />
        <nav dangerouslySetInnerHTML={ {
          __html: ( tags.length === 1 && tags[ 0 ] === "（未選択）" )
            ? ""
            : "<h1>関連キーワード・ハッシュタグ</h1>" + tags.map( tag => tag )
        } }
        />
      </article>
      <PAGINATION prev={ pageContext.prev } next={ pageContext.next }></PAGINATION>
    </Layout>
  )
}
