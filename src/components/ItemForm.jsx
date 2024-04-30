import React, { useState, useEffect  } from 'react';
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';

const ItemForm = () => {
    const [selectedAntiflags, setSelectedAntiflags] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        antiflag: '',
        link: '',
        type: '',
        imagelink: ''
    });
    const antiflags = [
        "Frau", "Mann", "Krieger", "Ninja", "Sura", "Schamane",
        "ITEM_ANTIFLAG_GET", "ITEM_ANTIFLAG_DROP", "ITEM_ANTIFLAG_SELL",
        "ITEM_ANTIFLAG_EMPIRE_A", "ITEM_ANTIFLAG_EMPIRE_B", "ITEM_ANTIFLAG_EMPIRE_C",
        "ITEM_ANTIFLAG_SAVE", "ITEM_ANTIFLAG_GIVE", "ITEM_ANTIFLAG_PKDROP",
        "ITEM_ANTIFLAG_STACK", "ITEM_ANTIFLAG_MYSHOP", "ITEM_ANTIFLAG_SAFEBOX",
        "Lykaner", "ITEM_ANTIFLAG_UNK19", "ITEM_ANTIFLAG_UNK20", "ITEM_ANTIFLAG_UNK21",
        "ITEM_ANTIFLAG_UNK22", "ITEM_ANTIFLAG_CHANGELOOK", "ITEM_ANTIFLAG_ENERGY",
        "ITEM_ANTIFLAG_PETFEED", "ITEM_ANTIFLAG_APPLY", "ITEM_ANTIFLAG_ACCE",
        "ITEM_ANTIFLAG_MAIL"
    ];
    const itemType = [
        "Nichts", "Waffe", "Rüstung", "Items zum benutzen", "Verbrauchsgegenstand",
        "Mineral", "Spezialitem", "Tool", "Lottery", "Geld/Yang", "Geiststein","Beutel",
        "Fisch", "Angel", "Resourcen", "Lagerfeuer",
    ];
    const visibleIndices = [0, 1, 2, 3, 4, 5, 18];
    const visibleItemtypeIndices = [ 1, 2, 3 ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (index) => {
        setSelectedAntiflags(prev => {
            const newSelected = prev.includes(index) ? prev.filter(item => item !== index) : [...prev, index];
            updateAntiflagInFormData(newSelected); // Update formData here
            return newSelected;
        });
    };

    const updateAntiflagInFormData = (newSelected) => {
        const antiflagSum = newSelected.reduce((sum, index) => sum + Math.pow(2, index), 0);
        setFormData(prevState => ({
            ...prevState,
            antiflag: antiflagSum.toString()
        }));
    };

    useEffect(() => {
        updateAntiflagInFormData(selectedAntiflags);
    }, [selectedAntiflags]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
      
        try{
            const response = await axios.post("/item/create", formData)
            console.log(response)
            // navigate("/status", {state: {message: response.data.code}})
        } catch (err){
            console.error('Fehler beim Senden der Daten:', err.response.data.detail);
            // navigate("/status", {state: {message: "REFRESH"}})
        }
    };


    return (
        <div className='flex flex-col justify-center items-center'>

            <form onSubmit={handleSubmit} className='bg-indigo-50 flex flex-col rounded-lg p-8 shadow-lg'>
                <div className='pb-2'>
                    <label className='pr-2'>Item Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className='pb-2'>
                    <label className='pr-2'>Link:</label>
                    <input type="text" name="link" value={formData.link} onChange={handleChange} required />
                </div>
                <div className='pb-2'>
                    <label className='pr-2'>Image (optional):</label>
                    <input type="text" name="imagelink" value={formData.imagelink} onChange={handleChange} />
                </div>
                <div className='pb-2'>
                    <button className='w-full bg-indigo-200 rounded-md shadow-md hover:bg-indigo-50' type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        Wer soll es <span className='text-red-500'>nicht</span> Tragen?: {formData.antiflag}
                    </button>
                    {isDropdownOpen && (
                        <ul style={{ listStyle: 'none', padding: 0 }} className='m-4'>
                            {antiflags.map((antiflag, index) => visibleIndices.includes(index) && (
                                <li key={index}>
                                    <input className='m-1'
                                        type="checkbox"
                                        id={`checkbox-${index}`}
                                        checked={selectedAntiflags.includes(index)}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <label htmlFor={`checkbox-${index}`}>{antiflag}</label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='pb-2'>
                    <label>ItemTyp:</label>
                    <ul className='ml-4'>
                        {itemType.map((item, index) => visibleItemtypeIndices.includes(index) && (
                            <li key={index}>
                                <input className='m-1'
                                    type="radio" // Ändern von Checkbox zu Radio
                                    name="type" // Alle Radiobuttons teilen denselben Namen, um Gruppenverhalten zu ermöglichen
                                    id={`radio-${index}`}
                                    value={index} // Wert entspricht dem Itemtyp
                                    checked={formData.type === index.toString()} // Überprüfen, ob dieser Radiobutton aktuell ausgewählt ist
                                    onChange={handleChange} // Update des Formularzustands bei Änderung
                                />
                                <label htmlFor={`radio-${index}`}>{item}</label>
                            </li>
                        ))}
                    </ul>
                </div>

                <button type="submit" className='bg-blue-100 px-8 py-1 rounded-md'>Submit</button>
            </form>
        </div>
    );
};

export default ItemForm;
