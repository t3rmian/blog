export function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return Array.from(map);
}

export const concat = (x, y) => x.concat(y);
export const flatMap = (xs, f) => xs.map(f).reduce(concat, []);

export function countSubstrings(text, substring) {
  var m = text.match(
    new RegExp(
      substring.toString().replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"),
      "g"
    )
  );
  return m ? m.length : 0;
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function makeVisible(element, visible) {
  if (visible) {
    element.classList.remove("fadeOut");
    element.classList.add("fadeIn");
  } else {
    element.classList.remove("fadeIn");
    element.classList.add("fadeOut");
  }
}

export function loadHighlight(theme) {
  const highlightId = "hljs-theme";
  const highlight = document.getElementById(highlightId);
  const stylesHost = "/styles";
  if (!highlight) {
    const head = document.getElementsByTagName("head")[0];
    const link = document.createElement("link");
    link.id = highlightId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `${stylesHost}/${theme}.min.css`;
    link.media = "all";
    head.appendChild(link);
  } else {
    highlight.href = `${stylesHost}/${theme}.min.css`;
  }
}

export function lazyLoadImages(images) {
  const options = {
    rootMargin: "100px 0px",
    root: null
  };

  function onIntersection(images, observer) {
    images.forEach(image => {
      if (image.intersectionRatio > 0.001) {
        observer.unobserve(image.target);
        image.target.src = image.target.dataset.src;
      }
    });
  }

  const observer = new IntersectionObserver(onIntersection, options);
  images.forEach(image => observer.observe(image));
}

export function countPostMinutes(post) {
  return Math.round(0.5 + post.contents.split(" ").length / 130)
}

export function loadAds() {
  document.querySelectorAll("script[id='ads']").forEach(s => s.parentNode.removeChild(s));
  if (document.querySelectorAll("div[class='ads']").length > 0) {
    const ads = document.createElement('script');
    ads.setAttribute('id', "ads");
    ads.setAttribute('src', "//pl16160949.profitabletrustednetwork.com/f5d4cc59bf3c23a33eb58f04cbbdffd1/invoke.js");
    ads.setAttribute('async', "async");
    ads.setAttribute('data-cfasync', "false");
    document.body.appendChild(ads);
  }
}

export function injectPostAds(post) {
  if (!post.devMode) {
    post.contents = injectInMiddle(post.contents, "<div id='container-f5d4cc59bf3c23a33eb58f04cbbdffd1' class='ads'></div>");
  }
}

function injectInMiddle(contents, html) {
  function nthOccurrenceIndex(string, substring, nth) {
    const occurrenceIndex = string.indexOf(substring);
    const occurrenceLength = occurrenceIndex + 1;

    if (nth === 1) {
      return occurrenceIndex;
    } else {
      const remainingString = string.slice(occurrenceLength);
      const nextOccurrenceIndex = nthOccurrenceIndex(remainingString, substring, nth - 1);

      if (nextOccurrenceIndex === -1) {
        return -1;
      } else {
        return occurrenceLength + nextOccurrenceIndex;
      }
    }
  }

  const sizeTag = "<p";
  const middle = Math.ceil(contents.split(sizeTag).length / 2);
  const middleIndex = nthOccurrenceIndex(contents, sizeTag, middle)

  return middleIndex <= 0 ? contents :
      contents.substring(0, middleIndex) + html + contents.substring(middleIndex, contents.length)
}