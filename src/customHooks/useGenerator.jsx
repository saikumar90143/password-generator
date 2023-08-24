import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  console.log("password: ", password);
  const [error, setError] = useState("");
  console.log("error: ", error);

  const GeneratePassword = (checkboxData, range) => {
    let char = "",
      generatedPassword = "";

    const selectedIncluders = checkboxData.filter((checked) => checked.state);
    if (selectedIncluders.length < 1) {
      setError("*please select atlest one checkbox");
      return;
    }

    selectedIncluders.forEach((option) => {
      switch (option.title) {
        case "include upper case letters":
          char += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

          break;
        case "include Lower case letters":
          char += "abcdefghijklmnopqrstuvwsyz";

          break;
        case "include numbers":
          char += "0123456789";

          break;
        case "include special charcters":
          char += "@_!&?*%$#";

          break;

        default:
          break;
      }
    });

    for (let i = 0; i <= range; i++) {
      const randomIndex = Math.floor(Math.random() * char.length);
      generatedPassword += char[randomIndex];
    }
    setPassword(generatedPassword);
    setError("");
  };

  return { password, error, GeneratePassword };
};

export default usePasswordGenerator;
