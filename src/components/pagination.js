import React from "react"
import { Link } from "gatsby"

////  css in JS(emotion)  ////
import { css } from "@emotion/react";  // need: @emotion/react FYI: https://blog.ojisan.io/s-c-kigo
const Style_pagination = css`
  display: flex;
  list-style-type: none;
  margin: 0 auto;

  li {
    margin-right: 2vw;
    border: 2px solid;
    border-radius: 10vw;
    padding: 1vh;
    background-color: lightgreen;
    max-width: 40vw;
  }

  li:hover {
    background-color: yellowgreen;
  }
`

const Pagination = ( { prev, next } ) =>
{
  return (
    <ul css={ Style_pagination }>
      { prev && <Link to={ "/" + prev.mainId }><li>＜＜{ prev.title }</li></Link> }
      <Link to="/"><li>【トップに戻る】</li></Link>
      { next && <Link to={ "/" + next.mainId }><li>{ next.title }＞＞</li></Link> }
    </ul>
  );
}

export default Pagination
