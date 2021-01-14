// FYI: https://www.corylog.com/gatsby/gatsby022/

import React from "react";
import
{
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon
} from "react-share";

const Share = ( { title, url } ) =>
{
  const excerpt = 160
  const iconSize = 48 // mobile 36
  return (
    <div className="social-links">
      <TwitterShareButton url={ url } title={ title }>
        <TwitterIcon round size={ iconSize } />
      </TwitterShareButton>
      <FacebookShareButton url={ url } quote={ excerpt }>
        <FacebookIcon round size={ iconSize } />
      </FacebookShareButton>
      <LineShareButton url={ url } quote={ excerpt }>
        <LineIcon round size={ iconSize } />
      </LineShareButton>
    </div>
  );
}

export default Share;
