"use strict";(self.webpackChunkenglish=self.webpackChunkenglish||[]).push([[923],{849:function(e,n,r){r.r(n),r.d(n,{default:function(){return f}});var t=r(902),u=r(791),a=r(540),l=r(991),o=r(77);r(947);var c=["id","name","value","onFileSelect","onChange","onDialogOpen","onDialogClose","onTabChange","apiRef","customTabs","validators","tabsCss","locale","localeTranslations","localePluralize","previewUrlCallback","metadataCallback"],i=function(e,n){var r=e.id,a=e.name,i=e.value,f=e.onFileSelect,s=e.onChange,d=e.onDialogOpen,C=e.onDialogClose,p=e.onTabChange,v=e.apiRef,g=e.customTabs,E=e.validators,A=e.tabsCss,L=e.locale,m=e.localeTranslations,b=e.localePluralize,h=e.previewUrlCallback,O=e.metadataCallback,w=(0,t._)(e,c),R=(0,u.useRef)(null),D=(0,u.useRef)(null),U=(0,u.useRef)(null),k=(0,l.u)(f),P=(0,l.u)(s),T=(0,l.u)(d),_=(0,l.u)(C),I=(0,l.u)(p),S=(0,l.u)(O),y=(0,l.u)(h||l.d),N=function(e,n){var r=!0,t=(0,u.useRef)();t.current?r=!!(n&&t.current.deps&&o(n,t.current.deps)):t.current={deps:n,result:e()};var a=r?t.current:{deps:n,result:e()};return t.current=a,a.result}((function(){return w}),[w]);return(0,l.a)(g,n),(0,l.b)((function(){return L&&(window.UPLOADCARE_LOCALE=L),b&&(window.UPLOADCARE_LOCALE_PLURALIZE=b),m&&(window.UPLOADCARE_LOCALE_TRANSLATIONS=m),n.plugin((function(e){e.locale.rebuild({locale:L||null,localeTranslations:m||null,localePluralize:b||null})})),function(){L&&delete window.UPLOADCARE_LOCALE,b&&delete window.UPLOADCARE_LOCALE_PLURALIZE,m&&delete window.UPLOADCARE_LOCALE_TRANSLATIONS}}),[L,m,b]),(0,u.useEffect)((function(){var e=R.current;D.current=n.Widget(e,(0,t.a)((0,t.a)({},N),{},{metadataCallback:N.metadata?void 0:S,previewUrlCallback:y}));var r=e.nextSibling;return U.current&&D.current.value(U.current),function(){n.jQuery(e).removeData("uploadcareWidget"),r&&r.remove()}}),[n,N,S,y]),function(e,n){(0,u.useEffect)((function(){if(null!=n){var r=e.current;return n.forEach((function(e){r.validators.push(e)})),function(){r.validators.length=0}}}),[e,n])}(D,E),(0,u.useEffect)((function(){return D.current.onUploadComplete.add(P),D.current.onChange.add(k),function(){D.current.onUploadComplete.remove(P),D.current.onChange.remove(k)}}),[P,k,n,N]),(0,u.useEffect)((function(){var e,n=function(n){(e=n).done(_).fail(_).progress(I),T(n)};return D.current.onDialogOpen.add(n),function(){D.current.onDialogOpen.remove(n),e&&e.reject()}}),[_,T,I,N]),(0,u.useEffect)((function(){var e=[],n=function(n){e=n?n.files?n.files():[n]:[]};return D.current.onChange.add(n),function(){e.forEach((function(e){return e.cancel()})),D.current.onChange.remove(n)}}),[N]),(0,u.useEffect)((function(){U.current!==i&&D.current.value(i),U.current=i}),[i]),(0,u.useEffect)((function(){n&&A&&"string"===typeof A&&(0===A.indexOf("https://")?n.tabsCss.addUrl(A):n.tabsCss.addStyle(A))}),[n,A]),(0,u.useImperativeHandle)(v,(function(){return{openDialog:function(){return D.current.openDialog()},reloadInfo:function(){return D.current.reloadInfo()},getInput:function(){return D.current.inputElement},value:function(e){return D.current.value(e)}}}),[]),(0,u.useCallback)((function(){return u.createElement("input",{type:"hidden",ref:R,id:r,name:a})}),[r,a])},f=function(e){var n=i(e,a);return u.createElement(n,null)}}}]);
//# sourceMappingURL=ucare-widget-chunk.4b1bbbea.chunk.js.map