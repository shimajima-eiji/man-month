<template>
  <section>
    <h1>記事一覧</h1>
    <article>
      <ul>
        <li v-for="content in contents" :key="content.id">
          <nuxt-link :to="`/${content.id}`">
            {{ content.title }}
          </nuxt-link>
        </li>
      </ul>
    </article>
    <h1>ページング</h1>
    <nav class="paginate">
      <ul>
        <li v-for="page in pages">
          <nuxt-link :to="`/page/${page.url}`">{{page.value}}</nuxt-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  // サイトの情報を作成する
  async asyncData( params ) {
    // console.log(params);
    const page = Number(params.params.p || '1')
    const limit = 1

    const { data } = await axios.get(
      `https://nomuraya-tutorial.microcms.io/api/v1/test?limit=${limit}&offset=${(page - 1) * limit}`,
      {
        headers: { 'X-API-KEY': '6615a5a4-b894-445e-b979-24612d1a018c' }
      }
    );

    /**
     * ページネーション
     * 本当はvue-paginateとかvuejs-paginateとかVuetify使いたいけど、挙動不明のエラー？に阻まれしゃーなしに作成
     */
    function paginate( page, limit, total )
    {
      const add = ( page, text ) => result.push( { url: page, value: text } );
      const last = Math.ceil( total / limit );
      const margin = 2;
      const result = [];
      var prev = false;
      var next = false;

      for ( var i = ( page - margin ); i <= ( page + margin ); i++ )
      {
        if ( i < 1 || i == page || last < i ) continue

        add( i, i )
        if ( i < page ) prev = true
        if ( i > page ) next = true;
      }
      if ( prev ) result.unshift( { page: 1, text: "First" } )
      if ( result.length > 0 && (result[ 0 ].page + 1 < result[ 1 ].page) ) result.splice( 1, 0, { page: "#", text: "..." } )

      if ( next ) add( last, "Last" )
      if ( result.length > 0 && (result[ result.length - 2 ].page + 1 < result[ result.length - 1 ].page )) result.splice( result.length - 1, 0, { page: "#", text: "..." } )
      return result;
    }

    return {
      ...data,
      pages: paginate(page, limit, data.totalCount),
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 960px;
  margin: 0 auto;
}

.title {
  margin-bottom: 20px;
}

.publishedAt {
  margin-bottom: 40px;
}

.post {
  & > h1 {
    font-size: 30px;
    font-weight: bold;
    margin: 40px 0 20px;
    background-color: #eee;
    padding: 10px 20px;
    border-radius: 5px;
  }

  & > h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 40px 0 16px;
    border-bottom: 1px solid #ddd;
  }

  & > p {
    line-height: 1.8;
    letter-spacing: 0.2px;
  }

  & > ol {
    list-style-type: decimal;
    list-style-position: inside;
  }
}

.paginate ul li {
  list-style-type: none;
  float: left;
  border: 1px solid blue;
  margin-right: 10px;
  padding: 10px;
}
</style>
