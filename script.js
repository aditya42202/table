const styles = document.createElement("style")
styles.textContent = `
    * {
        box-sizing: border-box;
    }
    body {
        min-height: 100vh;
        margin: 0;
        padding: 32px;
        overflow-x: hidden;
        color: #172033;
        font-family: Arial, Helvetica, sans-serif;
        background:
            radial-gradient(circle at 10% 10%, rgba(147, 197, 253, 0.35), transparent 32%),
            radial-gradient(circle at 90% 85%, rgba(196, 181, 253, 0.32), transparent 30%),
            #f4f7fc;
    }
    .number-background {
        position: fixed;
        inset: 0;
        z-index: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        align-content: space-around;
        gap: 12px;
        overflow: hidden;
        padding: 16px;
        pointer-events: none;
    }
    .number-background span {
        color: #64748b;
        font-size: clamp(32px, 5vw, 64px);
        font-weight: 800;
        opacity: 0.15;
        text-align: center;
    }
    main {
        position: relative;
        z-index: 1;
    }
    h1 {
        margin: 0 0 28px;
        color: #172554;
        font-size: clamp(28px, 4vw, 40px);
        text-align: center;
    }
    #table-form {
        display: grid;
        gap: 12px;
        width: min(100%, 440px);
        margin: 0 auto 32px;
        border: 1px solid rgba(148, 163, 184, 0.35);
        border-radius: 16px;
        padding: 22px;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 10px 26px rgba(30, 64, 175, 0.12);
    }
    #table-form label {
        color: #334155;
        font-weight: 600;
    }
    #table-form input {
        width: 100%;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 10px 12px;
        font: inherit;
    }
    #table-form input:focus {
        border-color: #2563eb;
        outline: 2px solid rgba(37, 99, 235, 0.2);
    }
    #table-form button {
        border: 0;
        border-radius: 8px;
        padding: 12px;
        color: white;
        background: #2563eb;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
    }
    #table-form button:hover {
        background: #1d4ed8;
    }
    #form-error {
        min-height: 20px;
        margin: 0;
        color: #b91c1c;
    }
    .table-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 18px;
        align-items: flex-start;
    }
    .table-box {
        min-width: 190px;
        border: 1px solid rgba(148, 163, 184, 0.35);
        border-radius: 16px;
        padding: 16px;
        background: linear-gradient(145deg, #ffffff, #e8f1ff);
        box-shadow: 0 10px 26px rgba(30, 64, 175, 0.12);
        transition: transform 180ms ease, box-shadow 180ms ease;
    }
    .table-box:nth-child(3n + 2) {
        background: linear-gradient(145deg, #ffffff, #f3e8ff);
        box-shadow: 0 10px 26px rgba(107, 33, 168, 0.12);
    }
    .table-box:nth-child(3n) {
        background: linear-gradient(145deg, #ffffff, #dcfce7);
        box-shadow: 0 10px 26px rgba(21, 128, 61, 0.12);
    }
    .table-box:hover {
        transform: translateY(-4px);
        box-shadow: 0 14px 30px rgba(30, 64, 175, 0.18);
    }
    .table-box h2 {
        margin: 0 0 12px;
        color: #1d4ed8;
        text-align: center;
        font-size: 18px;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    td {
        border-bottom: 1px solid rgba(148, 163, 184, 0.22);
        padding: 7px 5px;
        text-align: center;
    }
    tr:last-child td {
        border-bottom: 0;
    }
    tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.55);
    }
    @media (max-width: 600px) {
        body {
            padding: 24px 14px;
        }
        .table-box {
            width: min(100%, 300px);
        }
    }
`
document.head.append(styles)

const numberBackground = document.createElement("div")
numberBackground.className = "number-background"
numberBackground.setAttribute("aria-hidden", "true")
numberBackground.innerHTML = Array.from({ length: 100 }, (_, index) =>
    `<span>${String(index + 1).padStart(2, "0")}</span>`
).join("")
document.body.prepend(numberBackground)

const form = document.querySelector("#table-form")
const tableCountInput = document.querySelector("#table-count")
const tableLengthInput = document.querySelector("#table-length")
const results = document.querySelector("#table-results")
const formError = document.querySelector("#form-error")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const tableCount = Number(tableCountInput.value)
    const tableLength = Number(tableLengthInput.value)
    if (!Number.isSafeInteger(tableCount) || tableCount < 1 ||
        !Number.isSafeInteger(tableLength) || tableLength < 1) {
        formError.textContent = "Dono values 1 ya usse badi poori sankhya honi chahiye."
        return
    }

    formError.textContent = ""
    results.innerHTML = Array.from({ length: tableCount }, (_, index) => {
        const number = index + 1
        const rows = Array.from({ length: tableLength }, (_, rowIndex) => {
            const multiplier = rowIndex + 1
            return `<tr><td>${number}</td><td>x</td><td>${multiplier}</td><td>=</td><td>${number * multiplier}</td></tr>`
        }).join("")

        return `<div class="table-box"><h2>Table of ${number}</h2><table>${rows}</table></div>`
    }).join("")
})
