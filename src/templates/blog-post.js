import React from "react"
import urlJoin from "url-join"  // need: url-join
import { StaticImage } from "gatsby-plugin-image"  // FYI: https://ebisu.com/note/new-gatsby-image/

// FYI: https://webcraftlog.net/best-gatsbyjs-plugins/
import Layout from "@components/layout"
import SEO from "@components/seo"
import PAGINATION from "@components/pagination"
import Share from "@components/share"

////  css in JS(emotion)  ////
import { css } from "@emotion/react";  // need: @emotion/react FYI: https://blog.ojisan.io/s-c-kigo

// 共通
const Style_normal_text = css`
  text-align: justify;

  p {
    font-family: 'Komorebi';
    font-display: fallback;
  }
  h1, h2, h3, h4, h5 {
    font-family: "corp";
    font-display: fallback;
  }
`

// 固有
const Style_container = css`
  background-color: lightblue;
  border: solid 2px;
  border-radius: 2vh;
  padding: 10px;

  * {
    letter-spacing: -0.05em;
  }

  img {
    max-width: 100%;
    max-height: 360px;
  }

  h1, h2, h3 {
    color: darkcyan;
    background-color: yellowgreen;
    border-top: double 10px green;
    border-bottom: double 10px green;
    border-radius: 10vw 100vw 100vw 10vw;
    padding: 10px 5vw 10px 5vw;
    margin: 0 -10px 1vh -10px;
  }

  p, li {
    font-size: 125%;
    line-height: 150%;
  }
`

const Style_contents_head = css`
  font-family: "corp";
  font-display: fallback;
`

const Style_tags = css`
  ul {
    display: flex;
  }

  li {
    list-style-type: "#";
    margin-right: 20px;
  }
`

export default ( { pageContext } ) =>
{
  const { title, description, childConvertHtml, door, mainId, updatedAt, publishedAt, tags } = pageContext.post
  const body = childConvertHtml.convertedHtml
  const sns_title = title + " #" + pageContext.site.title
  const url = urlJoin( pageContext.site.url, mainId )
  const image = door ? door.url : pageContext.site.image
  const noImage = "../images/icon.webp"

  return (
    <Layout>
      <SEO title={ title }
        description={ description }
        url={ mainId }
        image={ image }
      />
      <div css={ Style_container }>
        <article>
          <h1 css={ Style_contents_head }>{ title }</h1>
          <p><span>最終更新:{ updatedAt }（初公開:{ publishedAt }）</span></p>
          <Share
            title={ sns_title }
            url={ url }
          />
          { ( door )
            ? <img src={ door.url } alt={ title } />
            : <StaticImage
              src={ noImage }
              layout="fluid"
              style={ { width: "360px", height: "360px" } }
              alt={ title }
            />
          }
          <section css={ Style_normal_text } dangerouslySetInnerHTML={ { __html: body } } />
          < Share
            title={ sns_title }
            url={ url }
            tags={ tags }
          />
          {/* ここで生成するclassは@components/style.cssで適用する */ }
          <nav css={ Style_tags } dangerouslySetInnerHTML={ {
            __html: ( tags && tags[ 0 ] !== "（未選択）" )
              ? `<h1>関連キーワード・ハッシュタグ</h1><ul>` + tags.map( tag => `<li>${tag}</li>` ) + `</ul>`
              : null
          } }
          />
        </article>
        <nav>
          <PAGINATION prev={ pageContext.prev } next={ pageContext.next }></PAGINATION>
        </nav>
      </div>
    </Layout>
  )
}
