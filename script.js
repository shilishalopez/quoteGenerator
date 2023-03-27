const quoteContainer = document.getElementById('quote-container');
const category = document.getElementById('category');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const  newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const removeLoadingSpinner = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new Quote 
const newQuote = () => {
    showLoadingSpinner();
    //Pick a random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Authur field is blank
    if(quote.author === '' || quote.category === ''){
        authorText.textContent = 'Anonymous';
        category.textContent = 'General';
    }else{
        authorText.textContent = quote.author;
        category.textContent = quote.tag;
    }
    //Check quote length to detemine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-qoute');
    }else{
        quoteText.classList.remove('long-qoute');
    }
    //Set Quote and hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}
// Get quotes from api 
const getQuotes = async() => {
    showLoadingSpinner();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch Error Here 
    }
}

//Tweet Quote 
const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, 'blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);
//On load
getQuotes();
