const router = require("./routes");

const handler = (request, response) => {
  const method = request.method;
  const url = request.url;

  const urlSplit = url.split("/").filter(Boolean);

  const result = router.filter((item) => {
    return (
      item.method.toLowerCase() === method.toLowerCase() &&
      item.url.toLowerCase().startsWith(`/${urlSplit[0].toLowerCase()}`)
    );
  });

  const executeRouter = result.find((item) => {
    const routeUrlSplit = item.url.split("/").filter(Boolean);

    return urlSplit.length === routeUrlSplit.length;
  });

  if (!executeRouter) {
    response.statusCode = 404;
    return response.end("Not found");
  }

  const routerSplitUrl = executeRouter.url.split("/").filter(Boolean);

  const objParams = {};

  routerSplitUrl.forEach((item, index) => {
    if (item.startsWith(":")) {
      const formatField = item.replace(":", "");
      objParams[formatField] = urlSplit[index];
    }
  });

  request.params = objParams;
  return executeRouter.controller(request, response);
};

module.exports = handler;
