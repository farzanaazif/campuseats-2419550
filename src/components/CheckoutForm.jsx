import { useState } from "react";

// Options for the dropdown. Edit to match your campus.
const MAHALLAHS = [
  "Mahallah Asma",
  "Mahallah Aminah",
  "Mahallah Hafsa",
  "Mahallah Ruqayyah",
  "Mahallah Zubair",
  "Mahallah Ali",
  "Mahallah Uthman",
];

// A plain function: takes the form values, returns one message per field.
// "" means "no error" for that field.
function validate({ name, mahallah, pickupTime }) {
  return {
    name: name.trim().length >= 3 ? "" : "Enter your name (at least 3 characters).",
    mahallah: mahallah ? "" : "Choose your mahallah.",
    pickupTime: pickupTime ? "" : "Choose a pickup time.",
  };
}

function CheckoutForm({ onSubmitOrder }) {
  // CONTROLLED inputs: each value lives in state.
  const [name, setName] = useState("");
  const [mahallah, setMahallah] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  // Recalculated on every render, so messages update as the user types.
  const errors = validate({ name, mahallah, pickupTime });
  // Object.values gives the 3 messages; every() checks that all of them are "".
  const isValid = Object.values(errors).every((msg) => msg === "");

  function handleSubmit(event) {
    event.preventDefault();  // stop the browser from reloading the page
    if (!isValid) return;    // do nothing while any error exists
    onSubmitOrder({ name: name.trim(), mahallah, pickupTime }); // send details to App
  }

  return (
    // noValidate turns off the browser's own popups so OUR messages show
    <form className="card checkout" onSubmit={handleSubmit} noValidate>
      <h3>Checkout</h3>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}                              // value comes from state
        onChange={(e) => setName(e.target.value)} // typing updates state
      />
      {errors.name && <p className="field-error">{errors.name}</p>}

      <label htmlFor="mahallah">Mahallah</label>
      <select
        id="mahallah"
        value={mahallah}
        onChange={(e) => setMahallah(e.target.value)}
      >
        <option value="">Select…</option>
        {MAHALLAHS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      {errors.mahallah && <p className="field-error">{errors.mahallah}</p>}

      <label htmlFor="pickup">Pickup time</label>
      <input
        id="pickup"
        type="time"
        value={pickupTime}
        onChange={(e) => setPickupTime(e.target.value)}
      />
      {errors.pickupTime && <p className="field-error">{errors.pickupTime}</p>}

      <button type="submit" className="btn btn-full">Place order</button>
    </form>
  );
}

export default CheckoutForm;