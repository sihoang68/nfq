import React from 'react'
import NextHead from 'next/head';

class Header extends React.Component {
  
  render() {
    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="stylesheet" href="/css/base.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
        <title>NFQ - Si Hoang</title>
      </NextHead>
    )
  }
}

export default Header
