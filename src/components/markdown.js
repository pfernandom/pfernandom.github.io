
import React from 'react'
import Remarkable from 'remarkable';
const md = new Remarkable();

export default ({value, children, ...props}) =>  (
  <div {...props} dangerouslySetInnerHTML={{__html:md.render(value || children)}} ></div>
)