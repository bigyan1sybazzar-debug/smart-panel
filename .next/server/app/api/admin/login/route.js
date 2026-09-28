"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/login/route";
exports.ids = ["app/api/admin/login/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.js&appDir=D%3A%5Cweb%20apps%5Csypanel-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cweb%20apps%5Csypanel-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.js&appDir=D%3A%5Cweb%20apps%5Csypanel-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cweb%20apps%5Csypanel-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_web_apps_sypanel_nextjs_app_api_admin_login_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/login/route.js */ \"(rsc)/./app/api/admin/login/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/login/route\",\n        pathname: \"/api/admin/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/login/route\"\n    },\n    resolvedPagePath: \"D:\\\\web apps\\\\sypanel-nextjs\\\\app\\\\api\\\\admin\\\\login\\\\route.js\",\n    nextConfigOutput,\n    userland: D_web_apps_sypanel_nextjs_app_api_admin_login_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/login/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmxvZ2luJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRmxvZ2luJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZsb2dpbiUyRnJvdXRlLmpzJmFwcERpcj1EJTNBJTVDd2ViJTIwYXBwcyU1Q3N5cGFuZWwtbmV4dGpzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDd2ViJTIwYXBwcyU1Q3N5cGFuZWwtbmV4dGpzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PXN0YW5kYWxvbmUmcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDYztBQUMzRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3N5cGFuZWwtbmVwYWwvP2YzYmEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRDpcXFxcd2ViIGFwcHNcXFxcc3lwYW5lbC1uZXh0anNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxsb2dpblxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJzdGFuZGFsb25lXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FkbWluL2xvZ2luL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWRtaW4vbG9naW5cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL2xvZ2luL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcd2ViIGFwcHNcXFxcc3lwYW5lbC1uZXh0anNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxsb2dpblxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYWRtaW4vbG9naW4vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.js&appDir=D%3A%5Cweb%20apps%5Csypanel-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cweb%20apps%5Csypanel-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/admin/login/route.js":
/*!**************************************!*\
  !*** ./app/api/admin/login/route.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.js\");\n\n\nasync function POST(request) {\n    const { password } = await request.json();\n    if (password !== (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.getAdminPassword)()) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Incorrect password\"\n        }, {\n            status: 401\n        });\n    }\n    const res = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        ok: true\n    });\n    res.cookies.set(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.SESSION_COOKIE, \"authenticated\", {\n        httpOnly: true,\n        sameSite: \"lax\",\n        path: \"/\",\n        maxAge: 60 * 60 * 8\n    });\n    return res;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2xvZ2luL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNtQjtBQUV2RCxlQUFlRyxLQUFLQyxPQUFPO0lBQ2hDLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUcsTUFBTUQsUUFBUUUsSUFBSTtJQUV2QyxJQUFJRCxhQUFhSiwyREFBZ0JBLElBQUk7UUFDbkMsT0FBT0QscURBQVlBLENBQUNNLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXFCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzFFO0lBRUEsTUFBTUMsTUFBTVQscURBQVlBLENBQUNNLElBQUksQ0FBQztRQUFFSSxJQUFJO0lBQUs7SUFDekNELElBQUlFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDVixxREFBY0EsRUFBRSxpQkFBaUI7UUFDL0NXLFVBQVU7UUFDVkMsVUFBVTtRQUNWQyxNQUFNO1FBQ05DLFFBQVEsS0FBSyxLQUFLO0lBQ3BCO0lBQ0EsT0FBT1A7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL3N5cGFuZWwtbmVwYWwvLi9hcHAvYXBpL2FkbWluL2xvZ2luL3JvdXRlLmpzPzQ4ZTMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBnZXRBZG1pblBhc3N3b3JkLCBTRVNTSU9OX0NPT0tJRSB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3QpIHtcbiAgY29uc3QgeyBwYXNzd29yZCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG5cbiAgaWYgKHBhc3N3b3JkICE9PSBnZXRBZG1pblBhc3N3b3JkKCkpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbmNvcnJlY3QgcGFzc3dvcmRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICB9XG5cbiAgY29uc3QgcmVzID0gTmV4dFJlc3BvbnNlLmpzb24oeyBvazogdHJ1ZSB9KTtcbiAgcmVzLmNvb2tpZXMuc2V0KFNFU1NJT05fQ09PS0lFLCBcImF1dGhlbnRpY2F0ZWRcIiwge1xuICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgIHBhdGg6IFwiL1wiLFxuICAgIG1heEFnZTogNjAgKiA2MCAqIDgsXG4gIH0pO1xuICByZXR1cm4gcmVzO1xufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldEFkbWluUGFzc3dvcmQiLCJTRVNTSU9OX0NPT0tJRSIsIlBPU1QiLCJyZXF1ZXN0IiwicGFzc3dvcmQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJyZXMiLCJvayIsImNvb2tpZXMiLCJzZXQiLCJodHRwT25seSIsInNhbWVTaXRlIiwicGF0aCIsIm1heEFnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/login/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SESSION_COOKIE: () => (/* binding */ SESSION_COOKIE),\n/* harmony export */   getAdminPassword: () => (/* binding */ getAdminPassword),\n/* harmony export */   isAuthed: () => (/* binding */ isAuthed)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\nconst SESSION_COOKIE = \"sy_admin_session\";\nfunction getAdminPassword() {\n    return process.env.ADMIN_PASSWORD || \"Qwater123!@#\";\n}\nfunction isAuthed() {\n    const store = (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n    return store.get(SESSION_COOKIE)?.value === \"authenticated\";\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXVDO0FBRWhDLE1BQU1DLGlCQUFpQixtQkFBbUI7QUFFMUMsU0FBU0M7SUFDZCxPQUFPQyxRQUFRQyxHQUFHLENBQUNDLGNBQWMsSUFBSTtBQUN2QztBQUVPLFNBQVNDO0lBQ2QsTUFBTUMsUUFBUVAscURBQU9BO0lBQ3JCLE9BQU9PLE1BQU1DLEdBQUcsQ0FBQ1AsaUJBQWlCUSxVQUFVO0FBQzlDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3lwYW5lbC1uZXBhbC8uL2xpYi9hdXRoLmpzPzI4N2IiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT05fQ09PS0lFID0gXCJzeV9hZG1pbl9zZXNzaW9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZG1pblBhc3N3b3JkKCkge1xuICByZXR1cm4gcHJvY2Vzcy5lbnYuQURNSU5fUEFTU1dPUkQgfHwgXCJRd2F0ZXIxMjMhQCNcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXV0aGVkKCkge1xuICBjb25zdCBzdG9yZSA9IGNvb2tpZXMoKTtcbiAgcmV0dXJuIHN0b3JlLmdldChTRVNTSU9OX0NPT0tJRSk/LnZhbHVlID09PSBcImF1dGhlbnRpY2F0ZWRcIjtcbn1cbiJdLCJuYW1lcyI6WyJjb29raWVzIiwiU0VTU0lPTl9DT09LSUUiLCJnZXRBZG1pblBhc3N3b3JkIiwicHJvY2VzcyIsImVudiIsIkFETUlOX1BBU1NXT1JEIiwiaXNBdXRoZWQiLCJzdG9yZSIsImdldCIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.js&appDir=D%3A%5Cweb%20apps%5Csypanel-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cweb%20apps%5Csypanel-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();