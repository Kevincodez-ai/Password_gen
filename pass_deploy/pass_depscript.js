const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

let result = "";

function generatePassword() {
    let length = parseInt(document.getElementById("pass_len").value, 10);
    
    // Input validation
    if (isNaN(length) || length <= 0 || length > 128) {
        document.getElementById("pass56").textContent = "❗ Enter a valid password length (1–128)";
        document.getElementById("pass_strength").textContent = "";
        return;
    }

    const includeUpper = document.getElementById("pass1").checked;
    const includeNumbers = document.getElementById("pass2").checked;
    const includeSpecial = document.getElementById("pass3").checked;

    let characters = "";
    if (includeUpper) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSpecial) characters += symbols;

    if (!characters) {
        document.getElementById("pass56").textContent = "❗ Select at least one character type.";
        document.getElementById("pass_strength").textContent = "";
        return;
    }

    result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    document.getElementById("pass56").textContent = result;

    const strengthMsg = document.getElementById("pass_strength");
    if (includeUpper && includeNumbers && includeSpecial) {
        strengthMsg.textContent = '✅ Password very secure';
    } else if ((includeUpper && includeNumbers) || (includeUpper && includeSpecial) || (includeNumbers && includeSpecial)) {
        strengthMsg.textContent = "⚠️ Secure, but add all options for maximum strength.";
    } else {
        strengthMsg.textContent = '❌ Password is weak. Add more character types.';
    }
}

function showRecent() {
    if (!result) {
        alert("⚠️ No password to store.");
        return;
    }

    localStorage.setItem('most_recent', result);
    let show = localStorage.getItem('most_recent');
    document.getElementById('most_recent1').textContent = show;
}

function copyRecentToClipboard() {
    const text = document.getElementById('most_recent1').textContent.trim();
    if (!text) {
        alert("⚠️ No recent password to copy.");
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        alert("📋 Copied to clipboard: " + text);
    }).catch(err => {
        console.error("Clipboard error:", err);
        alert("❌ Failed to copy!");
    });
}

function copyRecentToClipboard1() {
    const textToCopy = document.getElementById('pass56').textContent.trim();
    if (!textToCopy) {
        alert("⚠️ No password to copy.");
        return;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("📋 Copied to clipboard: " + textToCopy);
    }).catch(err => {
        console.error("Clipboard error:", err);
        alert("❌ Failed to copy!");
    });
}
