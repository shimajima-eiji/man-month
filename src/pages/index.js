import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ( query ) => (
  <Layout>
    <SEO title="Home" />
    <h1>インデックスでクエリを実行するだけ</h1>
    <p>結果： { query.data.site.siteMetadata.title }</p>
    <p>画像要らなさそうだけど一応そのままにしておく</p>
    <div style={ { maxWidth: `300px`, marginBottom: `1.45rem` } }>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout >
)

export default IndexPage

export const query = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
}
`;
