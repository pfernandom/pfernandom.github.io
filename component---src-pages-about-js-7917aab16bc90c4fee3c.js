(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{141:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(145),o=a(147),u=a(151);t.default=function(){return r.a.createElement(o.a,null,r.a.createElement(u.a,{title:"About Pedro"}),r.a.createElement("h1",null,"About me..."),r.a.createElement("p",null,"I'm a Software Engineer. I love coding for the web and constantly improve my knowledge about computer systems"),r.a.createElement(i.Link,{className:"navigation-link",to:"/"},"Go back to the homepage"))}},145:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return f}),a.d(t,"StaticQueryContext",function(){return p}),a.d(t,"StaticQuery",function(){return m});var n=a(0),r=a.n(n),i=a(4),o=a.n(i),u=a(144),c=a.n(u);a.d(t,"Link",function(){return c.a}),a.d(t,"withPrefix",function(){return u.withPrefix}),a.d(t,"navigate",function(){return u.navigate}),a.d(t,"push",function(){return u.push}),a.d(t,"replace",function(){return u.replace}),a.d(t,"navigateTo",function(){return u.navigateTo});var s=a(146),l=a.n(s);a.d(t,"PageRenderer",function(){return l.a});var d=a(32);a.d(t,"parsePath",function(){return d.a});var p=r.a.createContext({}),m=function(e){return r.a.createElement(p.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function f(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},146:function(e,t,a){var n;e.exports=(n=a(149))&&n.default||n},147:function(e,t,a){"use strict";var n=a(148),r=a(0),i=a.n(r),o=a(4),u=a.n(o),c=a(145),s=a(153),l=(a(150),function(e){var t=e.children;return i.a.createElement(c.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t,i.a.createElement("footer",null,i.a.createElement("div",null,"Pedro Fernando Marquez Soto - Full-stack developer"),"©"," ",(new Date).getFullYear(),", Built with"," ",i.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"),".",i.a.createElement("a",{href:"#top",className:"no-print"},i.a.createElement(s.b,null),"Go to top"))))},data:n})});l.propTypes={children:u.a.node.isRequired},t.a=l},148:function(e){e.exports={data:{site:{siteMetadata:{title:"Pedro Marquez - Full-stack developer"}}}}},149:function(e,t,a){"use strict";a.r(t);a(33);var n=a(0),r=a.n(n),i=a(4),o=a.n(i),u=a(52),c=a(2),s=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(u.a,Object.assign({location:t,pageResources:a},a.json))};s.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=s},150:function(e,t,a){},151:function(e,t,a){"use strict";var n=a(152),r=a(0),i=a.n(r),o=a(4),u=a.n(o),c=a(154),s=a.n(c),l=a(145);function d(e){var t=e.description,a=e.lang,r=e.meta,o=e.keywords,u=e.title;return i.a.createElement(l.StaticQuery,{query:p,render:function(e){var n=t||e.site.siteMetadata.description;return i.a.createElement(s.a,{htmlAttributes:{lang:a},title:u,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:n},{property:"og:title",content:u},{property:"og:description",content:n},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:u},{name:"twitter:description",content:n}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})},data:n})}d.defaultProps={lang:"en",meta:[],keywords:[]},d.propTypes={description:u.a.string,lang:u.a.string,meta:u.a.array,keywords:u.a.arrayOf(u.a.string),title:u.a.string.isRequired},t.a=d;var p="1025518380"},152:function(e){e.exports={data:{site:{siteMetadata:{title:"Pedro Marquez - Full-stack developer",description:"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",author:"@pfernandom"}}}}}}]);
//# sourceMappingURL=component---src-pages-about-js-7917aab16bc90c4fee3c.js.map