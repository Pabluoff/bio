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

    const copyFeedback = document.createElement('div');
    copyFeedback.className = 'copy-feedback';
    copyFeedback.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"/>
        </svg>
        <span>Link copiado com sucesso!</span>
    `;
    document.body.appendChild(copyFeedback);

    // Function to show copy feedback
    function showCopyFeedback() {
        copyFeedback.classList.add('show');
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    }

    // Share buttons configuration
    const shareButtons = [
        {
            name: 'copy',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>`,
            action: async () => {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    showCopyFeedback();
                } catch (err) {
                    console.error('Failed to copy:', err);
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = window.location.href;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        showCopyFeedback();
                    } catch (err) {
                        console.error('Fallback copy failed:', err);
                    }
                    document.body.removeChild(textArea);
                }
            }
        },

        {
            name: 'whatsapp',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>`,
            action: () => {
                const text = encodeURIComponent("Confira o perfil do Pabluoff!");
                const url = encodeURIComponent(window.location.href);
                window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
            }
        },
        {
            name: 'x',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>`,
            action: () => {
                const text = encodeURIComponent("Confira o perfil do Pabluoff!");
                const url = encodeURIComponent(window.location.href);
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
            }
        },
        {
            name: 'instagram',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>`,
            action: () => {
                const text = encodeURIComponent("Confira o perfil do Pabluoff!");
                const url = encodeURIComponent(window.location.href);
                window.open(`https://www.instagram.com/`, '_blank');
            }
        },
        {
            name: 'facebook',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                </svg>`,
            action: () => {
                const url = encodeURIComponent(window.location.href);
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
            }
        },
        {
            name: 'telegram',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.48.329-.913.489-1.302.479-.428-.009-1.252-.242-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.333-1.386 4.025-1.627 4.477-1.635.1-.002.32.023.465.14a.51.51 0 0 1 .171.325c.016.093.036.306.02.472z"/>
                </svg>`,
            action: () => {
                const text = encodeURIComponent("Confira o perfil do Pabluoff!");
                const url = encodeURIComponent(window.location.href);
                window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
            }
        }
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