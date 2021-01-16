import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import urlJoin from "url-join"  // need: url-join

function SEO ( { title, description, url, image } )
{
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            baseUrl: siteUrl
            lang
            twitterUsername
          }
        }
      }
    `
  )

  // クエリから結果を取り出す
  const {
    defaultTitle,
    defaultDescription,
    baseUrl,
    defaultImage,
    lang,
    twitterUsername,
  } = site.siteMetadata

  // 引数とクエリを突合する
  // titleは便利な機能が提供されているので、ここではさわらない
  description = description || defaultDescription
  url = urlJoin( baseUrl, url )
  image = image || defaultImage

  return (
    <Helmet
      htmlAttributes={ {
        lang,
      } }
      title={ title }
      titleTemplate={ defaultTitle ? `%s | ${defaultTitle}` : null }
      meta={ [
        {
          name: `description`,
          content: description,
        },
        {
          name: `image`,
          content: image,
        },
        {
          name: `og:image`,
          content: image,
        },
        {
          name: `og:url`,
          content: url,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: twitterUsername,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ].concat( [] ) }
    >
    </Helmet>
  )
}

SEO.defaultProps = {
  url: ``,  // urlJoinで結合しているので空文字が必要
}

export default SEO
