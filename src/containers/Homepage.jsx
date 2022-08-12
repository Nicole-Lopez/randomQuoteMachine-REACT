import React,{useEffect,useState}  from 'react';
import axios from 'axios';
import { Twitter, ArrowRight } from 'react-bootstrap-icons';
import './Homepage.css';

export default function Homepage() {
	const [quote, setQuote] = useState("")

	const getQuotes = async () =>{
    	await axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(res=>{
            let quoteRandom = res.data.quotes[Math.floor(Math.random()*res.data.quotes.length)]
            setQuote(quoteRandom)
    	}).catch(err=>{
        	console.log(err)
    	})
	}

	useEffect(() => {
		getQuotes()
	}, [])

	return (
		<>
		{quote?
		<div id="quote-box">
			<div id='quote'>
				<p id="text">{quote.quote}</p>
				<p id="author">- {quote.author}</p>				
			</div>
			<div id="buttons">
				<a target="_blank" rel="noopener noreferrer" id="tweet-quote" href={`https://twitter.com/intent/tweet?text="${quote.quote}" -${quote.author}`}><Twitter color="#1DA1F2" size={70}/></a>
				<button onClick={()=>getQuotes()} id="new-quote"><ArrowRight color="#000" size={70}/></button>	
			</div>
		</div>:null}
		</>
	)
}