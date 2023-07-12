fetch("/header/header.html")
    .then((res) => res.text())
    .then((html) => {
        document.body.insertAdjacentHTML("afterbegin",html);
        const logoBtn = document.querySelector("#logoBtn");
        logoBtn.addEventListener("click", function() {
          window.location.href = "/";
        });
        // JavaScript 파일 로드
        const navigation = document.querySelector('.navigation');

const menLink = document.createElement('a');
menLink.href = 'http://localhost:3000/category/men';
menLink.textContent = 'MEN';
navigation.appendChild(menLink);

const womenLink = document.createElement('a');
womenLink.href = 'http://localhost:3000/category/women';
womenLink.textContent = 'WOMEN';
navigation.appendChild(womenLink);

    })
    .catch((error) => {
        console.error('Error fetching header content:', error);
});








