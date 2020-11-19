const path = require('path');
const fs = require('fs');
const mime = require('mime');

const staticExt = ['.js', '.css', '.jpg', '.jpeg', '.png', '.ico', '.map'];

function serve(staticDir) {
  console.log(staticDir)
  return async function serve(ctx, next) {
    let done = false;
    const { method, url } = ctx.request;
    const ext = path.parse(url).ext;
    const mimeType = mime.getType(ext);
    if (method === 'HEAD' || method === 'GET' && url !== '/') {
      if (staticExt.includes(ext)) {
        try {
          ctx.set("Content-Type", mimeType);
          ctx.body = await fs.readFileSync(`${staticDir}${url}`);
        } catch (error) {
          if (error.status !== 404) {
            throw error
          }
        }
      }
    }
    
    await next();
  }
}

module.exports = serve;