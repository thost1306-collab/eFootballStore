
const accountDatabase = {
    'EF26-001': { tk: 'tranducquy18032006@gmail.com', mk: '12345678' },
    'EF26-002': { tk: 'account002@gmail.com',          mk: 'matkhau002' },
    'EF26-003': { tk: 'account003@gmail.com',          mk: 'matkhau003' },
    'EF26-004': { tk: 'account004@gmail.com',          mk: 'matkhau004' },
    'EF26-005': { tk: 'account005@gmail.com',          mk: 'matkhau005' },
};
let currentAccCode = '';

const paymentModal = document.getElementById('paymentModal');
const closePaymentBtn = document.getElementById('closePaymentBtn');

function buyAcc(accId) {
    currentAccCode = accId; 

    
    const transferText = "Mua " + accId;
    document.getElementById('transferContent').innerText = transferText;
    
    
    const cards = document.querySelectorAll('.acc-card');
    let priceStr = "";
    cards.forEach(card => {
        const titleElement = card.querySelector('.acc-title');
        if (titleElement && titleElement.innerText.includes(accId)) {
            priceStr = card.getAttribute('data-price');
        }
    });
    
    
    let amount = "";
    if (priceStr) {
        amount = priceStr.replace(/\D/g, ''); 
    }

    
    const qrImage = document.getElementById('bankQrCode');
    if (qrImage) {
        qrImage.src = `https://img.vietqr.io/image/mb-0961271918-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(transferText)}&accountName=Tran+Duc+Quy`;
    }

    
    paymentModal.style.display = 'flex';
}


closePaymentBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});


window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === imageZoomModal) {
        imageZoomModal.style.display = 'none';
    }
    const accModal = document.getElementById('accountInfoModal');
    if (e.target === accModal) {
        accModal.style.display = 'none';
    }
});


function copyBankNumber() {
    const bankNumberText = document.getElementById('bankNumber').innerText;
    navigator.clipboard.writeText(bankNumberText).then(() => {
        alert("Đã copy số tài khoản: " + bankNumberText);
    }).catch(err => {
        console.error('Không thể copy', err);
    });
}


document.querySelector('.search-btn').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.acc-card');
    let found = false;
    
    cards.forEach(card => {
        const title = card.querySelector('.acc-title').innerText.toLowerCase();
        const desc = card.querySelector('.acc-desc').innerText.toLowerCase();
        
        if(title.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'flex';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    if(!found && searchTerm !== "") {
        alert("Không tìm thấy kết quả nào phù hợp với: " + searchTerm);
    }
});

// Cho phép bấm Enter để tìm kiếm luôn
document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        document.querySelector('.search-btn').click();
    }
});


const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.querySelector('.close-btn');
const loginForm = document.getElementById('loginForm');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    loginModal.style.display = 'none';
    loginBtn.innerText = "Xin chào, " + username;
    loginBtn.style.backgroundColor = "var(--primary-color)";
    loginBtn.style.color = "white";
    alert("Đăng nhập thành công! Chào mừng " + username + " đến với Shop.");
});

function socialLogin(platform) {
    loginModal.style.display = 'none';
    const btn = document.getElementById('loginBtn');
    btn.innerHTML = `<img src="${platform === 'Google' ? 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' : 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg'}" style="width: 16px; margin-right: 5px; vertical-align: middle;"> Tài khoản ${platform}`;
    btn.style.backgroundColor = "white";
    btn.style.color = "var(--text-main)";
    alert("Tuyệt vời! Bạn đã đăng nhập thành công bằng " + platform);
}


function filterCategory(category, clickedElement) {
    const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    clickedElement.classList.add('active');

    const cards = document.querySelectorAll('.acc-card');
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    document.getElementById('searchInput').value = '';
}


const imageZoomModal = document.getElementById('imageZoomModal');
const zoomedImage = document.getElementById('zoomedImage');
const closeZoomBtn = document.getElementById('closeZoomBtn');

document.querySelectorAll('.acc-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
        imageZoomModal.style.display = 'flex';
        zoomedImage.src = this.src;
    });
});

closeZoomBtn.addEventListener('click', () => {
    imageZoomModal.style.display = 'none';
});


let originalCards = [];
window.addEventListener('DOMContentLoaded', () => {
    originalCards = Array.from(document.querySelectorAll('.acc-card'));
});

document.getElementById('sortSelect').addEventListener('change', function() {
    const grid = document.getElementById('productGrid');
    let cards = Array.from(grid.querySelectorAll('.acc-card'));
    const sortValue = this.value;

    if (originalCards.length === 0) return;

    if (sortValue === 'default') {
        cards = [...originalCards];
    } else {
        cards.sort((a, b) => {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            return sortValue === 'price-asc' ? priceA - priceB : priceB - priceA;
        });
    }

    grid.innerHTML = '';
    cards.forEach(card => grid.appendChild(card));
});


const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const menuOverlay = document.getElementById('menuOverlay');

hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    menuOverlay.classList.add('active');
});

menuOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    menuOverlay.classList.remove('active');
});

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            menuOverlay.classList.remove('active');
        }
    });
});


function showAccountInfo() {
    const acc = accountDatabase[currentAccCode];
    if (!acc) {
        alert('⚠️ Không tìm thấy thông tin acc. Vui lòng nhắn Zalo!');
        window.open('https://zalo.me/0961271918', '_blank');
        return;
    }
    document.getElementById('accCodeDisplay').textContent = currentAccCode;
    document.getElementById('accEmailDisplay').textContent = acc.tk;
    document.getElementById('accPasswordDisplay').textContent = acc.mk;

    document.getElementById('paymentModal').style.display = 'none';
    document.getElementById('accountInfoModal').style.display = 'flex';
}

function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Đã copy: ' + text);
    }).catch(() => {
        alert('Nội dung: ' + text + '\n(Hãy tự copy thủ công)');
    });
}
