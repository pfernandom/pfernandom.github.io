(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{140:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(147),o=a(151);t.default=function(){return r.a.createElement(i.a,null,r.a.createElement(o.a,{title:"404: Not found"}),r.a.createElement("h1",null,"NOT FOUND"),r.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))}},145:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return m}),a.d(t,"StaticQueryContext",function(){return p}),a.d(t,"StaticQuery",function(){return f});var n=a(0),r=a.n(n),i=a(4),o=a.n(i),u=a(144),s=a.n(u);a.d(t,"Link",function(){return s.a}),a.d(t,"withPrefix",function(){return u.withPrefix}),a.d(t,"navigate",function(){return u.navigate}),a.d(t,"push",function(){return u.push}),a.d(t,"replace",function(){return u.replace}),a.d(t,"navigateTo",function(){return u.navigateTo});var c=a(146),l=a.n(c);a.d(t,"PageRenderer",function(){return l.a});var d=a(32);a.d(t,"parsePath",function(){return d.a});var p=r.a.createContext({}),f=function(e){return r.a.createElement(p.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function m(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},146:function(e,t,a){var n;e.exports=(n=a(149))&&n.default||n},147:function(e,t,a){"use strict";var n=a(148),r=a(0),i=a.n(r),o=a(4),u=a.n(o),s=a(145),c=(a(150),function(e){var t=e.children;return i.a.createElement(s.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t,i.a.createElement("footer",null,i.a.createElement(s.Link,{to:"/about/"},"Want to know more about Pedro's interests?"),i.a.createElement("div",null,"Pedro Fernando Marquez Soto - Full-stack developer"),"©"," ",(new Date).getFullYear(),", Built with"," ",i.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"),".",i.a.createElement("a",{href:"#top",className:"no-print"},"Go to top"))))},data:n})});c.propTypes={children:u.a.node.isRequired},t.a=c},148:function(e){e.exports={data:{site:{siteMetadata:{title:"Pedro Marquez - Full-stack developer"}}}}},149:function(e,t,a){"use strict";a.r(t);a(33);var n=a(0),r=a.n(n),i=a(4),o=a.n(i),u=a(52),s=a(2),c=function(e){var t=e.location,a=s.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(u.a,Object.assign({location:t,pageResources:a},a.json))};c.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=c},150:function(e,t,a){},151:function(e,t,a){"use strict";var n=a(152),r=a(0),i=a.n(r),o=a(4),u=a.n(o),s=a(153),c=a.n(s),l=a(145);function d(e){var t=e.description,a=e.lang,r=e.meta,o=e.keywords,u=e.title;return i.a.createElement(l.StaticQuery,{query:p,render:function(e){var n=t||e.site.siteMetadata.description;return i.a.createElement(c.a,{htmlAttributes:{lang:a},title:u,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:n},{property:"og:title",content:u},{property:"og:description",content:n},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:u},{name:"twitter:description",content:n}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})},data:n})}d.defaultProps={lang:"en",meta:[],keywords:[]},d.propTypes={description:u.a.string,lang:u.a.string,meta:u.a.array,keywords:u.a.arrayOf(u.a.string),title:u.a.string.isRequired},t.a=d;var p="1025518380"},152:function(e){e.exports={data:{site:{siteMetadata:{title:"Pedro Marquez - Full-stack developer",description:"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",author:"@pfernandom"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-7cf95c7aad023fba8585.js.map