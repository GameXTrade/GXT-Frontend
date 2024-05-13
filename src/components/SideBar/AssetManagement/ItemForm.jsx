import React, { useState  } from 'react';
import axios from "../../../api/axios";

import { Input } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";



const ItemForm = ({ updateUploadStatus }) => {
    const [selectedAntiflags, setSelectedAntiflags] = useState([]);
    const [selectedWearables, setSelectedWearables] = useState([]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpenWearable, setIsDropdownOpenWearable] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        antiflag: 0,
        link: '',
        type: '',
        imagelink: '',
        wearable: 0,
        price: ''
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
    const wearables = [
        "Armor", "Helm", "Shoes", "Bracelet", "Weapon",
        "Necklace", "Earrings", "UNIQUE", "Shield", "Arrow",
        "Hair", "Ability", "Talisman", "Glove"
    ]
    const visibleIndices = [0, 1, 2, 3, 4, 5, 18];
    const visibleItemtypeIndices = [ 1, 2, 3 ];
    const visibleWearables = [0, 4, 10]

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(name, value)
    };
    

    const handleCheckboxChange = (index) => {
        setSelectedAntiflags((prev) => {
            const newSelected = prev.includes(index)
                ? prev.filter((item) => item !== index)
                : [...prev, index];
            updateAntiflagInFormData(newSelected);
            return newSelected;
        });
    };

    const handleCheckboxChangeWearables = (index) => {
        setSelectedWearables((prev) => {
            const newSelected = prev.includes(index)
                ? prev.filter((item) => item !== index)
                : [...prev, index];
            updateWearableInFormData(newSelected);
            return newSelected;
        });
    };

    const updateAntiflagInFormData = (newSelected) => {
        const antiflagSum = newSelected.reduce((sum, index) => sum + Math.pow(2, index), 0);
        setFormData(prevState => ({
            ...prevState,
            antiflag: antiflagSum
        }));
    };
    const updateWearableInFormData = (newSelected) => {
        const wearableSum = newSelected.reduce((sum, index) => sum + Math.pow(2, index), 0);
        setFormData(prevState => ({
            ...prevState,
            wearable: wearableSum
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log('Form data submitted:', formData);
      
        try{
            const response = await axios.post("/item/create", formData)
            updateUploadStatus(response.statusText)
            console.log(response.statusText)
            // navigate("/status", {state: {message: response.data.code}})
        } catch (err){
            console.error('Fehler beim Senden der Daten:', err.response.data.detail);
            // navigate("/status", {state: {message: "REFRESH"}})
        }
    };


    return (
        <div className='flex flex-col justify-center items-center bg-white w-full h-full'>

            <form onSubmit={handleSubmit} className='flex flex-col rounded-lg p-8 shadow-xl'>
                    
                <div className="w-72 pb-2">
                    <Input label="Item Name" name="name" value={formData.name} onChange={(e) => handleChange(e.target.name, e.target.value)} required/>
                </div>
                <div className="w-72 pb-2">
                    <Input label="Downloadlink" name="link" value={formData.link} onChange={(e) => handleChange(e.target.name, e.target.value)}/>
                </div>

                <div className='w-72 pb-2'>
                    <Input label="Imagelink" name="imagelink" value={formData.imagelink} onChange={(e) => handleChange(e.target.name, e.target.value)}/>
                </div>
                <div className='pb-2'>
                    <button className='w-full bg-indigo-200 rounded-md shadow-md hover:bg-indigo-50' type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        Wer soll es <span className='text-red-500'>nicht</span> Tragen?: {formData.antiflag}
                    </button>
                    {isDropdownOpen && (
                        <ul style={{ listStyle: 'none', padding: 0 }} className='m-4'>
                            
                            {visibleIndices.map((index) => (
                                <li key={index}>
                                    <input className='m-1'
                                        type="checkbox"
                                        id={`checkbox-${index}`}
                                        checked={selectedAntiflags.includes(index)}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <label htmlFor={`checkbox-${index}`}>{antiflags[index]}</label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='w-72 pb-2'>
                    <Select
                        label="ItemTyp"
                        name='type'
                        value={formData.type}
                        onChange={(val) => handleChange('type', val)}
                        >
                        {visibleItemtypeIndices.map(index => (
                            <Option key={index} value={(index).toString()}>
                                {itemType[index]}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className='pb-2'>
                    <button className='w-full bg-indigo-200 rounded-md shadow-md hover:bg-indigo-50' type="button" onClick={() => setIsDropdownOpenWearable(!isDropdownOpenWearable)}>
                        Was ist das für ein Item?: {formData.wearable}
                    </button>
                    {isDropdownOpenWearable && (
                        <ul style={{ listStyle: 'none', padding: 0 }} className='m-4'>
                            
                            {visibleWearables.map((index) => (
                                <li key={index}>
                                    <input className='m-1'
                                        type="checkbox"
                                        id={`checkbox2-${index}`}
                                        checked={selectedWearables.includes(index)}
                                        onChange={() => handleCheckboxChangeWearables(index)}
                                    />
                                    <label htmlFor={`checkbox2-${index}`}>{wearables[index]}</label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='w-72 pb-2'>
                    <Input label="Preis" name="price" value={formData.price} onChange={(e) => handleChange(e.target.name, e.target.value)} required/>
                </div>
                <button type="submit" className='bg-blue-100 px-8 py-1 rounded-md hover:bg-blue-gray-50'>Submit</button>
            </form>
        </div>
    );
};

export default ItemForm;
