// ==UserScript==
// @name         Twitterのロゴ戻すやーつ
// @namespace    http://tampermonkey.net/
// @version      1
// @description  青い鳥を蘇生するスクリプト
// @author       β教祖
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const xLogo = 'M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0';
    const oldLogo = 'M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z';

    const fixLogo = () => {
        document.querySelectorAll('svg').forEach(container => {
            const path = container.querySelector(`path[d='${xLogo}']`);
            if (path) {
                path.style.color = 'rgb(29, 155, 240)';
                path.setAttribute('d', oldLogo);
            }
        });
    };

    const fixIcon = () => {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = 'https://abs.twimg.com/favicons/twitter.2.ico';
    };

    new MutationObserver(fixLogo).observe(document.body, {
        childList: true,
        subtree: true
    });

    fixLogo();
    fixIcon();
})();
