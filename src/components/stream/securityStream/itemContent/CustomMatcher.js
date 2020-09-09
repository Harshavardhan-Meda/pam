import { Matcher } from 'interweave';
import React from 'react';

// Matcher pars @Tags string to HTML <a></a> tag
function match(string) {
  const matches = string.match(/@(\w+)/g);

  if (!matches) {
    return null;
  }

  return {
    match: matches[0],
    href: `https://twitter.com/${matches[0].substring(1)}`,
    target: '_blank',
    rel: 'noopener noreferrer'
  };
}

export default class CustomMatcher extends Matcher {
  match(string) {
    return match(string);
  }

  replaceWith(matchText, props) {
    delete props.hashtagUrl;
    delete props.newWindow;
    return <a {...props}>{matchText}</a>;
  }

  asTag() {
    return 'a';
  }
}
