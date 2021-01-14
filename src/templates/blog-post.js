import React from "react"
import urlJoin from "url-join"  // need: url-join

// FYI: https://webcraftlog.net/best-gatsbyjs-plugins/
import Layout from "@components/layout"
import SEO from "@components/seo"
import PAGINATION from "@components/pagination"
import Share from "@components/share"

////  css in JS(emotion)  ////
import Style from "./blog-post.module.css"
/*
import { css } from "@emotion/react";  // need: @emotion/react FYI: https://blog.ojisan.io/s-c-kigo
const Style_container = css`
  background-color: lightblue;
  border: solid 2px;
  border-radius: 2vh;
  padding: 10px;
  h1, h2 {
    padding: 1rem 2rem;
    border: 3px solid #000;
    border-radius: 50vw 0 0 50vw;
    background-color: yellowgreen;
    font-size: 5vh;
  }

  h1:first-letter, .container h2:first-letter {
    font-size: 150%;
    border: 1px solid green;
    border-radius: 10vw;
    background-color: lime;
  }
`

const Style_contents = css`
  img {
    max-width: 640px;
    max-height: 480px;
    width: auto;
    height: auto;
  }
`
*/

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
