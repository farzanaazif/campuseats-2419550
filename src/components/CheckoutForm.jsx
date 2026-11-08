// useState lets the component remember values between renders
import { useState } from "react";

// Options for the Mahallah dropdown
const MAHALLAHS = [
  "Asma", "Aminah", "Asiah", "Hafsah", "Halimah", "Maryam",
  "Ruqayyah", "Sumayyah", "Nusaibah", "Safiyyah",
  "Salahuddin", "Zubair", "Ali", "Uthman", "Bilal", "Siddiq",
];

// Plain function: takes the form values and returns one message per field.
// "" means "no error" for that field.
function validate({ name, mahallah, pickupTime }) {
  return {
    // trim() removes spaces at the start/end; name needs at least 3 characters
    name: name.trim().length >= 3 ? "" : "Enter your name (at least 3 characters).",

    // An empty string is "falsy", so nothing selected = error
    mahallah: mahallah ? "" : "Choose your mahallah.",

    // Time strings like "14:30" can be compared as text; must be 08:00 to 22:00
    pickupTime:
      pickupTime >= "08:00" && pickupTime <= "22:00"
        ? ""
        : "Pickup time must be between 08:00 and 22:00.",
  };
}

// onSubmitOrder = function from CartPage, called only when the form is valid
function CheckoutForm({ onSubmitOrder }) {
  // CONTROLLED inputs: each field's value lives in state
  const [name, setName] = useState("");
  const [mahallah, setMahallah] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  // Becomes true after the first click on "Place order",
  // so error messages do not show before the user tries to submit
  const [submitted, setSubmitted] = useState(false);

  // Recalculated on every render, so it always matches the current inputs
  const errors = validate({ name, mahallah, pickupTime });

  // The form is valid when every error message is an empty string
  const isValid = Object.values(errors).every((msg) => msg === "");

  function handleSubmit(event) {
    event.preventDefault();  // stop the browser from reloading the page
    setSubmitted(true);      // from now on, show error messages
    if (!isValid) return;    // stop here if any field has an error

    // Send the cleaned details up to CartPage
    onSubmitOrder({ name: name.trim(), mahallah, pickupTime });
  }

  return (
    // noValidate turns off the browser's own popups so OUR messages show
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>Checkout</h3>

      {/* htmlFor must match the input's id: clicking the label focuses the input */}
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}                            // shows what is in state
        onChange={(e) => setName(e.target.value)} // typing updates state
      />
      {/* Show the message only after submit AND only if there is an error */}
      {submitted && errors.name && <p className="field-error">{errors.name}</p>}

      <label htmlFor="mahallah">Mahallah</label>
      <select
        id="mahallah"
        value={mahallah}
        onChange={(e) => setMahallah(e.target.value)}
      >
        {/* Empty first option = nothing chosen yet */}
        <option value="">Select…</option>

        {/* Loop through the list and create one <option> per mahallah.
            key helps React track each item in the list. */}
        {MAHALLAHS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      {submitted && errors.mahallah && <p className="field-error">{errors.mahallah}</p>}

      <label htmlFor="pickup">Pickup time</label>
      <input
        id="pickup"
        type="time"                              // browser shows a time picker
        value={pickupTime}
        onChange={(e) => setPickupTime(e.target.value)}
      />
      {submitted && errors.pickupTime && <p className="field-error">{errors.pickupTime}</p>}

      {/* type="submit" triggers handleSubmit when clicked */}
      <button type="submit" className="btn">Place order</button>
    </form>
  );
}

// Lets other files do: import CheckoutForm from "../components/CheckoutForm"
export default CheckoutForm;