import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import "./layout.css"
import "./style.css"

const Layout = ( { children } ) =>
{
  const data = useStaticQuery( graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
          twitterUsername
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={ data.site.siteMetadata?.title || `Title` } />
      <div
        style={ {
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        } }
      >
        <main>{ children }</main>
        <footer
          style={ {
            marginTop: `2rem`,
          } }
        >
          {/* FYI: http://w-d-l.net/html__entities/ */ }
          <p>&copy;
          2020-{ new Date().getFullYear() }
            { data.site.siteMetadata.author }
          (<Link to={ "https://twitter.com/" + data.site.siteMetadata.twitterUsername }>&#064;{ data.site.siteMetadata.twitterUsername }</Link>)</p>
          <p>当サイトの全てのコンテンツを転載・無断での引用もお断りしています。</p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
