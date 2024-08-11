/*
***
***** Global transition
***
*/

const observer = new IntersectionObserver(function (entries) {
  let count = 0;

  entries.forEach(item => {
    if (item.isIntersecting) {
      setTimeout(() => {
        item.target.classList.add('transition-in-done');
      }, 120 * count);
      count++;
    }
  })
}, {
  threshold: [0.4]
});

document.querySelectorAll('.transition-in').forEach((item, index) => {
  observer.observe(item);
});

/*
***
***** Smooth scroll on hashtag click
***
*/
document.querySelectorAll('a[href^="#"]').forEach(each => {
  each.addEventListener('click', (e) => {
    e.preventDefault();
    let anchorId = each.hash;

    anchorId = anchorId.replace('#', '.'); // we dont have unique id's on our sections, so rewrite to target class

    if(anchorId != "") {
      document.querySelector(anchorId).scrollIntoView({
        behavior: 'smooth'
      });
    }

  })
});