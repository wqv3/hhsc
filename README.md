# hhsc

a simple http header scraper built with puppeteer. each session creates a folder and stores outgoing http request headers as individual `.txt` files.

## 📦 features

- intercepts all outgoing http requests  
- logs and saves request headers  
- creates a new `session_x` folder per run  
- stores each request in a separate `request_x.txt` file  

## 🚀 usage

### install dependencies

```bash
npm install puppeteer
```

### run the scraper

```bash
node index.js
```

> right in hhsc/ folder.

## 🗂 output structure

```
sessions/
  └── session_1/
        ├── request_1.txt
        ├── request_2.txt
        └── ...
  └── session_2/
        └── ...
```

each `.txt` file contains:

```
➡️ request to: <url>

headers:
{
  "user-agent": "...",
  "accept": "...",
  ...
}
```

## ⚙️ configuration

set up:

```js
await page.goto('url', { waitUntil: 'networkidle2' });
```

-> 'url'` with yours.
