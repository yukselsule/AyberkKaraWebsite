"use strict";
// reveal sections
const allSections = document.querySelectorAll(".section");
const revealSections = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
// Mobile nav

const menuBtn = document.querySelector(".menu");
const closeBtn = document.querySelector(".close");
const mobileNav = document.querySelector(".mobile-nav");
// const mobileNavLink = document.querySelectorAll(".mobile-nav__link");

const showMobileNav = function () {
  mobileNav.style.display = "flex";
};
const closeMobileNav = function () {
  mobileNav.style.display = "none";
};

menuBtn.addEventListener("click", showMobileNav);
closeBtn.addEventListener("click", closeMobileNav);

//  Smooth scrolling

document.querySelectorAll("a:link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href.startsWith("#")) {
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    } else if (href.startsWith("tel:")) {
    } else if (href.startsWith("mailto")) {
    } else if (href.startsWith("http")) {
    } else {
      e.preventDefault();
    }
    closeMobileNav();
  });
});

// Before-After images
document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    slider.addEventListener("input", function (e) {
      const example = e.target.closest(".example");

      const newPosition = e.target.value;
      example.style.setProperty("--position", `${newPosition}%`);
    });
  });
});

// Testimonials
/////Testimonial Data
const testimonials = [
  {
    name: "E...",
    image:
      "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1708348874~exp=1708349474~hmac=bbb6abec5d430b5e8ba4028e7a7e300c5ba23d65ee4928f9d09b43720cf75b36",
    testimonial:
      "Ayberk Bey’e arkadaş tavsiyesi ile ulaştım ve çok memnun kaldım. Güler yüzü ve samimiyeti ile yapacağı işlemleri detaylıca bilgilendirerek anlatması çok güvende hissettirdi. Bundan sonraki işlemlerim için de kendisiyle devam etmeyi düşünüyorum.",
  },
  {
    name: "K...",
    image:
      "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1708348874~exp=1708349474~hmac=bbb6abec5d430b5e8ba4028e7a7e300c5ba23d65ee4928f9d09b43720cf75b36",
    testimonial:
      "Aile hekimimizin tavsiyesi ile ulaştık. Diş teli tedavisi için başvurduk. Güler yüzlü ve ilgili yaklaşımından, alternatiflerle süreci çok güzel açıklamasından ve tedavi sürecinden gayet memnun kaldık. Tavsiye ederiz.",
  },
  {
    name: "H...",
    image:
      "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1708348874~exp=1708349474~hmac=bbb6abec5d430b5e8ba4028e7a7e300c5ba23d65ee4928f9d09b43720cf75b36",
    testimonial:
      "Doktoruma referans aracılığıyla ulaştım. Diş çekimi, küretaj yaptırdım, şimdi kaplama yaptırıyorum. Doktorumun işine verdiği önem nezaketi ve sabrı beni rahatlatıyor, tedavimden memnunum. Kesinlikle tavsiye ediyorum.",
  },
  {
    name: "B...",
    image:
      "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1708348874~exp=1708349474~hmac=bbb6abec5d430b5e8ba4028e7a7e300c5ba23d65ee4928f9d09b43720cf75b36",
    testimonial:
      "Ayberk hocayı arkadaşım aracılığıyla buldum. 1.5 sene süren bir tel tedavisi gördüm. Sonuçlarından ve hocamın ilgi ve tavrından çok memnun kaldım. Herhangi bir sorunda hemen yardımcı oluyor. Çevreme kesinlikle öneririm, öneriyorum.",
  },
  {
    name: "C...",
    image:
      "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1708348874~exp=1708349474~hmac=bbb6abec5d430b5e8ba4028e7a7e300c5ba23d65ee4928f9d09b43720cf75b36",
    testimonial:
      "Ayberk Hocayı bir diş hekimi önerdi bana. Alt çenemin geride olması ve diş eti görünümümden dolayı ameliyatlı tel tedavisi oldum. Yüzümün ve dişlerimin görüntüsünden çok memnunum. Yaklaşık 6 ay önce tellerim çıktı. Bu tedaviyi olmak isteyenlere tavsiye ederim.",
  },
  {
    name: "L...",
    image:
      "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1708348874~exp=1708349474~hmac=bbb6abec5d430b5e8ba4028e7a7e300c5ba23d65ee4928f9d09b43720cf75b36",
    testimonial:
      "Ayberk Bey'e Annemin diş problemleri nedeniyle başvurduk. Kanal tedavisi diş temizliği dolgu ve implant işlemleri uygulandı. Kendisi çok ilgili çok saygılı ve profesyonel. Eşim ve çocuklarımı da tedavi etti. Herkese rahatlıkla tavsiye ediyorum.",
  },
];

//Current Slide
let i = 0;
//Total Slides
let j = testimonials.length;

let testimonialContainer = document.getElementById("testimonial-container");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

nextBtn.addEventListener("click", () => {
  i = (j + i + 1) % j;
  displayTestimonial();
});
prevBtn.addEventListener("click", () => {
  i = (j + i - 1) % j;
  displayTestimonial();
});

let displayTestimonial = () => {
  testimonialContainer.innerHTML = `
    <p>${testimonials[i].testimonial}</p>
    <img alt="user_avatar" src=${testimonials[i].image}>
    <h3>${testimonials[i].name}</h3>
  `;
};
window.onload = displayTestimonial;

// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;

  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
