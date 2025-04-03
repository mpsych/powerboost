export class Nav {
  constructor(navSelector, toggleBtnSelector) {
    this.nav = document.querySelector(navSelector);
    this.toggleBtn = document.querySelector(toggleBtnSelector);
    this.isMoving = false;
    console.log('new')
  }

  init() {

    this.toggleBtn.addEventListener("mousedown", (e) => {

      this.nav.addEventListener("mousemove", this.onDrag);
      
    });

    this.toggleBtn.addEventListener("mouseup", (e) => {

      this.nav.removeEventListener("mousemove", this.onDrag);

      if (!this.isMoving) {
        this.nav.classList.toggle("open");
        console.log('showing/closing');

        if (this.nav.classList.contains("open")) {
          // show the rectbox
          this.toggleSpan(document.querySelector(".rect-box"));
        } else {
          // hide rectbox and all kids
          console.log('hiding all')
          document
            .querySelectorAll(
                ".rect-box"
            )
            .forEach((box) => {
                box.style.display = "none";
            });

        }

        
        // document.querySelector(".rect-box").toggle("show");
      }

      this.isMoving = false;

    });

    this.toggleBtn.addEventListener("mouseleave", (e) => {
      this.nav.removeEventListener("mousemove", this.onDrag);
    });

    document
      .querySelector(".fa-regular.fa-pen-to-square")
      .parentNode.addEventListener("click", () => {
        this.toggleSpan(document.querySelector(".edit-box"));
      });

    // document
      // .querySelector(".fa-sharp.fa-solid.fa-b")
      // .parentNode
      // .addEventListener("click", () => {
        // this.toggleSpan(document.querySelector(".rect-box"));
      // });

  }

  onDrag = ({ movementX, movementY }) => {

    this.isMoving = true;

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
    // span.forEach((span) => {
      if (span.style.display === "flex") {
        span.style.display = "none";
      } else {
        // this.closeAllSpans();
        span.style.display = "flex";
      }
    // })

  }
}
