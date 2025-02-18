import { useState, useEffect } from "react";

export const FaqBuilder = ({ faqs }) => {
  const [faqData, setFaqData] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(
      faqs.map((faq) => (
        <option key={faq.id} value={faq.id} dangerouslySetInnerHTML={{ __html: faq.question }} />
      ))
    );
  }, [faqs]);

  const handleDataChange = (position, value) => {
    if (value === null) { // Delete the item
        const newData = [...faqData];
        newData.splice(position, 1);
    
        setFaqData(newData);

        return;    
    }

    const newData = [...faqData];
    newData[position] = value;

    setFaqData(newData);
  };

  const addNewFaq = () => {
    const newData = [...faqData];
    newData.push(faqs[0].id);

    setFaqData(newData);
  };

  return (
    <section className="container row">
      <div className="col-6 border-end border-warning border-2">
        <div className="row mb-2">
          <div className="col">
            <h2>FAQs</h2>
          </div>
          <div className="col d-flex justify-content-end">
            <button onClick={addNewFaq} className="btn btn-outline-warning">Add FAQ</button>
          </div>
        </div>
        <ol>
          {faqData.map((id, index) => (
            <li key={index} className="mb-2">
                <div className="input-group">
                <select
                    className="form-select custom-select"
                    value={id}
                    onChange={(e) => handleDataChange(index, e.target.value)}
                >
                    {options}
                </select>
                <div className="input-group-appen">
                    <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDataChange(index, null)}
                    >
                    ❌
                    </button>
                </div>
                </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="col-6">
        <h2 className="mb-3">Output</h2>
        <textarea className="form-control" value={`[${faqData.toString()}]`} readOnly />
      </div>
    </section>
  );
};
