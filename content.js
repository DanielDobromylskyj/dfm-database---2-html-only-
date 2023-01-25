// Set the interval to check for the form element
let ticked = 0;
var intervalId = setInterval(function() {
    // Select all elements with the class "myClass"
    var elements = document.querySelectorAll(".question-form");

    // Loop through the elements
    for (var i = 0; i < elements.length; i++) {
        // Attach the event listener to each element
        elements[i].addEventListener("click", function (event) {

            var input = event.target;

            // Check if the input type is submit
            if (input.type === "submit" && input.value === "Submit Answer" && ticked === 0) {
                ticked = 1;

                // Stop it from calling api / server so we can make the call
                //event.preventDefault();

                // Save data / Answer --> mq-root-block


                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        const img = document.querySelector(`img[src='images/tick_icon.svg']`);
                        if (img) {
                            let div = document.querySelector('div[style="display: block;"]');
                            if (div) {
                                // Send Awnser
                                console.log("Answer Correct");

                                let Question_Number = document.getElementsByClassName("current")[0].id;
                                let currentUrl = window.location.href;

                                let div2 = document.querySelector(".answer-content");
                                let User_Answer_HTML = div2.innerHTML;

                                var User_Answer_NUMERIC = "None";

                                try {
                                    let input1 = document.querySelector("input[name='numeric-answer-1']");
                                    var User_Answer_NUMERIC = input1.value;
                                } catch (error) {
                                    console.log(error)
                                }




                                // Send POST request to server for further problems
                                let data = {
                                    question_id: currentUrl,
                                    question_num: Question_Number,
                                    question_data: [User_Answer_NUMERIC, User_Answer_HTML]
                                };


                                // http://TCXAFAWHFAWF.duckdns.org:2023/log
                                var xhr = new XMLHttpRequest();
                                xhr.open("POST", "https://dfmserver.mooo.com:2023/log", true);
                                xhr.setRequestHeader("Content-type", "application/json");
                                xhr.onreadystatechange = function() {
                                  if (xhr.readyState === 4 && xhr.status === 200) {
                                    console.log(xhr.responseText);
                                  }
                                }
                                xhr.send(JSON.stringify(data));


                            }
                        }

                    })
                })
                observer.observe(document.documentElement, {childList: true, subtree: true});
            }
        });
    }
});

// Functions


