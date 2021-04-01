
const getSelector = (ele) => {
  return typeof ele === "string" ? document.querySelector(ele) : "";
};



const containerShow = () => {
  var show = getSelector(".container");
  show.className += " container-show";
};

window.onload = containerShow;

// login-signup shift
((window, document) => {
  
  let toSignBtn = getSelector(".toSign"),
    toLoginBtn = getSelector(".toLogin");
  (loginBox = getSelector(".loginBox")), (signBox = getSelector(".signupBox"));

  toSignBtn.onclick = () => {
    loginBox.className += " animate_login";
    signBox.className += " animate_sign";
  };

  toLoginBtn.onclick = () => {
    loginBox.classList.remove("animate_login");
    signBox.classList.remove("animate_sign");
  };
})(window, document);


