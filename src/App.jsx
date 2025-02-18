import { useState } from "react";
import loadFaqs from "./loadFaqs";
import { FaqBuilder } from "./FaqBuilder";

function App() {
  const [faqData, setFaqData] = useState([]);
  const isLoaded = faqData.length > 0;

  const handleFileChange = (e) => {
    if (!e.target.files) return;

    loadFaqs(e.target.files[0], setFaqData);
  };

  return (
    <div className="container pt-2 px-4 text-white">
      <div className="d-flex justify-content-center border-bottom border-warning border-4 mb-4">
        <h1>Faq Builder</h1>
      </div>
      {!isLoaded && (
        <div className="d-flex justify-content-center">
          <div className="row">
            <h4 className="col-6 text-center">Upload the faq-data.js file</h4>
            <input className="col-6" type="file" onChange={handleFileChange} />
          </div>
        </div>
      )}
      {
        isLoaded && (
          <FaqBuilder faqs={faqData} />
        )
      }
    </div>
  );
}

export default App;
