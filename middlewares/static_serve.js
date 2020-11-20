const path = require('path');
const fs = require('fs');
const mime = require('mime');

const defaultStaticExt = ['.js', '.css', '.jpg', '.jpeg', '.png', '.ico', '.map'];

function serve(staticDir, staticExt = defaultStaticExt) {
  return async function serve(ctx, next) {
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