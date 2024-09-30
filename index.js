// const linkMap = new Map([
//     // ["Tech", "Link"]
// ]);

// const boxRects = document.querySelectorAll(".box-rect-content");
// for (const boxRect of boxRects) {
//     if (linkMap.has(boxRect.textContent)) {
//         boxRect.href = linkMap.get(boxRect.textContent);
//         boxRect.target = "_blank";
//     }
// }

const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", () => {
    const windowSelection = window.getSelection();
    if (windowSelection) {
        windowSelection.removeAllRanges();
    }

    const lightestMainColor = hslToRgb((colorPicker.value / 100) * 360, 100, 50);
    const lightMainColor =
        [lightestMainColor[0] * (123 / 222),
        lightestMainColor[1] * (93 / 161),
        lightestMainColor[2] * (189 / 245)];
    const midMainColor =
        [lightestMainColor[0] * (59 / 222),
        lightestMainColor[1] * (43 / 161),
        lightestMainColor[2] * (95 / 245)];
    const darkMainColor =
        [lightestMainColor[0] * (33 / 222),
        lightestMainColor[1] * (23 / 161),
        lightestMainColor[2] * (56 / 245)];

    document.documentElement.style.setProperty("--lightest-main-color", arrToRgb(lightestMainColor));
    document.documentElement.style.setProperty("--light-main-color", arrToRgb(lightMainColor));
    document.documentElement.style.setProperty("--mid-main-color", arrToRgb(midMainColor));
    document.documentElement.style.setProperty("--dark-main-color", arrToRgb(darkMainColor));

    const imgProjBorderColor =
        [lightestMainColor[0] * (159 / 222),
        lightestMainColor[1] * (116 / 161),
        lightestMainColor[2] * (176 / 245)];
    document.documentElement.style.setProperty("--img-proj-border-color", arrToRgb(imgProjBorderColor));
});

const resetColorButton = document.getElementById("resetColorButton");
resetColorButton.addEventListener("click", () => {
    colorPicker.value = 86;

    document.documentElement.style.setProperty("--lightest-main-color", "#DEA1F5");
    document.documentElement.style.setProperty("--light-main-color", "#7B5DBD");
    document.documentElement.style.setProperty("--mid-main-color", "#3B2B5F");
    document.documentElement.style.setProperty("--dark-main-color", "#211738");

    document.documentElement.style.setProperty("--img-proj-border-color", "#9F74B0");
});

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
setTimeout(() => {
    typeText(firstName, "Pierre", () => {
        typeText(lastName, "LIN");
    });
}, 600);

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r, g, b;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h <= 360) {
        r = c;
        g = 0;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
}

function getComplementaryColor(color0) {
    const { h, s, l } = color0;
    const color1 = { h: (h + 180) % 360, s, l };

    return { color1 };
}

function getTriadicColors(color0) {
    const { h, s, l } = color0;
    const color1 = { h: (h + 120) % 360, s, l };
    const color2 = { h: (h + 240) % 360, s, l };

    return { color1, color2 };
}

function generateRandomLightColor() {
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 40) + 40;
    let l = Math.floor(Math.random() * 20) + 70;

    return { h, s, l };
}

function arrToRgb(col) {
    return "rgb(" + col[0] + ", " + col[1] + ", " + col[2] + ")";
}

function setConicGradient(className, colorList) {
    const styleSheet = document.styleSheets[0]
    let bgImage = "background-image: conic-gradient(from var(--angle), "
    for (color of colorList) {
        bgImage += hslToRgb(color.h, color.s, color.l);
        bgImage += ", ";
    }
    bgImage += hslToRgb(colorList[0].h, colorList[0].s, colorList[0].l);
    bgImage += ");";
    styleSheet.insertRule(`
        .${className}::after {
            ${bgImage}
        }
        `, styleSheet.cssRules.length)
    styleSheet.insertRule(`
        .${className}::before {
            ${bgImage}
        }
        `, styleSheet.cssRules.length)
}

function typeText(el, text, callback) {
    const index = el.textContent.length;
    if (index < text.length) {
        el.textContent += text.charAt(index);
        setTimeout(typeText, 100, el, text, callback);
    } else if (callback) {
        callback();
    }
}

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r, g, b;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h <= 360) {
        r = c;
        g = 0;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
}

function getComplementaryColor(color0) {
    const { h, s, l } = color0;
    const color1 = { h: (h + 180) % 360, s, l };

    return { color1 };
}

function getTriadicColors(color0) {
    const { h, s, l } = color0;
    const color1 = { h: (h + 120) % 360, s, l };
    const color2 = { h: (h + 240) % 360, s, l };

    return { color1, color2 };
}

function generateRandomLightColor() {
    let h = Math.floor(Math.random() * 360);
    let s = 100;
    let l = 50;

    return { h, s, l };
}

function arrToRgb(col) {
    return "rgb(" + col[0] + ", " + col[1] + ", " + col[2] + ")";
}

function setConicGradient(className, colorList) {
    const styleSheet = document.styleSheets[0]
    let bgImage = "background-image: conic-gradient(from var(--angle), "
    for (color of colorList) {
        bgImage += arrToRgb(hslToRgb(color.h, color.s, color.l));
        bgImage += ", ";
    }
    bgImage += arrToRgb(hslToRgb(colorList[0].h, colorList[0].s, colorList[0].l));
    bgImage += ");";
    console.log(bgImage)
    styleSheet.insertRule(`
        .${className}::after {
            ${bgImage}
        }
        `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        .${className}::before {
            ${bgImage}
        }
        `, styleSheet.cssRules.length);
}

function typeText(el, text, callback) {
    const index = el.textContent.length;
    if (index < text.length) {
        el.textContent += text.charAt(index);
        setTimeout(typeText, 100, el, text, callback);
    } else if (callback) {
        callback();
    }
}
