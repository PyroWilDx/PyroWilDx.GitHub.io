const linkMap = new Map([
    ["C", "https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.html"],
    ["C++", "https://isocpp.org/"],
    ["Java", "https://www.java.com/"],
    ["TypeScript", "https://www.typescriptlang.org/"],
    ["Python", "https://www.python.org/"]
])

const boxRects = document.querySelectorAll(".box-rect-content");
for (const boxRect of boxRects) {
    if (linkMap.has(boxRect.textContent)) {
        boxRect.href = linkMap.get(boxRect.textContent);
        boxRect.target = '_blank';
    }
}
