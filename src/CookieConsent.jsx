import React, { useState, useEffect } from "react";
// import { Button, Typography } from "@material-tailwind/react";

// import Cookies from "js-cookie";
// import { Domain } from "@mui/icons-material";

const CookieConsent = () => {
  const [consented, setConsented] = useState(false);

  const handleConsent = (consent) => {
    localStorage.setItem("cookieConsent", consent.toString());
    setConsented(consent);
  };

  return (
    <div className="bg-gray-500 fixed bottom-0 w-full px-10 py-2 hidden">
      {/* {consented && (
        <div className="flex w-full justify-between items-center">
          <Typography
            variant="h5"
            color="black"
            className="flex items-center justify-center"
          >
            This webseite uses cookies to enhance the user experience.
          </Typography>
          <div>
            <Button className="mr-3" onClick={() => handleConsent(false)}>
              I decline
            </Button>
            <Button color="blue" onClick={() => handleConsent(true)}>
              I understand
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CookieConsent;
