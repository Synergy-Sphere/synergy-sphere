import { useState } from "react";

import { Autocomplete, TextField, Box, Container } from "@mui/material";

const countries = [
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
];

const cities = {
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  CA: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  DE: [
    "Berlin",
    "Hamburg",
    "Munich",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Düsseldorf",
    "Dortmund",
    "Essen",
    "Leipzig",
    "Bremen",
    "Dresden",
    "Hanover",
    "Nuremberg",
    "Duisburg",
    "Bochum",
    "Wuppertal",
    "Bielefeld",
    "Bonn",
    "Münster",
    "Karlsruhe",
    "Mannheim",
    "Augsburg",
    "Wiesbaden",
    "Gelsenkirchen",
    "Mönchengladbach",
    "Braunschweig",
    "Chemnitz",
    "Kiel",
    "Aachen",
    "Halle (Saale)",
    "Magdeburg",
    "Freiburg im Breisgau",
    "Krefeld",
    "Lübeck",
    "Oberhausen",
    "Erfurt",
    "Mainz",
    "Rostock",
    "Kassel",
    "Hagen",
    "Hamm",
    "Saarbrücken",
    "Mülheim an der Ruhr",
    "Potsdam",
    "Ludwigshafen am Rhein",
    "Oldenburg",
    "Leverkusen",
    "Osnabrück",
  ],
};

function SetLocation({ userLocation, types, updateUser, dispatch, idParams }) {
  async function handleSetLocation() {
    try {
      const settings = {
        method: "PATCH",
        body: JSON.stringify({ location: userLocation }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `http://localhost:5555/createProfile/${idParams}/location`,
        settings
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();

      await updateUser(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div>
        <p className=" text-2xl font-bold">{userLocation}</p>
      </div>
      <Container>
        <Box component="form" sx={{ mt: 1 }}>
          {/* <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.label}
            value={selectedCountry}
            onChange={(event, newValue) => {
              setSelectedCountry(newValue);
              setSelectedCity(null); // Reset city when country changes
            }}
            renderInput={(params) => (
                <TextField {...params} label="Country" variant="outlined" />
                )}
                sx={{ mb: 2 }}
          /> */}

          {/* {selectedCountry && ()} */}
          <Autocomplete
            //   options={cities[selectedCountry.code] || []}
            options={cities["DE"] || []}
            getOptionLabel={(option) => option}
            value={userLocation}
            onChange={(event, newValue) => {
              dispatch({ type: types, payload: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} label="City" variant="outlined" />
            )}
          />
        </Box>
      </Container>
      <button onClick={handleSetLocation} className="btn m-3">
        Add your location
      </button>
    </>
  );
}

export default SetLocation;
