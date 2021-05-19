
async function api(url, result) {
    try {
        const res = await fetch(url);
        const jsonResult = await res.json();
        result.innerText = "The Hebrew date is: " + jsonResult.hebrew;
    } catch (error) {
        result.innerText = "Something went wrong " + error;
    }
}


function getDate() {
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    const result = document.querySelector("#result");
    let msg = "";
    let badInput = false;

    if (Number(day) === NaN || (Number(year) === NaN)) {
        msg += "only numbers are allowd in day and year \n";
        badInput = true;
    }

    if (Number(day) > 31 || Number(day) < 1) {
        msg += "The day must be between 1 - 31\n";
        badInput = true;
    }

    if (Number(year) < 1753) {
        // the site is accurate up to 1753
        msg += "The year must be larger than 1752\n";
        badInput = true;
    }

    if (month === "4" || month === "6" || month === "9" || month === "11") {
        if (Number(day) === 31) {
            msg += "There are only 30 days in this month\n";
            badInput = true;
        }
    }
    if (month === "2") {
        if (Number(day) > 29) {
            msg += "February only has up to 29 days\n";
            badInput = true;
        } else if (Number(day) === 29) {
            if (Number(year) % 4 !== 0 || (Number(year) % 100 === 0 && Number(year) % 400 !== 0)) {
                msg += "Only leap years has 29 day in February\n";
                badInput = true;
            }
        }
    }

    if (badInput) {
        result.innerText = msg;
    } else {
        api("https://www.hebcal.com/converter?cfg=json&gy=" + year + "&gm=" + month + "&gd=" + day + "&g2h=1", result);
    }

}