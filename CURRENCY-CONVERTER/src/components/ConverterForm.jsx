import CurrencySelector from "../CurrencySelector"
import { useEffect, useState } from 'react';



const ConverterForm = () => {
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("GHS");
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    // swapping currencies using the icon
    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }
// function to fetch exchange rates
    const getExchangeRate = async () => {
        // API call to get exchange rate
        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;
          //  log toCurrency and fromCurrency to console
       
          setIsLoading(true);
        // handling errors
        try {
            const response = await fetch(API_URL);
            if(!response.ok) throw Error("Something went wrong!");

            const data = await response.json();
            const rate = (data.conversion_rate * amount).toFixed(2);
            setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);

        } catch (error) {
            console.log(error);
            
        } finally {
          setIsLoading(false);
        }
   

        }
     

    
    // handling form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        getExchangeRate();
        //  log toCurrency and fromCurrency to console
        console.log(fromCurrency, toCurrency);

        }
        // fetch exchange rate on initial render
        useEffect(() => getExchangeRate, []);

  return (
    <form className="converter-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label">Enter an amount</label>
          <input type="number" className="form-input" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        {/* second-group */}
        <div className="form-group-A">
        <div className="form-section">
            <label className="form-label F">From</label>
          <CurrencySelector 
            selectedCurrency={fromCurrency}

            //  updating selected currency code
            handleCurrency={e =>  setFromCurrency(e.target.value) }
          />

        </div>
        <div className="swap-icon" onClick={handleSwap}>
    <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
        fill="#fff"
    />
    </svg>
    </div> 

        <div className="form-section">
            <label className="form-label T">To</label>
            <CurrencySelector  
                selectedCurrency={toCurrency}  
                //  updating selected currency code
                handleCurrency={e =>  setToCurrency(e.target.value) }
            />
        </div>
        </div>
        <button className={`${isLoading ? "Loading" : ""} submit-button`} type="submit">Convert</button>
        <p className="exhange-rate-results">
          {/* display conversion results */}
        {isLoading ? "Getting exchange rate" : result}
          
        </p>
  </form>
  
  
  )
}

export default ConverterForm;
