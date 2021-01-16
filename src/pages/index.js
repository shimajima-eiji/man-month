import React from "react"
import { Link, graphql } from "gatsby"
import striptags from "striptags"  // FYI: https://github.com/ericnorris/striptags
import { StaticImage } from "gatsby-plugin-image"  // FYI: https://ebisu.com/note/new-gatsby-image/

// FYI: https://webcraftlog.net/best-gatsbyjs-plugins/
import Layout from "@components/layout"
import SEO from "@components/seo"

////  css in JS(emotion)  ////
import { css } from "@emotion/react";  // need: @emotion/react FYI: https://blog.ojisan.io/s-c-kigo

// 共通
const Style_normal_text = css`
  text-align: justify;
`

// 固有
const Css_column_select_width = "805px";
const Style_container = css`
  @media(min-Width:${Css_column_select_width}) {
    display: flex;
  }
  letter-spacing: -0.07em;
`

const Style_information = css`
  background-color: lightskyblue;
  border: solid 2px;
  border-radius: 1vh;

  margin-bottom: 1vh;
  text-align: center;
  padding: 2vh;

  font-size: 150%;
`

const Style_blog_list = css`
  background-color: lightblue;
  border: solid 2px;
  border-radius: 2vh;
  padding: 20px;
  margin-bottom: 3px;

`

const Style_contents = css`
  display: flex;

  h1 {
    font-size: 150%;
  }
  span {
    font-size: 75%;
  }

  p {
    font-size: 110%;
  }
  img {
    max-width: 200px;
    max-height: 200px;
  }
`

const Style_detail = css`
  @media( min-width: 960px ) {
    max-width: 720px;
  }

  h1 {
    border-top: double 5px;
    border-bottom: double 5px;
    border-left: solid 6px;
    padding: 4px 0 4px 4px;
    margin-left: -10px;
  }

  h1 a{
    /* font-family: "corp"; */
    font-display: swap;
  }
`
const Style_link = css`
  padding: 1vw 2vh;
  border: 3px solid #000;
  border-radius: 50vw;

  background-color: lightgreen;
  font-size: 3.5vh;
  text-align: center;

  :hover {
    background-color: yellowgreen;
    font-weight: bold;
  }
`

const Style_column_profile = css`
  border: solid 2px;
  border-radius: 2vh;
  padding: 10px;
  background-color: lightgoldenrodyellow;
`

const Style_layout_block = css`
  @media(max-Width:${Css_column_select_width}) {
    display: flex;
  }
  @media( min-width: ${Css_column_select_width}) {
    width: 100%;
    max-width: 200px;
  }

  text-align: justify;
  span {
    /* font-family: "corp"; */
    font-display: swap;
  }
`

function sumarrize ( html )
{
  return striptags( html ).replace( /\r?\n/g, '' ).trim();
}

export default ( { data } ) =>
{
  // const noImage = "../images/icon.webp"
  return (
    <Layout>
      <SEO title="記事一覧" />
      <div css={ Style_container }>
        <section>
          <h1 css={ Style_information }>新しく書いた記事が上に来ます。</h1>
          { data.allMicrocmsMain.nodes.map( node =>
          {
            return (
              <article css={ Style_blog_list } id={ node.mainId } >
                <div css={ Style_contents }>
                  <div css={ [ Style_detail, Style_normal_text ] }>
                    <Link to={ node.mainId }><h1>{ node.title }　<span>{ node.updatedAt }</span></h1></Link>
                    <p>{ node.description || sumarrize( node.body ).slice( 0, 100 ) + '......' } </p>
                  </div>
                  <Link to={ node.mainId }><div>
                    {/* { ( node.door )
                      ? <img src={ node.door.url } alt={ node.title } />
                      : <StaticImage
                        src={ noImage }
                        layout="fluid"
                        style={ { width: "200px", height: "200px" } }
                        alt={ node.title }
                      />
                    } */}
                  </div></Link>
                </div>
                <div css={ Style_link }><Link to={ node.mainId }>続きを読む　<span>({ node.body.length }文字</span>)</Link></div>
              </article>
            );
          } ) }
        </section>
        <aside css={ Style_column_profile }>
          <h1>Author</h1>
          <div css={ Style_layout_block }>
            <div>
              <StaticImage
                src="../images/author-face.webp"
                layout="fluid"
                style={ { width: "128px", height: "128px" } }
                alt="のむらや"
              />
              <Link to="https://lin.ee/Oq7UfMd">
                <StaticImage
                  src="../images/LINE友だち追加.png"
                  layout="fluid"
                  style={ { width: "128px" } }
                  alt="友だち追加"
                />
              </Link>
            </div>
            <div>
              <span>
                { data.site.siteMetadata.description }
              </span>
            </div>
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
