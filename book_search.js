/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    // Check for empty search term or empty array of books
    if (searchTerm === "" || scannedTextObj.length === 0) {
        return result;
    }

    scannedTextObj.forEach(book => {
            book.Content.forEach(content => {
                // Check if the text contains the search term
                if (content.Text.includes(searchTerm)) {
                    // Add matching content to the results
                    result.Results.push({
                        "ISBN": book.ISBN,
                        "Page": content.Page,
                        "Line": content.Line
                    });
                }
            });
        });

    return result; 
}



/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Example output for positive test */
const positiveOut = {
    "SearchTerm": "profound",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/*
                __                    _ __    __          __    
 _______  ___  / /__ ____  __ _____  (_) /_  / /____ ___ / /____
/ __/ _ \/ _ \/ / -_) __/ / // / _ \/ / __/ / __/ -_|_-</ __(_-<
\__/\___/\___/_/\__/_/    \_,_/_//_/_/\__/  \__/\__/___/\__/___/
*/

/** Confirming that word is added to results list */
const positiveTestResult = findSearchTermInBooks("profound", twentyLeaguesIn);
if (positiveTestResult.Results.length > 0) {
    console.log("PASS: Positive Test");
} else {
    console.log("FAIL: Positive Test");
    console.log("Expected:", positiveOut.Results.length);
    console.log("Received:", positiveTestResult.Results.length);
}

/** Confirming that this word does not exists in the line */
const negativeTestResult = findSearchTermInBooks("pterodactyl", twentyLeaguesIn);
if (negativeTestResult.Results.length === 0) {
    console.log("PASS: Negative Test");
} else {
    console.log("FAIL: Negative Test");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", negativeTestResult.Results.length);
}

/** Confirming that the case spelling of the word does not get mixed up */
const caseSensitiveTestResult = findSearchTermInBooks("The", twentyLeaguesIn);
let caseSensitivePass = true;
// Iterate over each result and check the original text
caseSensitiveTestResult.Results.forEach(result => {
    const book = twentyLeaguesIn.find(book => book.ISBN === result.ISBN);
    const content = book.Content.find(content => content.Page === result.Page && content.Line === result.Line);
    if (!content || !content.Text.includes("The")) {
        caseSensitivePass = false;
    }
});
console.log(caseSensitivePass ? "PASS: Case-sensitive Test" : "FAIL: Case-sensitive Test");

/** Tests with empty erray of books */
const emptyBooksTestResult = findSearchTermInBooks("the", []);
console.log(
    emptyBooksTestResult.SearchTerm === "the" && emptyBooksTestResult.Results.length === 0
    ? "PASS: Empty Array of Books Test"
    : "FAIL: Empty Array of Books Test"
);

/** Tests with empty search term */
const emptySearchTermTestResult = findSearchTermInBooks("", twentyLeaguesIn);
console.log(
    emptySearchTermTestResult.SearchTerm === "" && emptySearchTermTestResult.Results.length === 0
    ? "PASS: Empty Search Term Test"
    : "FAIL: Empty Search Term Test"
);