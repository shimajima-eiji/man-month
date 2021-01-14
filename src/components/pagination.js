import React from "react"
import { Link } from "gatsby"

import Style from "./pagination.module.css"

const Pagination = ( { prev, next } ) =>
{
  return (
    <>
      <ul className={ Style.pagination }>
        { prev && <li className={ Style.prev }><Link to={ "/" + prev.mainId }>{ prev.title }</Link ></li> }
        <li className={ Style.top }><Link to="/">トップに戻る</Link></li>
        { next && <li className={ Style.next }><Link to={ "/" + next.mainId }>{ next.title }</Link></li> }
      </ul>
    </>
  );
}

export default Pagination
