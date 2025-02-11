document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-image img');
    const backgroundImage = document.querySelector('.background-image');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    const setBackground = () => {
        const imageUrl = profileImage.src;
        backgroundImage.style.backgroundImage = `url(${imageUrl})`;
        backgroundImage.style.backgroundSize = 'cover';
        backgroundImage.style.backgroundPosition = 'center';
    };

    const updateProfileImage = () => {
        const isDarkMode = body.classList.contains('dark-mode');
        if (isDarkMode) {
            profileImage.src = 'pabluoff-o.jpeg';
        } else {
            profileImage.src = 'pabluoff-w.JPG';
        }
        setBackground();
    };

    setBackground();

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        updateProfileImage();
    });

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        updateProfileImage();
    }

    // Share modal functionality
    const shareIcon = document.querySelector('.share-icon');
    const shareModal = document.getElementById('shareModal');
    const closeButton = document.querySelector('.close-button');
    const modalProfileImg = document.getElementById('modal-profile-img');
    const shareOptions = document.querySelector('.share-options');

    // Create overlay with fade effect
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);

    // Function to open modal with smooth animation
    function openModal() {
        requestAnimationFrame(() => {
            shareModal.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            const currentProfileImg = document.getElementById('profile-img');
            modalProfileImg.src = currentProfileImg.src;

            // Check if carousel needs scroll indicators
            checkCarouselScroll();
        });
    }

    // Function to close modal with smooth animation
    function closeModal() {
        shareModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for modal
    shareIcon.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && shareModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Create share options
    const copyFeedback = document.createElement('div');
    copyFeedback.className = 'copy-feedback';
    copyFeedback.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"/>
        </svg>
        <span>Link copiado com sucesso!</span>
    `;
    document.body.appendChild(copyFeedback);

    // Update share buttons array to include message
    const shareButtons = [
        {
            name: 'copy',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>`,
            action: () => {
                navigator.clipboard.writeText(window.location.href);
                showCopyFeedback();
            }
        },

        {
            name: 'whatsapp',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>`,
            action: () => {
                const text = encodeURIComponent("Confira o perfil do Pabluoff e descubra como ele se tornou milionário! 🚀");
                const url = encodeURIComponent(window.location.href);
                window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
            }
        },

        {
            name: 'telegram',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>`,
            action: () => {
                const text = encodeURIComponent("Confira o perfil do Pabluoff e descubra como ele se tornou milionário! 🚀");
                const url = encodeURIComponent(window.location.href);
                window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
            }
        },

    ];

    // Create and append share buttons
    shareButtons.forEach(button => {
        const buttonElement = document.createElement('button');
        buttonElement.className = `share-option ${button.name}`;
        buttonElement.innerHTML = `
            <div class="icon-circle" ${button.background ? `style="background-color: ${button.background}"` : ''}>
                ${button.icon}
            </div>
            <span>${button.name.charAt(0).toUpperCase() + button.name.slice(1)}</span>
        `;
        buttonElement.addEventListener('click', button.action);
        shareOptions.appendChild(buttonElement);
    });

    // Copy feedback function
    function showCopyFeedback() {
        copyFeedback.classList.add('show');
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    }

    let isDown = false;
    let startX;
    let scrollLeft;

    function checkCarouselScroll() {
        const hasMoreContent = shareOptions.scrollWidth > shareOptions.clientWidth;
        shareOptions.classList.toggle('has-more', hasMoreContent);
    }

    shareOptions.addEventListener('mousedown', (e) => {
        isDown = true;
        shareOptions.style.cursor = 'grabbing';
        startX = e.pageX - shareOptions.offsetLeft;
        scrollLeft = shareOptions.scrollLeft;
    });

    shareOptions.addEventListener('mouseleave', () => {
        isDown = false;
        shareOptions.style.cursor = 'grab';
    });

    shareOptions.addEventListener('mouseup', () => {
        isDown = false;
        shareOptions.style.cursor = 'grab';
    });

    shareOptions.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - shareOptions.offsetLeft;
        const walk = (x - startX) * 2;
        shareOptions.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    shareOptions.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - shareOptions.offsetLeft;
        scrollLeft = shareOptions.scrollLeft;
    });

    shareOptions.addEventListener('touchend', () => {
        isDown = false;
    });

    shareOptions.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - shareOptions.offsetLeft;
        const walk = (x - startX) * 2;
        shareOptions.scrollLeft = scrollLeft - walk;
    });

+    window.addEventListener('resize', checkCarouselScroll);
});

// Fylo text animation
function animateFyloText() {
    const fyloText = document.getElementById('fylo-text');
    if (!fyloText || fyloText.classList.contains('animated')) return;

    const letters = 'Pablu'.split('');
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.animationDelay = `${index * 0.2}s`;
        fyloText.appendChild(span);
    });
    fyloText.classList.add('animated');
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const fyloText = document.getElementById('fylo-text');
    if (!fyloText) return;

    if (isElementInViewport(fyloText)) {
        animateFyloText();
    }

    window.addEventListener('scroll', () => {
        if (isElementInViewport(fyloText)) {
            animateFyloText();
        }
    });

    if (document.body.scrollHeight <= window.innerHeight) {
        animateFyloText();
    }
});