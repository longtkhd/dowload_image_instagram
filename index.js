const puppeteer = require("puppeteer");
const fs = require("fs");
const downloader = require("image-downloader");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/i.m_sexygirl/");

  const srcs = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("article img"));
    const srcs = imgs.map(i => i.getAttribute("srcset"));
    return srcs;
  })
  await browser.close();
  for (let i = 0; i < srcs.length; i++) {
    const srcSet = srcs[i];
    const split = srcSet.split(",");
    const rs = split[split.length - 1].split(" ")[0];
    downloader({
      url: rs,
      dest: "./images"
    })
  }

})();
