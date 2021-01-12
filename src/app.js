export function onRouteChange({ matchedRoutes }) {
  //window.scrollTo(0, 0);
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
}
