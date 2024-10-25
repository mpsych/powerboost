export class Nav {
  constructor(navSelector, toggleBtnSelector) {
    this.nav = document.querySelector(navSelector);
    this.toggleBtn = document.querySelector(toggleBtnSelector);
  }

  init() {
    this.toggleBtn.addEventListener("click", () => {
      this.nav.classList.toggle("open");
    });

    this.nav.addEventListener("mousedown", () => {
      this.nav.addEventListener("mousemove", this.onDrag);
    });

    this.nav.addEventListener("mouseup", () => {
      this.nav.removeEventListener("mousemove", this.onDrag);
    });

    this.nav.addEventListener("mouseleave", () => {
      this.nav.removeEventListener("mousemove", this.onDrag);
    });

    document
      .querySelector(".fa-regular.fa-pen-to-square")
      .parentNode.addEventListener("click", () => {
        this.toggleSpan(document.querySelector(".edit-box"));
      });

    document
      .querySelector(".fa-sharp.fa-solid.fa-b")
      .parentNode.addEventListener("click", () => {
        this.toggleSpan(document.querySelector(".rect-box"));
      });
  }

  onDrag = ({ movementX, movementY }) => {
    const navStyle = window.getComputedStyle(this.nav);
    const navTop = parseInt(navStyle.top);
    const navLeft = parseInt(navStyle.left);
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    let newTop = navTop + movementY;
    let newLeft = navLeft + movementX;
    if (newTop < 0) newTop = 0;
    else if (newTop > windowHeight - this.nav.offsetHeight)
      newTop = windowHeight - this.nav.offsetHeight;
    if (newLeft < 0) newLeft = 0;
    else if (newLeft > windowWidth - this.nav.offsetWidth)
      newLeft = windowWidth - this.nav.offsetWidth;
    this.nav.style.top = `${newTop}px`;
    this.nav.style.left = `${newLeft}px`;
  };



  closeAllSpans() {
    document
      .querySelectorAll(
        ".nav-content .search-box, .nav-content .edit-box, .nav-content .rect-box"
      )
      .forEach((box) => {
        box.style.display = "none";
      });
  }

  toggleSpan(span) {
    if (span.style.display === "flex") {
      span.style.display = "none";
    } else {
      this.closeAllSpans();
      span.style.display = "flex";
    }
  }
}
