import dict from "./dictionary.js";

async function unscramble(word) {
    //return the result of our logic
    return await (
        dict.filter(item => {
            //handle reoccurrences
            const reOccurrence1 = {}
            const reOccurrence2 = {}
            //check if their lengths are equal
            if (item.length === word.length) {
                //convert the current item to array and loop through
                item.split('').forEach(letter => {
                    //store the number of reoccurrences of each letter
                    reOccurrence1[letter] = reOccurrence1[letter] + 1 || 1;
                })
                //convert word to array and loop through
                word.split('').forEach(letter => {
                    //store the number of reoccurrences of each letter
                    reOccurrence2[letter] = reOccurrence2[letter] + 1 || 1;
                })
                //counter to increase on every match found
                let match = 0;
                for (let key in reOccurrence1) {
                    if (reOccurrence1[key] === reOccurrence2[key]) {
                        match++;
                    }
                }
                //return item
                return ((Object.keys(reOccurrence1).length === match) ? item : false);
            }
            return;
        })
    );
}
window.addEventListener('load', function () {
    //listen for click event
    document.querySelector('#btn_unscramble').addEventListener('click', function () {
        //reset the results list
        document.querySelector("#results_list").innerHTML = "";
        //disable button
        this.classList.add("disabled");
        //sanitiza input value
        const inputValue = document.querySelector("#inp_word").value.trim().toString().replaceAll(' ','');
        //call the function
        unscramble( (inputValue !== "") ? inputValue.toLowerCase() : "nowordsfound" ).then(data => {
            if(data.length > 0){
                //append data
            data.forEach(item => {
                document.querySelector("#results_list").innerHTML += `
                    <li>${item}</li>
                `;
            })
            }else{
                document.querySelector("#results_list").innerHTML = 'NO WORDS FOUND';
            }
            
            //show modal
            new mdb.Modal(document.getElementById('resultModal')).show();
            //enable button
            document.querySelector('#btn_unscramble').classList.remove("disabled");
        })
    })

    //social media sharer
    const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    const TwitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(window.location.href)}`;
    const LnLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    //set external links
    document.querySelectorAll(".sharer").forEach(link => {
        if(link.getAttribute("data-social") === "facebook"){
            link.href = fbLink;
        }else if(link.getAttribute("data-social") === "twitter"){
            link.href = TwitterLink;
        }else if(link.getAttribute("data-social") === "linkedin"){
            link.href = LnLink;
        }
    })
})