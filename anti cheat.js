/* ==========================================
   ANTI-CHEAT SYSTEM
========================================== */

const MAX_VIOLATIONS = 3;

let violationCount = 0;
let antiCheatViolations = [];


/* ==========================================
   RECORD VIOLATION
========================================== */

function recordAntiCheatViolation(reason) {

    if (
        typeof quizStarted !== "undefined" &&
        typeof quizFinished !== "undefined"
    ) {

        if (!quizStarted || quizFinished) {
            return;
        }

    }

    violationCount++;

    const violation = {

        reason: reason,

        count: violationCount,

        time: new Date().toISOString()

    };

    antiCheatViolations.push(violation);

    console.warn(
        "ANTI-CHEAT VIOLATION:",
        violation
    );


    /* Maximum violations */

    if (
        violationCount >= MAX_VIOLATIONS
    ) {

        alert(
            "Maximum cheating violations reached.\n\n" +
            "Your quiz will be submitted."
        );

        if (
            typeof submitQuiz === "function"
        ) {

            submitQuiz("anti-cheat");

        }

        return;
    }


    /* Warning */

    alert(
        "Warning!\n\n" +
        reason +
        "\n\n" +
        "Violation " +
        violationCount +
        " of " +
        MAX_VIOLATIONS
    );

}


/* ==========================================
   TAB SWITCH DETECTION
========================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            typeof quizStarted !== "undefined" &&
            typeof quizFinished !== "undefined"
        ) {

            if (
                quizStarted &&
                !quizFinished &&
                document.hidden
            ) {

                recordAntiCheatViolation(
                    "You switched to another tab or left the quiz."
                );

            }

        }

    }
);


/* ==========================================
   WINDOW FOCUS DETECTION
========================================== */

window.addEventListener(
    "blur",
    function () {

        if (
            typeof quizStarted !== "undefined" &&
            typeof quizFinished !== "undefined"
        ) {

            if (
                quizStarted &&
                !quizFinished
            ) {

                recordAntiCheatViolation(
                    "Quiz window lost focus."
                );

            }

        }

    }
);


/* ==========================================
   COPY PROTECTION
========================================== */

document.addEventListener(
    "copy",
    function (event) {

        if (
            typeof quizStarted !== "undefined" &&
            typeof quizFinished !== "undefined"
        ) {

            if (
                quizStarted &&
                !quizFinished
            ) {

                event.preventDefault();

                recordAntiCheatViolation(
                    "Copying is not allowed during the quiz."
                );

            }

        }

    }
);


/* ==========================================
   CUT PROTECTION
========================================== */

document.addEventListener(
    "cut",
    function (event) {

        if (
            typeof quizStarted !== "undefined" &&
            typeof quizFinished !== "undefined"
        ) {

            if (
                quizStarted &&
                !quizFinished
            ) {

                event.preventDefault();

                recordAntiCheatViolation(
                    "Cutting text is not allowed during the quiz."
                );

            }

        }

    }
);


/* ==========================================
   PASTE PROTECTION
========================================== */

document.addEventListener(
    "paste",
    function (event) {

        if (
            typeof quizStarted !== "undefined" &&
            typeof quizFinished !== "undefined"
        ) {

            if (
                quizStarted &&
                !quizFinished
            ) {

                event.preventDefault();

                recordAntiCheatViolation(
                    "Pasting is not allowed during the quiz."
                );

            }

        }

    }
);


/* ==========================================
   RIGHT CLICK PROTECTION
========================================== */

document.addEventListener(
    "contextmenu",
    function (event) {

        if (
            typeof quizStarted !== "undefined" &&
            typeof quizFinished !== "undefined"
        ) {

            if (
                quizStarted &&
                !quizFinished
            ) {

                event.preventDefault();

                recordAntiCheatViolation(
                    "Right-click is not allowed during the quiz."
                );

            }

        }

    }
);


/* ==========================================
   TEXT SELECTION PROTECTION
========================================== */

document.addEventListener(
    "selectstart",
    function (event) {

        if (
            typeof quizStarted !== "undefined" &&
            typeof quizFinished !== "undefined"
        ) {

            if (
                quizStarted &&
                !quizFinished
            ) {

                event.preventDefault();

            }

        }

    }
);


/* ==========================================
   KEYBOARD PROTECTION
========================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            typeof quizStarted === "undefined" ||
            typeof quizFinished === "undefined"
        ) {

            return;

        }


        if (
            !quizStarted ||
            quizFinished
        ) {

            return;

        }


        const key =
            event.key.toLowerCase();


        /* Ctrl + C */

        if (
            event.ctrlKey &&
            key === "c"
        ) {

            event.preventDefault();

            recordAntiCheatViolation(
                "Copy shortcut detected."
            );

            return;

        }


        /* Ctrl + V */

        if (
            event.ctrlKey &&
            key === "v"
        ) {

            event.preventDefault();

            recordAntiCheatViolation(
                "Paste shortcut detected."
            );

            return;

        }


        /* Ctrl + X */

        if (
            event.ctrlKey &&
            key === "x"
        ) {

            event.preventDefault();

            recordAntiCheatViolation(
                "Cut shortcut detected."
            );

            return;

        }


        /* Ctrl + U */

        if (
            event.ctrlKey &&
            key === "u"
        ) {

            event.preventDefault();

            recordAntiCheatViolation(
                "View-source shortcut detected."
            );

            return;

        }


        /* F12 */

        if (
            event.key === "F12"
        ) {

            event.preventDefault();

            recordAntiCheatViolation(
                "Developer tools shortcut detected."
            );

            return;

        }


        /* Ctrl + Shift + I */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "i"
        ) {

            event.preventDefault();

            recordAntiCheatViolation(
                "Developer tools shortcut detected."
            );

            return;

        }


        /* Ctrl + Shift + J */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "j"
        ) {

            event.preventDefault();

            recordAntiCheatViolation(
                "Developer console shortcut detected."
            );

            return;

        }

    }
);