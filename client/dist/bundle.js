/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ \"../node_modules/preact/dist/preact.module.js\");\n/* harmony import */ var _src_libraries_rendering_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/libraries/rendering-library */ \"./src/libraries/rendering-library.js\");\n/* harmony import */ var _src_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/App */ \"./src/App.js\");\n\n\n\n\n(0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,_src_libraries_rendering_library__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`<${_src_App__WEBPACK_IMPORTED_MODULE_2__.App} />`, document.getElementById(\"root\"));\n\n\n//# sourceURL=webpack://client/./index.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   App: () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./libraries/rendering-library */ \"./src/libraries/rendering-library.js\");\n/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ \"../node_modules/preact/hooks/dist/hooks.module.js\");\n/* harmony import */ var _components_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Home */ \"./src/components/Home.js\");\n/* harmony import */ var _components_Invitation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Invitation */ \"./src/components/Invitation.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n/* harmony import */ var _utils_lazy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/lazy */ \"./src/utils/lazy.js\");\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/utils */ \"./src/utils/utils.js\");\n/* harmony import */ var _components_CallEnded__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/CallEnded */ \"./src/components/CallEnded.js\");\n\n\n\n\n\n\n\n\nconst MeetingRoom = (0,_utils_lazy__WEBPACK_IMPORTED_MODULE_5__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_socket_io-client_build_esm_index_js\"), __webpack_require__.e(\"src_components_Meeting-room_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/Meeting-room.js */ \"./src/components/Meeting-room.js\")));\n\nconst App = () => {\n  const existingRoomIdFromUrl = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_6__.getRoomId)();\n  const [roomId, setRoomId] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(existingRoomIdFromUrl);\n  const [activePage, setActivePage] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(\n    existingRoomIdFromUrl ? _constants__WEBPACK_IMPORTED_MODULE_4__.pages.meetingRoom.pageId : _constants__WEBPACK_IMPORTED_MODULE_4__.pages.home.pageId\n  );\n  const [invitationUrl, setInvitationUrl] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)();\n  const ActiveComponent = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {\n    switch (activePage) {\n      case _constants__WEBPACK_IMPORTED_MODULE_4__.pages.home.pageId:\n        return (0,_libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__[\"default\"])`<${_components_Home__WEBPACK_IMPORTED_MODULE_2__.Home}\n          redirectToPage=${setActivePage}\n          roomId=${roomId}\n          setRoomId=${setRoomId}\n          setInvitationUrl=${setInvitationUrl}\n        />`;\n      case _constants__WEBPACK_IMPORTED_MODULE_4__.pages.invitation.pageId:\n        return (0,_libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__[\"default\"])`<${_components_Invitation__WEBPACK_IMPORTED_MODULE_3__.Invitation}\n          invitationUrl=${invitationUrl}\n          redirectToPage=${setActivePage}\n          roomId=${roomId}\n        />`;\n      case _constants__WEBPACK_IMPORTED_MODULE_4__.pages.meetingRoom.pageId:\n        return (0,_libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__[\"default\"])`<${MeetingRoom}\n          roomId=${roomId}\n          redirectToPage=${setActivePage}\n        /> `;\n      case _constants__WEBPACK_IMPORTED_MODULE_4__.pages.callEnded.pageId:\n        return (0,_libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__[\"default\"])`<${_components_CallEnded__WEBPACK_IMPORTED_MODULE_7__.CallEnded} />`;\n    }\n  });\n  return ActiveComponent;\n};\n\n\n//# sourceURL=webpack://client/./src/App.js?");

/***/ }),

/***/ "./src/components/CallEnded.js":
/*!*************************************!*\
  !*** ./src/components/CallEnded.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CallEnded: () => (/* binding */ CallEnded)\n/* harmony export */ });\n/* harmony import */ var _libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libraries/rendering-library */ \"./src/libraries/rendering-library.js\");\n\n\nconst CallEnded = () => {\n  const redirectToHomePage = () => {\n    location.assign(\"/\");\n  };\n  return (0,_libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__[\"default\"])`<div class=\"d-flex full-page-container flex-centered\">\n    <div>\n      <p class=\"text-center\">Call Ended!</p>\n      <button onclick=\"${redirectToHomePage}\">Go to Home Page</button>\n    </div>\n  </div>`;\n};\n\n\n//# sourceURL=webpack://client/./src/components/CallEnded.js?");

/***/ }),

/***/ "./src/components/Home.js":
/*!********************************!*\
  !*** ./src/components/Home.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Home: () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var _libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libraries/rendering-library */ \"./src/libraries/rendering-library.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ \"../node_modules/uuid/dist/esm-browser/v4.js\");\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ \"./src/utils/utils.js\");\n\n\n\n\n\nconst Home = ({\n  roomId,\n  setRoomId,\n  redirectToPage,\n  setInvitationUrl,\n}) => {\n  const handleRoomIdChange = (e) => {\n    e.preventDefault;\n    const { value } = e.target;\n    setRoomId(value);\n  };\n\n  const startNewCall = () => {\n    const newRoomId = (0,uuid__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n    const invitationUrl = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.getInvitationUrl)(newRoomId);\n    setInvitationUrl(invitationUrl);\n    setRoomId(newRoomId);\n    redirectToPage(_constants__WEBPACK_IMPORTED_MODULE_1__.pages.invitation.pageId);\n  };\n\n  const joinRoom = () => {\n    const invitationUrl = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.getInvitationUrl)(roomId);\n    location.assign(invitationUrl);\n  };\n\n  return (0,_libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__[\"default\"])`<div class=\"d-flex full-page-container flex-centered\">\n    <div class=\"border-l-gray border-radius-s p-xxl w-25 m-w-100 m-m-l m-p-l\">\n      <div class=\"p-xl m-p-s\">\n        <div\n          class=\"d-flex flex-align-items-stretch border-xs-gray border-radius-s w-100\"\n        >\n          <input\n            value=${roomId}\n            onInput=${handleRoomIdChange}\n            class=\"border-0 flex-1\"\n            placeholder=\"Enter room Id\"\n          />\n          <button class=\"border-0\" onclick=\"${joinRoom}\">Join Room</button>\n        </div>\n      </div>\n      <div class=\"title text-center\">OR</div>\n      <div class=\"p-xl m-p-s\">\n        <button\n          onclick=${startNewCall}\n          class=\"button button-primary w-100 border-radius-s\"\n        >\n          Start New Meeting\n        </button>\n      </div>\n    </div>\n  </div>`;\n};\n\n\n//# sourceURL=webpack://client/./src/components/Home.js?");

/***/ }),

/***/ "./src/components/Invitation.js":
/*!**************************************!*\
  !*** ./src/components/Invitation.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Invitation: () => (/* binding */ Invitation)\n/* harmony export */ });\n/* harmony import */ var _icons_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../icons/copy */ \"./src/icons/copy.js\");\n/* harmony import */ var _libraries_rendering_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libraries/rendering-library */ \"./src/libraries/rendering-library.js\");\n\n\n\nconst Invitation = ({ invitationUrl, roomId }) => {\n  const startCall = () => {\n    location.assign(invitationUrl);\n  };\n  const copyToClipboard = (text) => {\n    navigator.clipboard.writeText(text);\n  };\n  const copyInvitationUrl = () => {\n    copyToClipboard(invitationUrl);\n  };\n\n  const copyRoomId = () => {\n    copyToClipboard(roomId);\n  };\n  return (0,_libraries_rendering_library__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`<div class=\"d-flex full-page-container flex-centered\">\n    <div>\n      <h4 class=\"title text-center\">Share your call invite</h4>\n      <p class=\"text-light text-center\">\n        Share the invitation link or room ID with the individuals you wish to\n        connect with.\n      </p>\n      <div\n        class=\"info-box d-flex flex-justify-content-space-between flex-align-items-center flex-gap-xl\"\n      >\n        <div>\n          <div class=\"text-label\">Invitation Link</div>\n          <div>${invitationUrl}</div>\n        </div>\n        <div>\n          <button onclick=${copyInvitationUrl} class=\"border-0\">\n            <${_icons_copy__WEBPACK_IMPORTED_MODULE_0__.CopyIcon} />\n          </button>\n        </div>\n      </div>\n      <div\n        class=\"info-box d-flex flex-justify-content-space-between flex-align-items-center flex-gap-xl\"\n      >\n        <div>\n          <div class=\"text-label\">Room Id</div>\n          <div>${roomId}</div>\n        </div>\n        <div>\n          <button onclick=${copyRoomId} class=\"border-0\">\n            <${_icons_copy__WEBPACK_IMPORTED_MODULE_0__.CopyIcon} />\n          </button>\n        </div>\n      </div>\n      <div class=\"text-center\">\n        <button onclick=${startCall} class=\"button-primary\">Start Call</button>\n      </div>\n    </div>\n  </div>`;\n};\n\n\n//# sourceURL=webpack://client/./src/components/Invitation.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CONNECTION_STATES: () => (/* binding */ CONNECTION_STATES),\n/* harmony export */   pages: () => (/* binding */ pages)\n/* harmony export */ });\nconst pages = {\n  home: {\n    pageId: \"home\",\n  },\n  invitation: {\n    pageId: \"invitation\",\n  },\n  meetingRoom: {\n    pageId: \"meetingRoom\",\n  },\n  callEnded: {\n    pageId: \"callEnded\",\n  },\n};\n\nconst CONNECTION_STATES = {\n  new: { key: \"new\", displayMessage: \"No Participant\" },\n  connecting: { key: \"connecting\", displayMessage: \"Connecting...\" },\n  connected: { key: \"connected\", displayMessage: \"Connected...\" },\n  disconnected: { key: \"disconnected\", displayMessage: \"Disconnected!\" },\n  failed: { key: \"failed\", displayMessage: \"Connection Failed!\" },\n  closed: { key: \"closed\", displayMessage: \"Connection Closed!\" },\n};\n\n\n//# sourceURL=webpack://client/./src/constants.js?");

/***/ }),

/***/ "./src/icons/copy.js":
/*!***************************!*\
  !*** ./src/icons/copy.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CopyIcon: () => (/* binding */ CopyIcon)\n/* harmony export */ });\n/* harmony import */ var _libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libraries/rendering-library */ \"./src/libraries/rendering-library.js\");\n\n\nconst CopyIcon = () => {\n  return (0,_libraries_rendering_library__WEBPACK_IMPORTED_MODULE_0__[\"default\"])`\n    <svg\n      width=\"24\"\n      height=\"24\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <g clip-path=\"url(#clip0_620_4)\">\n        <path\n          d=\"M19 2C19.5304 2 20.0391 2.21071 20.4142 2.58579C20.7893 2.96086 21 3.46957 21 4V16C21 16.5304 20.7893 17.0391 20.4142 17.4142C20.0391 17.7893 19.5304 18 19 18H17V20C17 20.5304 16.7893 21.0391 16.4142 21.4142C16.0391 21.7893 15.5304 22 15 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H7V4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H19ZM15 8H5V20H15V8ZM10 15C10.2652 15 10.5196 15.1054 10.7071 15.2929C10.8946 15.4804 11 15.7348 11 16C11 16.2652 10.8946 16.5196 10.7071 16.7071C10.5196 16.8946 10.2652 17 10 17H8C7.73478 17 7.48043 16.8946 7.29289 16.7071C7.10536 16.5196 7 16.2652 7 16C7 15.7348 7.10536 15.4804 7.29289 15.2929C7.48043 15.1054 7.73478 15 8 15H10ZM19 4H9V6H15C15.5304 6 16.0391 6.21071 16.4142 6.58579C16.7893 6.96086 17 7.46957 17 8V16H19V4ZM12 11C12.2549 11.0003 12.5 11.0979 12.6854 11.2728C12.8707 11.4478 12.9822 11.687 12.9972 11.9414C13.0121 12.1958 12.9293 12.4464 12.7657 12.6418C12.6021 12.8373 12.3701 12.9629 12.117 12.993L12 13H8C7.74512 12.9997 7.49997 12.9021 7.31463 12.7272C7.1293 12.5522 7.01777 12.313 7.00283 12.0586C6.98789 11.8042 7.07067 11.5536 7.23426 11.3582C7.39786 11.1627 7.6299 11.0371 7.883 11.007L8 11H12Z\"\n          fill=\"#545454\"\n        />\n      </g>\n      <defs>\n        <clipPath id=\"clip0_620_4\">\n          <rect width=\"24\" height=\"24\" fill=\"white\" />\n        </clipPath>\n      </defs>\n    </svg>\n  `;\n};\n\n\n//# sourceURL=webpack://client/./src/icons/copy.js?");

/***/ }),

/***/ "./src/libraries/rendering-library.js":
/*!********************************************!*\
  !*** ./src/libraries/rendering-library.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ \"../node_modules/preact/dist/preact.module.js\");\n/* harmony import */ var htm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm */ \"../node_modules/htm/dist/htm.module.js\");\n\n\nconst html = htm__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bind(preact__WEBPACK_IMPORTED_MODULE_0__.h);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (html);\n\n\n//# sourceURL=webpack://client/./src/libraries/rendering-library.js?");

/***/ }),

/***/ "./src/utils/lazy.js":
/*!***************************!*\
  !*** ./src/utils/lazy.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   lazy: () => (/* binding */ lazy)\n/* harmony export */ });\n/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ \"../node_modules/preact/dist/preact.module.js\");\n/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ \"../node_modules/preact/hooks/dist/hooks.module.js\");\n\n\n\nconst lazy = (importFn) => {\n  function Lazy(props) {\n    const [Component, setComponent] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {\n      async function load() {\n        const loadedComponent = await importFn();\n        setComponent((0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(loadedComponent.default, props));\n      }\n      load();\n    }, []);\n    return Component;\n  }\n  return Lazy;\n};\n\n\n//# sourceURL=webpack://client/./src/utils/lazy.js?");

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getInvitationUrl: () => (/* binding */ getInvitationUrl),\n/* harmony export */   getRoomId: () => (/* binding */ getRoomId)\n/* harmony export */ });\nconst getRoomId = () => {\n  const queryString = window.location.search;\n  const queryParams = new URLSearchParams(queryString);\n  return queryParams.get(\"roomId\");\n};\n\nconst getInvitationUrl = (roomId) => {\n  const currentUrl = window.location.href;\n  const invitationUrl = `${currentUrl}?roomId=${roomId}`;\n  return invitationUrl;\n};\n\n\n//# sourceURL=webpack://client/./src/utils/utils.js?");

/***/ }),

/***/ "../node_modules/htm/dist/htm.module.js":
/*!**********************************************!*\
  !*** ../node_modules/htm/dist/htm.module.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar n=function(t,s,r,e){var u;s[0]=0;for(var h=1;h<s.length;h++){var p=s[h++],a=s[h]?(s[0]|=p?1:2,r[s[h++]]):s[++h];3===p?e[0]=a:4===p?e[1]=Object.assign(e[1]||{},a):5===p?(e[1]=e[1]||{})[s[++h]]=a:6===p?e[1][s[++h]]+=a+\"\":p?(u=t.apply(a,n(t,a,r,[\"\",null])),e.push(u),a[0]?s[0]|=2:(s[h-2]=0,s[h]=u)):e.push(a)}return e},t=new Map;/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(s){var r=t.get(this);return r||(r=new Map,t.set(this,r)),(r=n(this,r.get(s)||(r.set(s,r=function(n){for(var t,s,r=1,e=\"\",u=\"\",h=[0],p=function(n){1===r&&(n||(e=e.replace(/^\\s*\\n\\s*|\\s*\\n\\s*$/g,\"\")))?h.push(0,n,e):3===r&&(n||e)?(h.push(3,n,e),r=2):2===r&&\"...\"===e&&n?h.push(4,n,0):2===r&&e&&!n?h.push(5,0,!0,e):r>=5&&((e||!n&&5===r)&&(h.push(r,0,e,s),r=6),n&&(h.push(r,n,0,s),r=6)),e=\"\"},a=0;a<n.length;a++){a&&(1===r&&p(),p(a));for(var l=0;l<n[a].length;l++)t=n[a][l],1===r?\"<\"===t?(p(),h=[h],r=3):e+=t:4===r?\"--\"===e&&\">\"===t?(r=1,e=\"\"):e=t+e[0]:u?t===u?u=\"\":e+=t:'\"'===t||\"'\"===t?u=t:\">\"===t?(p(),r=1):r&&(\"=\"===t?(r=5,s=e,e=\"\"):\"/\"===t&&(r<5||\">\"===n[a][l+1])?(p(),3===r&&(h=h[0]),r=h,(h=h[0]).push(2,0,r),r=0):\" \"===t||\"\\t\"===t||\"\\n\"===t||\"\\r\"===t?(p(),r=2):e+=t),3===r&&\"!--\"===e&&(r=4,h=h[0])}return p(),h}(s)),r),arguments,[])).length>1?r:r[0]}\n\n\n//# sourceURL=webpack://client/../node_modules/htm/dist/htm.module.js?");

/***/ }),

/***/ "../node_modules/preact/dist/preact.module.js":
/*!****************************************************!*\
  !*** ../node_modules/preact/dist/preact.module.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Component: () => (/* binding */ b),\n/* harmony export */   Fragment: () => (/* binding */ k),\n/* harmony export */   cloneElement: () => (/* binding */ F),\n/* harmony export */   createContext: () => (/* binding */ G),\n/* harmony export */   createElement: () => (/* binding */ y),\n/* harmony export */   createRef: () => (/* binding */ _),\n/* harmony export */   h: () => (/* binding */ y),\n/* harmony export */   hydrate: () => (/* binding */ E),\n/* harmony export */   isValidElement: () => (/* binding */ t),\n/* harmony export */   options: () => (/* binding */ l),\n/* harmony export */   render: () => (/* binding */ D),\n/* harmony export */   toChildArray: () => (/* binding */ C)\n/* harmony export */ });\nvar n,l,u,t,i,o,r,f,e,c={},s=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,h=Array.isArray;function v(n,l){for(var u in l)n[u]=l[u];return n}function p(n){var l=n.parentNode;l&&l.removeChild(n)}function y(l,u,t){var i,o,r,f={};for(r in u)\"key\"==r?i=u[r]:\"ref\"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):t),\"function\"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return d(l,f,i,o,null)}function d(n,t,i,o,r){var f={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++u:r};return null==r&&null!=l.vnode&&l.vnode(f),f}function _(){return{current:null}}function k(n){return n.children}function b(n,l){this.props=n,this.context=l}function g(n,l){if(null==l)return n.__?g(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return\"function\"==typeof n.type?g(n):null}function m(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return m(n)}}function w(n){(!n.__d&&(n.__d=!0)&&i.push(n)&&!x.__r++||o!==l.debounceRendering)&&((o=l.debounceRendering)||r)(x)}function x(){var n,l,u,t,o,r,e,c,s;for(i.sort(f);n=i.shift();)n.__d&&(l=i.length,t=void 0,o=void 0,r=void 0,c=(e=(u=n).__v).__e,(s=u.__P)&&(t=[],o=[],(r=v({},e)).__v=e.__v+1,L(s,e,r,u.__n,void 0!==s.ownerSVGElement,null!=e.__h?[c]:null,t,null==c?g(e):c,e.__h,o),M(t,e,o),e.__e!=c&&m(e)),i.length>l&&i.sort(f));x.__r=0}function P(n,l,u,t,i,o,r,f,e,a,v){var p,y,_,b,m,w,x,P,C,H=0,I=t&&t.__k||s,T=I.length,j=T,z=l.length;for(u.__k=[],p=0;p<z;p++)null!=(b=u.__k[p]=null==(b=l[p])||\"boolean\"==typeof b||\"function\"==typeof b?null:\"string\"==typeof b||\"number\"==typeof b||\"bigint\"==typeof b?d(null,b,null,null,b):h(b)?d(k,{children:b},null,null,null):b.__b>0?d(b.type,b.props,b.key,b.ref?b.ref:null,b.__v):b)?(b.__=u,b.__b=u.__b+1,-1===(P=A(b,I,x=p+H,j))?_=c:(_=I[P]||c,I[P]=void 0,j--),L(n,b,_,i,o,r,f,e,a,v),m=b.__e,(y=b.ref)&&_.ref!=y&&(_.ref&&O(_.ref,null,b),v.push(y,b.__c||m,b)),null!=m&&(null==w&&(w=m),(C=_===c||null===_.__v)?-1==P&&H--:P!==x&&(P===x+1?H++:P>x?j>z-x?H+=P-x:H--:H=P<x&&P==x-1?P-x:0),x=p+H,\"function\"!=typeof b.type||P===x&&_.__k!==b.__k?\"function\"==typeof b.type||P===x&&!C?void 0!==b.__d?(e=b.__d,b.__d=void 0):e=m.nextSibling:e=S(n,m,e):e=$(b,e,n),\"function\"==typeof u.type&&(u.__d=e))):(_=I[p])&&null==_.key&&_.__e&&(_.__e==e&&(e=g(_)),q(_,_,!1),I[p]=null);for(u.__e=w,p=T;p--;)null!=I[p]&&(\"function\"==typeof u.type&&null!=I[p].__e&&I[p].__e==u.__d&&(u.__d=I[p].__e.nextSibling),q(I[p],I[p]))}function $(n,l,u){for(var t,i=n.__k,o=0;i&&o<i.length;o++)(t=i[o])&&(t.__=n,l=\"function\"==typeof t.type?$(t,l,u):S(u,t.__e,l));return l}function C(n,l){return l=l||[],null==n||\"boolean\"==typeof n||(h(n)?n.some(function(n){C(n,l)}):l.push(n)),l}function S(n,l,u){return null==u||u.parentNode!==n?n.insertBefore(l,null):l==u&&null!=l.parentNode||n.insertBefore(l,u),l.nextSibling}function A(n,l,u,t){var i=n.key,o=n.type,r=u-1,f=u+1,e=l[u];if(null===e||e&&i==e.key&&o===e.type)return u;if(t>(null!=e?1:0))for(;r>=0||f<l.length;){if(r>=0){if((e=l[r])&&i==e.key&&o===e.type)return r;r--}if(f<l.length){if((e=l[f])&&i==e.key&&o===e.type)return f;f++}}return-1}function H(n,l,u,t,i){var o;for(o in u)\"children\"===o||\"key\"===o||o in l||T(n,o,null,u[o],t);for(o in l)i&&\"function\"!=typeof l[o]||\"children\"===o||\"key\"===o||\"value\"===o||\"checked\"===o||u[o]===l[o]||T(n,o,l[o],u[o],t)}function I(n,l,u){\"-\"===l[0]?n.setProperty(l,null==u?\"\":u):n[l]=null==u?\"\":\"number\"!=typeof u||a.test(l)?u:u+\"px\"}function T(n,l,u,t,i){var o;n:if(\"style\"===l)if(\"string\"==typeof u)n.style.cssText=u;else{if(\"string\"==typeof t&&(n.style.cssText=t=\"\"),t)for(l in t)u&&l in u||I(n.style,l,\"\");if(u)for(l in u)t&&u[l]===t[l]||I(n.style,l,u[l])}else if(\"o\"===l[0]&&\"n\"===l[1])o=l!==(l=l.replace(/(PointerCapture)$|Capture$/,\"$1\")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t||n.addEventListener(l,o?z:j,o):n.removeEventListener(l,o?z:j,o);else if(\"dangerouslySetInnerHTML\"!==l){if(i)l=l.replace(/xlink(H|:h)/,\"h\").replace(/sName$/,\"s\");else if(\"width\"!==l&&\"height\"!==l&&\"href\"!==l&&\"list\"!==l&&\"form\"!==l&&\"tabIndex\"!==l&&\"download\"!==l&&\"rowSpan\"!==l&&\"colSpan\"!==l&&l in n)try{n[l]=null==u?\"\":u;break n}catch(n){}\"function\"==typeof u||(null==u||!1===u&&\"-\"!==l[4]?n.removeAttribute(l):n.setAttribute(l,u))}}function j(n){return this.l[n.type+!1](l.event?l.event(n):n)}function z(n){return this.l[n.type+!0](l.event?l.event(n):n)}function L(n,u,t,i,o,r,f,e,c,s){var a,p,y,d,_,g,m,w,x,$,C,S,A,H,I,T=u.type;if(void 0!==u.constructor)return null;null!=t.__h&&(c=t.__h,e=u.__e=t.__e,u.__h=null,r=[e]),(a=l.__b)&&a(u);n:if(\"function\"==typeof T)try{if(w=u.props,x=(a=T.contextType)&&i[a.__c],$=a?x?x.props.value:a.__:i,t.__c?m=(p=u.__c=t.__c).__=p.__E:(\"prototype\"in T&&T.prototype.render?u.__c=p=new T(w,$):(u.__c=p=new b(w,$),p.constructor=T,p.render=B),x&&x.sub(p),p.props=w,p.state||(p.state={}),p.context=$,p.__n=i,y=p.__d=!0,p.__h=[],p._sb=[]),null==p.__s&&(p.__s=p.state),null!=T.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=v({},p.__s)),v(p.__s,T.getDerivedStateFromProps(w,p.__s))),d=p.props,_=p.state,p.__v=u,y)null==T.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==T.getDerivedStateFromProps&&w!==d&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(w,$),!p.__e&&(null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(w,p.__s,$)||u.__v===t.__v)){for(u.__v!==t.__v&&(p.props=w,p.state=p.__s,p.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.forEach(function(n){n&&(n.__=u)}),C=0;C<p._sb.length;C++)p.__h.push(p._sb[C]);p._sb=[],p.__h.length&&f.push(p);break n}null!=p.componentWillUpdate&&p.componentWillUpdate(w,p.__s,$),null!=p.componentDidUpdate&&p.__h.push(function(){p.componentDidUpdate(d,_,g)})}if(p.context=$,p.props=w,p.__P=n,p.__e=!1,S=l.__r,A=0,\"prototype\"in T&&T.prototype.render){for(p.state=p.__s,p.__d=!1,S&&S(u),a=p.render(p.props,p.state,p.context),H=0;H<p._sb.length;H++)p.__h.push(p._sb[H]);p._sb=[]}else do{p.__d=!1,S&&S(u),a=p.render(p.props,p.state,p.context),p.state=p.__s}while(p.__d&&++A<25);p.state=p.__s,null!=p.getChildContext&&(i=v(v({},i),p.getChildContext())),y||null==p.getSnapshotBeforeUpdate||(g=p.getSnapshotBeforeUpdate(d,_)),P(n,h(I=null!=a&&a.type===k&&null==a.key?a.props.children:a)?I:[I],u,t,i,o,r,f,e,c,s),p.base=u.__e,u.__h=null,p.__h.length&&f.push(p),m&&(p.__E=p.__=null)}catch(n){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),l.__e(n,u,t)}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=N(t.__e,u,t,i,o,r,f,c,s);(a=l.diffed)&&a(u)}function M(n,u,t){for(var i=0;i<t.length;i++)O(t[i],t[++i],t[++i]);l.__c&&l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u)})}catch(n){l.__e(n,u.__v)}})}function N(l,u,t,i,o,r,f,e,s){var a,v,y,d=t.props,_=u.props,k=u.type,b=0;if(\"svg\"===k&&(o=!0),null!=r)for(;b<r.length;b++)if((a=r[b])&&\"setAttribute\"in a==!!k&&(k?a.localName===k:3===a.nodeType)){l=a,r[b]=null;break}if(null==l){if(null===k)return document.createTextNode(_);l=o?document.createElementNS(\"http://www.w3.org/2000/svg\",k):document.createElement(k,_.is&&_),r=null,e=!1}if(null===k)d===_||e&&l.data===_||(l.data=_);else{if(r=r&&n.call(l.childNodes),v=(d=t.props||c).dangerouslySetInnerHTML,y=_.dangerouslySetInnerHTML,!e){if(null!=r)for(d={},b=0;b<l.attributes.length;b++)d[l.attributes[b].name]=l.attributes[b].value;(y||v)&&(y&&(v&&y.__html==v.__html||y.__html===l.innerHTML)||(l.innerHTML=y&&y.__html||\"\"))}if(H(l,_,d,o,e),y)u.__k=[];else if(P(l,h(b=u.props.children)?b:[b],u,t,i,o&&\"foreignObject\"!==k,r,f,r?r[0]:t.__k&&g(t,0),e,s),null!=r)for(b=r.length;b--;)null!=r[b]&&p(r[b]);e||(\"value\"in _&&void 0!==(b=_.value)&&(b!==l.value||\"progress\"===k&&!b||\"option\"===k&&b!==d.value)&&T(l,\"value\",b,d.value,!1),\"checked\"in _&&void 0!==(b=_.checked)&&b!==l.checked&&T(l,\"checked\",b,d.checked,!1))}return l}function O(n,u,t){try{\"function\"==typeof n?n(u):n.current=u}catch(n){l.__e(n,t)}}function q(n,u,t){var i,o;if(l.unmount&&l.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||O(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(n){l.__e(n,u)}i.base=i.__P=null,n.__c=void 0}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&q(i[o],u,t||\"function\"!=typeof n.type);t||null==n.__e||p(n.__e),n.__=n.__e=n.__d=void 0}function B(n,l,u){return this.constructor(n,u)}function D(u,t,i){var o,r,f,e;l.__&&l.__(u,t),r=(o=\"function\"==typeof i)?null:i&&i.__k||t.__k,f=[],e=[],L(t,u=(!o&&i||t).__k=y(k,null,[u]),r||c,c,void 0!==t.ownerSVGElement,!o&&i?[i]:r?null:t.firstChild?n.call(t.childNodes):null,f,!o&&i?i:r?r.__e:t.firstChild,o,e),M(f,u,e)}function E(n,l){D(n,l,E)}function F(l,u,t){var i,o,r,f,e=v({},l.props);for(r in l.type&&l.type.defaultProps&&(f=l.type.defaultProps),u)\"key\"==r?i=u[r]:\"ref\"==r?o=u[r]:e[r]=void 0===u[r]&&void 0!==f?f[r]:u[r];return arguments.length>2&&(e.children=arguments.length>3?n.call(arguments,2):t),d(l.type,e,i||l.key,o||l.ref,null)}function G(n,l){var u={__c:l=\"__cC\"+e++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,t;return this.getChildContext||(u=[],(t={})[l]=this,this.getChildContext=function(){return t},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(function(n){n.__e=!0,w(n)})},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n=s.slice,l={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l}throw n}},u=0,t=function(n){return null!=n&&void 0===n.constructor},b.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=v({},this.state),\"function\"==typeof n&&(n=n(v({},u),this.props)),n&&v(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),w(this))},b.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),w(this))},b.prototype.render=k,i=[],r=\"function\"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f=function(n,l){return n.__v.__b-l.__v.__b},x.__r=0,e=0;\n//# sourceMappingURL=preact.module.js.map\n\n\n//# sourceURL=webpack://client/../node_modules/preact/dist/preact.module.js?");

/***/ }),

/***/ "../node_modules/preact/hooks/dist/hooks.module.js":
/*!*********************************************************!*\
  !*** ../node_modules/preact/hooks/dist/hooks.module.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCallback: () => (/* binding */ T),\n/* harmony export */   useContext: () => (/* binding */ q),\n/* harmony export */   useDebugValue: () => (/* binding */ x),\n/* harmony export */   useEffect: () => (/* binding */ p),\n/* harmony export */   useErrorBoundary: () => (/* binding */ P),\n/* harmony export */   useId: () => (/* binding */ V),\n/* harmony export */   useImperativeHandle: () => (/* binding */ A),\n/* harmony export */   useLayoutEffect: () => (/* binding */ y),\n/* harmony export */   useMemo: () => (/* binding */ F),\n/* harmony export */   useReducer: () => (/* binding */ s),\n/* harmony export */   useRef: () => (/* binding */ _),\n/* harmony export */   useState: () => (/* binding */ h)\n/* harmony export */ });\n/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ \"../node_modules/preact/dist/preact.module.js\");\nvar t,r,u,i,o=0,f=[],c=[],e=preact__WEBPACK_IMPORTED_MODULE_0__.options.__b,a=preact__WEBPACK_IMPORTED_MODULE_0__.options.__r,v=preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed,l=preact__WEBPACK_IMPORTED_MODULE_0__.options.__c,m=preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;function d(t,u){preact__WEBPACK_IMPORTED_MODULE_0__.options.__h&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__h(r,t,o||u),o=0;var i=r.__H||(r.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({__V:c}),i.__[t]}function h(n){return o=1,s(B,n)}function s(n,u,i){var o=d(t++,2);if(o.t=n,!o.__c&&(o.__=[i?i(u):B(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}))}],o.__c=r,!r.u)){var f=function(n,t,r){if(!o.__c.__H)return!0;var u=o.__c.__H.__.filter(function(n){return n.__c});if(u.every(function(n){return!n.__N}))return!c||c.call(this,n,t,r);var i=!1;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=!0)}}),!(!i&&o.__c.props===n)&&(!c||c.call(this,n,t,r))};r.u=!0;var c=r.shouldComponentUpdate,e=r.componentWillUpdate;r.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u}e&&e.call(this,n,t,r)},r.shouldComponentUpdate=f}return o.__N||o.__}function p(u,i){var o=d(t++,3);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&z(o.__H,i)&&(o.__=u,o.i=i,r.__H.__h.push(o))}function y(u,i){var o=d(t++,4);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&z(o.__H,i)&&(o.__=u,o.i=i,r.__h.push(o))}function _(n){return o=5,F(function(){return{current:n}},[])}function A(n,t,r){o=6,y(function(){return\"function\"==typeof n?(n(t()),function(){return n(null)}):n?(n.current=t(),function(){return n.current=null}):void 0},null==r?r:r.concat(n))}function F(n,r){var u=d(t++,7);return z(u.__H,r)?(u.__V=n(),u.i=r,u.__h=n,u.__V):u.__}function T(n,t){return o=8,F(function(){return n},t)}function q(n){var u=r.context[n.__c],i=d(t++,9);return i.c=n,u?(null==i.__&&(i.__=!0,u.sub(r)),u.props.value):n.__}function x(t,r){preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue&&preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue(r?r(t):t)}function P(n){var u=d(t++,10),i=h();return u.__=n,r.componentDidCatch||(r.componentDidCatch=function(n,t){u.__&&u.__(n,t),i[1](n)}),[i[0],function(){i[1](void 0)}]}function V(){var n=d(t++,11);if(!n.__){for(var u=r.__v;null!==u&&!u.__m&&null!==u.__;)u=u.__;var i=u.__m||(u.__m=[0,0]);n.__=\"P\"+i[0]+\"-\"+i[1]++}return n.__}function b(){for(var t;t=f.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(k),t.__H.__h.forEach(w),t.__H.__h=[]}catch(r){t.__H.__h=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r,t.__v)}}preact__WEBPACK_IMPORTED_MODULE_0__.options.__b=function(n){r=null,e&&e(n)},preact__WEBPACK_IMPORTED_MODULE_0__.options.__r=function(n){a&&a(n),t=0;var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=c,n.__N=n.i=void 0})):(i.__h.forEach(k),i.__h.forEach(w),i.__h=[],t=0)),u=r},preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed=function(t){v&&v(t);var o=t.__c;o&&o.__H&&(o.__H.__h.length&&(1!==f.push(o)&&i===preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame||((i=preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame)||j)(b)),o.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==c&&(n.__=n.__V),n.i=void 0,n.__V=c})),u=r=null},preact__WEBPACK_IMPORTED_MODULE_0__.options.__c=function(t,r){r.some(function(t){try{t.__h.forEach(k),t.__h=t.__h.filter(function(n){return!n.__||w(n)})}catch(u){r.some(function(n){n.__h&&(n.__h=[])}),r=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u,t.__v)}}),l&&l(t,r)},preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount=function(t){m&&m(t);var r,u=t.__c;u&&u.__H&&(u.__H.__.forEach(function(n){try{k(n)}catch(n){r=n}}),u.__H=void 0,r&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r,u.__v))};var g=\"function\"==typeof requestAnimationFrame;function j(n){var t,r=function(){clearTimeout(u),g&&cancelAnimationFrame(t),setTimeout(n)},u=setTimeout(r,100);g&&(t=requestAnimationFrame(r))}function k(n){var t=r,u=n.__c;\"function\"==typeof u&&(n.__c=void 0,u()),r=t}function w(n){var t=r;n.__c=n.__(),r=t}function z(n,t){return!n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function B(n,t){return\"function\"==typeof t?t(n):t}\n//# sourceMappingURL=hooks.module.js.map\n\n\n//# sourceURL=webpack://client/../node_modules/preact/hooks/dist/hooks.module.js?");

/***/ }),

/***/ "../node_modules/uuid/dist/esm-browser/native.js":
/*!*******************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/native.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  randomUUID\n});\n\n//# sourceURL=webpack://client/../node_modules/uuid/dist/esm-browser/native.js?");

/***/ }),

/***/ "../node_modules/uuid/dist/esm-browser/regex.js":
/*!******************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/regex.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://client/../node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "../node_modules/uuid/dist/esm-browser/rng.js":
/*!****************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/rng.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\nlet getRandomValues;\nconst rnds8 = new Uint8Array(16);\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);\n\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://client/../node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "../node_modules/uuid/dist/esm-browser/stringify.js":
/*!**********************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/stringify.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"../node_modules/uuid/dist/esm-browser/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nconst byteToHex = [];\n\nfor (let i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).slice(1));\n}\n\nfunction unsafeStringify(arr, offset = 0) {\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();\n}\n\nfunction stringify(arr, offset = 0) {\n  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://client/../node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "../node_modules/uuid/dist/esm-browser/v4.js":
/*!***************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/v4.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ \"../node_modules/uuid/dist/esm-browser/native.js\");\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ \"../node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ \"../node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\n\nfunction v4(options, buf, offset) {\n  if (_native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID && !buf && !options) {\n    return _native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID();\n  }\n\n  options = options || {};\n  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (let i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack://client/../node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "../node_modules/uuid/dist/esm-browser/validate.js":
/*!*********************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/validate.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"../node_modules/uuid/dist/esm-browser/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://client/../node_modules/uuid/dist/esm-browser/validate.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "client:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkclient"] = self["webpackChunkclient"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;