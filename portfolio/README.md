# Portfolio

Bennett Christian's portfolio, a static Next.js site with no backend. Live at https://bennett-christian-portfolio.vercel.app.

## Run it

```bash
npm install
npm run dev
```

## Edit the text

Every word on the page lives in `content/site.json`.

1. Run `npm run dev` and open the local URL it prints.
2. Click **Edit text** (bottom right). Each piece of text gets a dashed outline.
3. Click any text and type. Press Enter or click away to save it to `content/site.json`.
4. Commit and push, and Vercel redeploys the live site.

The toggle only exists under `npm run dev`. The live site has no backend, so nobody can edit it there. Links (`href`) are edited in `content/site.json` directly, and the photo is `public/bennett.jpg`.
