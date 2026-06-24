import { getUTMValue } from '../../utils/utm/utm.js';
import { presendValidation } from '../../utils/recaptcha-honeypot/recaptcha-honeypot.js';

const xcriticalForms = document.querySelectorAll('.xcritical-wrapper form');
const redirectLink = wpData.redirectLink || false;

if (xcriticalForms.length > 0) {
    xcriticalForms.forEach(form => {
        let recaptchaPassed = false;
        const preloaderWrap = form.querySelector('.button-preloader-wrap');
        const inputMailwrap = form.querySelector('.xcritical-form_email');
        const errorTxt = {
            register: {
                email: 'User with this email is already registered.',
            },

            login: 'Incorrect username or password.',
        };

        form.addEventListener('xcritical_presend', async (e) => {
            if (recaptchaPassed) {
                return;
            }

            e.preventDefault();

            if (form.parentElement.id === 'xcritical-login') {
                form.removeAttribute('data-error');
                form.classList.remove('error');
            }

            window.setTimeout(() => {
                const hasError = form.querySelector('.input-wrapper .error') || false;

                document.body.classList.add('processing');
                if (!hasError && preloaderWrap) preloaderWrap.classList.add('processing');
            }, 100);

            const isHuman = await presendValidation('xcritical_form', form);

            if (isHuman.bot) {
                form.classList.add('error');
                form.dataset.error = 'Suspicious activity';

                return;
            }

            recaptchaPassed = true;

            form.dispatchEvent(new Event('submit', { bubbles: true }));

            document.body.classList.remove('processing');
            preloaderWrap?.classList.remove('processing');
        });

        form.addEventListener('xcritical_send', (evn) => {
            const response = evn.detail.response;

            response.clone().json().then(data => {
                if (response.status === 200) {
                    if (data.body?.registrationGuid) {
                        const inputEmail = inputMailwrap.querySelector('.xcritical-form_email__input');

                        window.dataLayer = window.dataLayer || [];

                        window.dataLayer.push({
                            event: 'sign_up',
                            utm_source: getUTMValue('utm_source'),
                            utm_medium: getUTMValue('utm_medium'),
                            utm_campaign: getUTMValue('utm_campaign'),
                            utm_content: getUTMValue('utm_content'),
                            utm_term: getUTMValue('utm_term'),
                            email: inputEmail.value || '',
                        });
                    }

                    if (redirectLink) {
                        let url = new URL(redirectLink);
                        let tags = wpData?.tags?.trim() ? wpData.tags.split(',').map(s => s.trim()).filter(Boolean) : ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid'];

                        
                        tags.forEach(param => {
                            const value = getUTMValue(param);
                            if (value) url.searchParams.set(param, value);
                        });

                        window.location.href = url.toString();
                    }
                    
                    return;
                }

                if (response.status === 500) {
                    if (data?.message === errorTxt.register.email) {
                        if (inputMailwrap) {
                            inputMailwrap.dataset.error = errorTxt.register.email;
                            inputMailwrap.classList.add('error');
                        }
                    }

                    if (data?.message === errorTxt.login) {
                        if (form.parentElement.id === 'xcritical-login') {
                            form.dataset.error = errorTxt.login;
                            form.classList.add('error');
                        }
                    }
                }

                document.body.classList.remove('processing');
                if (preloaderWrap) preloaderWrap.classList.remove('processing');
            }).catch(() => {
                console.log('Error sending form')
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#phone');
    const forms = document.querySelectorAll('.login-form, .register-form');
    const dangerousPattern = /[<>{}'"=;$()%\\\/]|(script|onerror|onload|javascript:|select|insert|update|delete|drop|create|alter|truncate|exec|union|grant|revoke|merge)/i;
    const patterns = {
        text: /^[A-Za-z0-9\s&\-.]{2,100}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        eng: /[а-яА-ЯЁё]/,
    };

    function validateCheckbox(checkbox, flag = true) {
        const parent = checkbox.parentElement.parentElement;
        const errorSpan = parent.querySelector('.input-message');
        
        if (!checkbox.checked) {
            if (flag) {
                if (parent) parent.classList.add('invalid');
                if (errorSpan) errorSpan.textContent = 'You must agree to continue';
            }

            return false;
        }

        if (parent) parent.classList.remove('invalid');
        if (errorSpan) errorSpan.textContent = '';

        return true;
    };

    function validateInput(input, flag = true) {
        const value = input.value.trim();
        const name = input.name;
        const parent = name === 'phone' ? input.parentElement.parentElement : input.parentElement;
        const errorSpan = parent.querySelector('.input-message');
        const label = parent.querySelector('.label');

        if (!value) {
            if (flag) {
                const errorText = input.id === 'pwd-repeat' ? 'Please repeat your password' : `Please enter your ${label.textContent.replace('*', '').toLowerCase()}`;
                if (parent) parent.classList.add('invalid');
                if (errorSpan) errorSpan.textContent = errorText;
            }

            return false;
        }

        if (dangerousPattern.test(value)) {
            if (flag) {
                if (parent) parent.classList.add('invalid');
                if (errorSpan) errorSpan.textContent = `Input contains unsafe characters`;
            }

            return false;
        }

        if (input.type === 'email') {
            if (!patterns.email.test(value)) {
                if (flag) {
                    if (parent) parent.classList.add('invalid');
                    if (errorSpan) errorSpan.textContent = `Please enter a valid email address`;
                }

                return false;
            }
        } else if (input.type === 'tel') {
            if (value.length < 5 || value.length > 16) {
                if (flag) {
                    if (parent) parent.classList.add('invalid');
                    if (errorSpan) errorSpan.textContent = `Must be 5–16 characters`;
                }

                return false;
            }
        } else if (input.type === 'password') {
            if (value.length < 10 || value.length > 100) {
                if (flag) {
                    if (parent) parent.classList.add('invalid');
                    if (errorSpan) errorSpan.textContent = `Must be 10–100 characters`;
                }

                return false;
            }

            if (patterns.eng.test(value)) {
                if (flag) {
                    if (parent) parent.classList.add('invalid');
                    if (errorSpan) errorSpan.textContent = `Only Latin letters are allowed`;
                }

                return false;
            }

            if (input.id === 'pwd-repeat') {
                const pwdInput = document.querySelector('#pwd');

                if (pwdInput && pwdInput.value.trim() !== value) {
                    if (flag) {
                        if (parent) parent.classList.add('invalid');
                        if (errorSpan) errorSpan.textContent = `Passwords don't match`;
                    }

                    return false;
                }
            }
        } else {
            if (input.type !== 'checkbox') {
                if (!patterns.text.test(value)) {
                    if (flag) {
                        if (parent) parent.classList.add('invalid');
                        if (errorSpan) errorSpan.textContent = `Must be 2–100 characters`;
                    }

                    return false;
                }

                if (patterns.eng.test(value)) {
                    if (flag) {
                        if (parent) parent.classList.add('invalid');
                        if (errorSpan) errorSpan.textContent = `Only Latin letters are allowed`;
                    }
                    
                    return false;
                }
            }
        }

        if (flag) {
            if (parent) parent.classList.remove('invalid');
            if (errorSpan) errorSpan.textContent = '';
        }

        return true;
    }

    if (input) {
        input.addEventListener('countrychange', function () {
            const countryData = iti.getSelectedCountryData();
            input.value = `+${countryData.dialCode}`;
        });

        input.addEventListener('input', function () {
            this.value = this.value.replace(/[\s()-]/g, '').replace(/[^\d+]/g, '');

            const countryData = iti.getSelectedCountryData();
            const maxLength = getMaxLength(countryData.dialCode);

            if (this.value.replace(/\D/g, '').length > maxLength) {
                this.value = this.value.slice(0, -1);
            }
        });
    }

    function getMaxLength(dialCode) {
        const maxLengths = {
            1: 11,
            7: 11,
            44: 11,
            49: 12,
            33: 10,
            380: 12,
            375: 12,
            86: 11,
            91: 12,
        };
        
        return maxLengths[dialCode] || 15;
    }

    if (forms.length > 0) {
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input');
            const checkbox = form.querySelector('input[type="checkbox"]');

            if (inputs.length > 0) {
                inputs.forEach(input => {
                    input.addEventListener('keypress', (e) => {
                        if (patterns.eng.test(String.fromCharCode(e.keyCode))) {
                            e.preventDefault();
                        }
                    });

                    input.addEventListener('input', (e) => {
                        if (patterns.eng.test(e.target.value)) {
                            e.target.value = e.target.value.replace(/[а-яА-ЯЁё]/g, '');
                        }
                    });

                    input.addEventListener('blur', () => {
                        validateInput(input);
                    });
                });
            }

            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    validateCheckbox(checkbox);
                });
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const isValid = Array.from(inputs).every(input => validateInput(input)) && validateCheckbox(checkbox);
                const formData = new FormData(form);
                const btnWrap = form.querySelector('.button-preloader-wrap');

                if (isValid && wpData.ajaxUrl) {
                    btnWrap.classList.add('processing');

                    fetch(wpData.ajaxUrl, {
                    method: "POST",
                    action: leadForm,
                    body: formData,
                    })
                    .then(response => response.json())
                    .then(data => {
                        btnWrap.classList.remove('processing');
                        console.log('succes');
                    })
                        .catch(error => {
                        alert("Something went wrong. Please try again later.");

                        btnWrap.classList.remove('processing');
                    });
                } else {
                    console.log('form validation error');
                }
            });
        });
    }
});