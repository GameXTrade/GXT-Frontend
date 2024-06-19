import React, { useState } from "react";
import axios from "../../../api/axios";

import {
  Select,
  Option,
  Input,
  Radio,
  Button,
  Checkbox,
} from "@material-tailwind/react";

const ItemForm = ({ updateUploadStatus }) => {
  const [selectedAntiflags, setSelectedAntiflags] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenSubType, setIsDropdownOpenSubType] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    subtype: 0,
    antiflag: 0,
    imagelink: "",
    link: "",
    price: "",
  });
  const itemType = [
    "Nichts",
    "Waffe",
    "Rüstung",
    "Items zum benutzen",
    "Verbrauchsgegenstand",
    "Mineral",
    "Spezialitem",
    "Tool",
    "Lottery",
    "Geld/Yang",
    "Geiststein",
    "Beutel",
    "Fisch",
    "Angel",
    "Resourcen",
    "Lagerfeuer",
    "Map", // 16
    "Mob", // 17
  ];
  const itemSubTypes = {
    1: [
      "Einhand",
      "Dolch",
      "Bogen",
      "Zweihänder",
      "Glocke",
      "Fächer",
      "Pfeile",
      "Lanze",
      "Waffenskin",
      "Waffenset",
    ],
    2: [
      "Rüstung",
      "Helme",
      "Schild",
      "Armband",
      "Schuhe",
      "Halskette",
      "Ohrringe",
      "Kostüm-Haare",
      "Kostüm-Rüstung",
      "Kostüm-Sash",
      "Kostüm-Flügel",
      "Ganzkörperskin",
    ],
    3: ["Tränke und Fische", "(Teleport) Schriftrolle", "Uppitems"],
    16: ["Normal Maps", "Dungeons"],
    17: [
      "Boss",
      "Monsters",
      "Stones",
      "Pets",
      "Mounts",
      "NPC's",
      "Monster-Set",
    ],
  };
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
    "ITEM_ANTIFLAG_MAIL",
  ];

  const visibleIndices = [0, 1, 2, 3, 4, 5, 18];
  const visibleItemtypeIndices = [1, 2, 3, 16, 17];

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const updateAntiflagInFormData = (newSelected) => {
    const antiflagSum = newSelected.reduce(
      (sum, index) => sum + Math.pow(2, index),
      0
    );
    setFormData((prevState) => ({
      ...prevState,
      antiflag: antiflagSum,
    }));
  };

  const handleRadioChange = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subtype: index,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form data submitted:", formData);

    try {
      const response = await axios.post("/item/create", formData);
      console.log(response.statusText);
      updateUploadStatus(response.statusText);
      // navigate("/status", {state: {message: response.data.code}})
    } catch (err) {
      console.error("Fehler beim Senden der Daten:", err.response);
      // navigate("/status", {state: {message: "REFRESH"}})
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white w-full h-full">
      <form onSubmit={handleSubmit} className="flex flex-col rounded-lg ">
        <div className="w-72 pb-2">
          <Input
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="w-72 pb-2">
          <Input
            label="Downloadlink"
            name="link"
            value={formData.link}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>

        <div className="w-72 pb-2">
          <Input
            label="Imagelink"
            name="imagelink"
            value={formData.imagelink}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="w-72 pb-2 select-none">
          <Select
            label="ItemTyp"
            name="type"
            value={formData.type}
            onChange={(val) => handleChange("type", val)}
          >
            {visibleItemtypeIndices.map((index) => (
              <Option key={index} value={index.toString()}>
                {itemType[index]}
              </Option>
            ))}
          </Select>
        </div>

        <div className="pb-2">
          <button
            className={`w-full rounded-md shadow-md p-2 ${
              formData.type === ""
                ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                : "bg-gray-300 hover:bg-indigo-50"
            }`}
            type="button"
            onClick={() => setIsDropdownOpenSubType(!isDropdownOpenSubType)}
            disabled={formData.type === ""}
          >
            Was ist das für ein Item?: {formData.subtype}
          </button>
          {isDropdownOpenSubType && (
            <ul
              style={{ listStyle: "none", padding: 0 }}
              className="m-2 h-[10rem] overflow-y-auto bg-white"
            >
              {itemSubTypes[formData.type].map((subtype, index) => (
                <li key={index}>
                  <Radio
                    name="type"
                    id={index}
                    label={`${subtype}`}
                    checked={formData.subtype === index}
                    onChange={() => handleRadioChange(index)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="pb-2">
          <button
            className={`w-full rounded-md shadow-md p-2 ${
              formData.type === ""
                ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                : "bg-gray-300 hover:bg-indigo-50"
            }`}
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={formData.type === ""}
          >
            Wer soll es <span className="text-red-500">nicht</span> Tragen?:{" "}
            {formData.antiflag}
          </button>
          {isDropdownOpen && (
            <ul
              style={{ listStyle: "none", padding: 0 }}
              className="m-2 h-[10rem] overflow-y-auto bg-white"
            >
              {visibleIndices.map((index) => (
                <li key={index}>
                  <Checkbox
                    id={`checkbox-${index}`}
                    label={antiflags[index]}
                    checked={selectedAntiflags.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-72 pb-2">
          <Input
            label="Preis"
            name="price"
            value={formData.price}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>
        {/* <button
          type="submit"
          className="bg-blue-100 px-8 py-1 rounded-md hover:bg-blue-gray-50"
        >
          Submit
        </button> */}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ItemForm;
