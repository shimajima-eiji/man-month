import React from "react"
import { Link, graphql } from "gatsby"
import striptags from "striptags"  // FYI: https://github.com/ericnorris/striptags
import { StaticImage } from "gatsby-plugin-image"  // FYI: https://ebisu.com/note/new-gatsby-image/

// FYI: https://webcraftlog.net/best-gatsbyjs-plugins/
import Layout from "@components/layout"
import SEO from "@components/seo"
import Share from "@components/share"

import Style from "./index.module.css"
////  css in JS(emotion)  ////
/*
import { css } from "@emotion/react";  // need: @emotion/react FYI: https://blog.ojisan.io/s-c-kigo
const Style_container = css`
  display: flex;
  flex-wrap: wrap;

  letter-spacing: -0.1em;
  text-align: justify;
  font-family: -apple-system, BlinkMacSystemFont, Roboto;

  @media( min-width: 960px ) {
  .contents {
    max-width: 720px;
  }

  h1 {
    font-family: font-family: 'YuGothic','Yu Gothic','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3','メイリオ', 'Meiryo','ＭＳ ゴシック',sans-serif;
    color: red;
  }
`

const Style_information = css`
  border: solid 2px;
  background-color: lightskyblue;
  border-radius: 1vh;
  margin-bottom: 10px;
  text-align: center;
  padding: 20px;
  font-size: 36px;
`

const Style_blog_list = css`
  background-color: lightblue;
  border: solid 2px;
  border-radius: 2vh;
  padding: 10px;
  margin-bottom: 3px;
  display: flex;

  span {
    font-size: 16px;
  }
  img {
    max-width: 300px;
    max-height: 200px;
    width: auto;
    height: auto;
  }
`

const Style_profile = css`
  border: solid 2px;
  border-radius: 2vh;
  padding: 10px;
  background-color: lightgoldenrodyellow;
  @media( min-width: 960px ) {
    width: 200px;
  }
`

const Style_profile_image = css`
  margin-bottom: 10px;
`
//*/

function sumarrize ( html )
{
  const metaDescription = striptags( html ).replace( /\r?\n/g, '' ).trim();
  return metaDescription.length <= 120
    ? metaDescription
    : metaDescription.slice( 0, 100 ) + '......';
}

export default ( { data } ) =>
{
  return (
    <Layout>
      <SEO title="記事一覧" />
      <div className={ Style.container }>
        <section>
          <h1 className={ Style.information }>新しく書いた記事が上に来ます。</h1>
          { data.allMicrocmsMain.nodes.map( node =>
          {
            return (
              <article className={ Style.blog_list } id={ node.mainId } >
                <div>
                  <h3><Link to={ "/" + node.mainId }>{ node.title }</Link>　<span>{ node.updatedAt }</span></h3>
                  <div>{ ( node.description !== "0" ) ? node.description : sumarrize( node.body ) }</div>
                  <div><Link to={ "/" + node.mainId }>続きを読む</Link></div>
                </div>
                <div>
                  <img src={ node.door.url } alt={ node.title } />
                </div>
              </article>
            );
          } ) }
        </section>
        <aside className={ Style.profile }>
          <div className={ Style.profile_image }>
            <h1>Author</h1>
            <StaticImage
              src="../images/author.png"
              layout="fluid"
              style={ { width: "128px", height: "128px" } }
              alt=""
            />
            <Share
              title={ "#" + data.site.siteMetadata.title }
              url={ data.site.siteMetadata.url }
            />
          </div>
          <div>
            <span>
              { data.site.siteMetadata.description }
            </span>
          </div>
        </aside>
      </div>
    </Layout >
  )
}

export const query = graphql`
query {
  site {
    siteMetadata {
      author
      description
      url
      title
    }
  }
  allMicrocmsMain (sort: {order: DESC, fields: publishedAt}) {
    nodes {
      mainId
      title
      description
      body
      door {
        url
      }
      updatedAt(formatString: "YY年M月D日")
    }
  }
}
`;
