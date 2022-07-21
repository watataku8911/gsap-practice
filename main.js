import "./style.css";
import gsap from "gsap";

/* 文字列を分割しspanで囲む */
(function () {
  const jsText = document.querySelectorAll(".js-mv_title-item");
  jsText.forEach((target) => {
    let newText = "";
    const text = target.textContent;
    const result = text.split("");
    for (let i = 0; i < result.length; i++) {
      newText += "<span>" + result[i] + "</span>";
    }
    target.innerHTML = newText;
  });
})();

const jsLoaderBg = ".js-loader-bg";
const jsDot = ".js-loader-dot-wrap > span";
const shapes = ".shape";
const jsText = ".js-mv_title-item span";
const jsHeader = ".js-header";

gsap.set([shapes, jsText], {
  opacity: 0,
  y: 30,
});
gsap.set(jsHeader, {
  opacity: 0,
  y: -50,
});
gsap.set(jsDot, {
  opacity: 0,
  y: -50,
});

const tl = gsap.timeline();
tl.to(
  /* 0.8秒後に起動 */
  jsDot,
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.8,
    stagger: {
      amount: 0.5, //0.5秒おきに
      from: "start", // 左から
      ease: "power4.inOut",
    },
  }
)
  .to(jsDot, {
    opacity: 0,
  })
  .to(jsLoaderBg, {
    y: "100%",
    delay: 0.5,
  })
  .to(
    shapes,
    {
      /* 0.2秒後に、1秒かけてバブルが個別にアニメーション */
      opacity: 1,
      y: 0,
      duration: 0.8, // seconds
      stagger: {
        amount: 0.6,
        from: "start",
        ease: "sine.in",
      },
    },
    "+=0.2"
  )
  .to(
    jsText,
    {
      /* 前のアニメーションが完了する0.1秒前に実行 */
      opacity: 1,
      y: 0,
      stagger: {
        amount: 1,
        from: "start",
        ease: "sine.in",
      },
    },
    "-=0.1"
  )
  .to(jsHeader, {
    opacity: 1,
    y: 0,
  });

// 0-----------------------------------------------------------
// mousemove
// -----------------------------------------------------------

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  gsap.set(".cursor", {
    x: mouseX,
    y: mouseY,
  });
});
