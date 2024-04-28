import React, { useState } from 'react';

const AntiflagFilter = () => {
    const [selectedAntiflags, setSelectedAntiflags] = useState([]);
    
    const antiflags = [
        "Frau",
        "Mann",
        "Krieger",
        "Ninja",
        "Sura",
        "Schamane",
        "ITEM_ANTIFLAG_GET",
        "ITEM_ANTIFLAG_DROP",
        "ITEM_ANTIFLAG_SELL",
        "ITEM_ANTIFLAG_EMPIRE_A",
        "ITEM_ANTIFLAG_EMPIRE_B",
        "ITEM_ANTIFLAG_EMPIRE_C",
        "ITEM_ANTIFLAG_SAVE",
        "ITEM_ANTIFLAG_GIVE",
        "ITEM_ANTIFLAG_PKDROP",
        "ITEM_ANTIFLAG_STACK",
        "ITEM_ANTIFLAG_MYSHOP",
        "ITEM_ANTIFLAG_SAFEBOX",
        "Lykaner",
        "ITEM_ANTIFLAG_UNK19",
        "ITEM_ANTIFLAG_UNK20",
        "ITEM_ANTIFLAG_UNK21",
        "ITEM_ANTIFLAG_UNK22",
        "ITEM_ANTIFLAG_CHANGELOOK",
        "ITEM_ANTIFLAG_ENERGY",
        "ITEM_ANTIFLAG_PETFEED",
        "ITEM_ANTIFLAG_APPLY",
        "ITEM_ANTIFLAG_ACCE",
        "ITEM_ANTIFLAG_MAIL"
    ];

    const handleCheckboxChange = (antiflag, index) => {
        if (selectedAntiflags.includes(index)) {
            setSelectedAntiflags(selectedAntiflags.filter(item => item !== index));
        } else {
            setSelectedAntiflags([...selectedAntiflags, index]);
        }
    };

    const calculateAntiflagSum = () => {
        let sum = 0;
        selectedAntiflags.forEach(index => {
            sum += Math.pow(2, index);
        });
        return sum;
    };
    const reverseCalculateAntiflagSum = (sum) => {
        const binarySum = sum.toString(2); // Konvertiere die Summe in eine Binärzahl
        const selectedIndices = [];
    
        // Durchlaufe die Binärzahl und finde die Stellen, an denen eine 1 ist
        for (let i = 0; i < binarySum.length; i++) {
            if (binarySum.charAt(i) === '1') {
                // Füge den Index der ausgewählten Antiflags hinzu
                selectedIndices.push(binarySum.length - 1 - i);
            }
        }
    
        return selectedIndices;
    };
    const handleSendButtonClick = async (e) => {
        e.preventDefault();
        const sum = calculateAntiflagSum();
        const selectedIndices = reverseCalculateAntiflagSum(sum);
    
    
        // Alle Antiflags, die getragen werden dürfen
        const allowedAntiflags = antiflags.filter((antiflag, index) => visibleIndices.includes(index) && !selectedIndices.includes(index));


        console.log("antiflag summe:", sum);
        console.log("ausgewähle antiflags aus der summe errechnet:", selectedIndices);
        console.log("erlaubtes tragen errechnet:", allowedAntiflags);
    };
    
    // Liste der Indizes, die nicht angezeigt werden sollen
    const visibleIndices  = [0, 1, 2, 3, 4, 5, 18]; // Zum Beispiel: die ersten drei Indizes

    return (
        <div>
            <h2>Wer soll es nicht tragen dürfen?</h2>
            <ul>
                {antiflags.map((antiflag, index) => (

                    visibleIndices.includes(index) && (
                        <li key={index}>
                            <input
                                type="checkbox"
                                id={antiflag}
                                value={antiflag}
                                checked={selectedAntiflags.includes(index)}
                                onChange={() => handleCheckboxChange(antiflag, index)}
                            />
                            <label htmlFor={antiflag}>{antiflag}</label>
                            {selectedAntiflags.includes(index) && <span> (Index: {index})</span>}
                        </li>
                    )
                ))}
            </ul>
            <h3>Summe der ausgewählten Antiflags:</h3>
            <p>{calculateAntiflagSum()}</p>
            <div>
                <button className='bg-blue-500 px-7 py-1 rounded-sm' onClick={handleSendButtonClick}>Send</button>
            </div>
        </div>
    );
};

export default AntiflagFilter;
