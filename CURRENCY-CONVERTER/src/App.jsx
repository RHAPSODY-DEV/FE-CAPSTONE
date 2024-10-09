import ConverterForm from "./components/ConverterForm"

const App = () => {
  return (
    <div className="currency-converter">
      <h1 className="title">Currency Converter</h1>
    <ConverterForm  />

    {/* DISPLAYING INFO ABOUT SELECTED CURRENCIES */}
    <div className="display-info">
      <h1 className="info">Currency Information</h1>
      <hr />
      <div className="em"></div>
    <div className="currency-info-box">
      {/* from currency */}
      <div className="currency-from">
        <div className="information">
        <div className="flag">
            <img src={`https://flagsapi.com/US/flat/64.png`} alt="flag" />
            <p>USD - US Dollar</p>
          </div>
        <div className="text">
          <p>
          Our currency rankings show that the most popular US Dollar exchange rate is the USD to USD rate. The currency code for US Dollars is USD. The currency symbol is $. 
          </p>
        </div>
        <a href="#">  <button>
          More US Dollar Info
        </button>
        </a>
        </div>
      </div>
    {/* to currency info */}
    <div className="currency-to">
        <div className="information">
          <div className="flag">
            <img src={`https://flagsapi.com/US/flat/64.png`} alt="flag" />
            <p>USD - US Dollar</p>
          </div>

          <div className="text">
          <p>
          Our currency rankings show that the most popular US Dollar exchange rate is the USD to USD rate. The currency code for US Dollars is USD. The currency symbol is $. 
          </p>
        </div>
      <a href="#">  <button>
          More US Dollar Info
        </button>
        </a>
        </div>
      </div>
    </div>
    </div>

    </div>
  )
}

export default App