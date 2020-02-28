# for object of microCMS's

## Refer
- [ヘッドレスCMS「microCMS」を使ったJAMstack構成でコーポレートサイトをリニューアルした話](https://dev.re-build.company/entry/2020/01/09/022458)
- [Nuxt.jsとmicroCMSで採用ページを作成してみよう！](https://microcms.io/blog/create-nuxt-microcms-recruit/)

感謝！

## Thanks
- [axiosのレスポンスについて](https://teratail.com/questions/238740)

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Required
`tree` result.
```
.
├── .env
├── pages
├   ├── index.vue
...
```

```
# .env
API_KEY=(Your API KEY)
BASE_URL=https://(User).microcms.io/api/v1/daily
```
