module.exports = async function(context, req) {

  const value = [];

  value.push("<!doctype html>");
  value.push(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">`);
  value.push("<html>");
  value.push(`<body class="container">`);

  if (req) {
    
    const formData = req.body.split("&");

    value.push(`<h1 class="title is-1" style="margin-top:20px">Form Data</h1>`);
    
    value.push(`<table class="table is-striped">`);
    value.push(`<thead>`);
    value.push(`<tr><th>Field</th><th>Value</th></tr>`);
    value.push(`</thead>`);
    value.push(`<tbody>`);

    formData.forEach(item => {
      let pair = item.split("=");
      let key = pair[0];
      let val = unescape(pair[1]).replace(/\+/g, "&nbsp;");
      value.push(`<tr><td>${key}</td><td>${val}</td></tr>`);
    });

    value.push(`</tbody>`);
    value.push("</table>");
    
    value.push(`<hr style="margin: 2em 2em 2em 0">`);

    value.push(`<h2 class="title is-2">Raw Data</h2>`);
    value.push("<pre>");
    value.push(JSON.stringify(req));
    value.push("</pre>");

  } else {
    value.push(`<h1 class="title is-1">No Form Data</h1>`);
    value.push("<p>Post some form data to see the values echoed back to you.</p>");
  }

  value.push("</body>");
  value.push("</html>");

  context.res = {
    body: value.join(""),
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  };
};
