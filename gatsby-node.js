const path = require( "path" )
const striptags = require( "striptags" )  // FYI: https://github.com/ericnorris/striptags

function sumarrize ( html )
{
  const metaDescription = striptags( html ).replace( /\r?\n/g, '' ).trim();
  return metaDescription.length <= 120
    ? metaDescription
    : metaDescription.slice( 0, 120 ) + '...';
}

exports.createPages = async ( { graphql, actions } ) =>
{
  const { createPage } = actions;

  // allMicrocmsMain.edgesでprev/nextを取りたくなるが、最初の記事と最後の記事には当該項目が存在せずCreatePageでエラーになるため廃止
  const result = await graphql(
    `
    {
      site {
        siteMetadata {
          title
          url
        }
      }
      allMicrocmsMain (sort: {order: DESC, fields: publishedAt}) {
        nodes {
          mainId
          title
          childConvertHtml {
            convertedHtml
          }
          tags
          description
          door {
            url
          }
          prev
          next
          updatedAt(formatString: "YYYY年MM月DD日 HH時mm分SS秒")
          publishedAt(formatString: "YYYY年MM月DD日 HH時mm分SS秒")
        }
      }
    }
    `
  );

  if ( result.errors )
  {
    throw result.errors;
  }

  const pages = result.data.allMicrocmsMain.nodes;
  pages.forEach( ( post, index ) =>
  {
    // 降順で取っているので勘違いに注意
    const prev = ( post.prev != "0" )
      ? pages.filter( page => page.mainId == post.prev )[ 0 ]  // 決め打ち
      : ( index === pages.length - 1 )  // 最後のページなら次は最初のリンク
        ? pages[ 0 ]
        : pages[ index + 1 ]
    const next = ( post.next != "0" )
      ? pages.filter( page => page.mainId == post.next )[ 0 ]
      : ( index === 0 )
        ? pages[ pages.length - 1 ]
        : pages[ index - 1 ]

    if ( post.description !== "0" ) post.description = sumarrize( post.childConvertHtml.convertedHtml )
    createPage( {
      path: post.mainId,
      component: path.resolve( 'src/templates/blog-post.js' ),
      context: {
        post: post,
        prev,
        next,
        site: result.data.site.siteMetadata,
      },
    } );
  } );
};
