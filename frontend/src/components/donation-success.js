import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const DonationSuccess = () => {
  const [params] = useSearchParams();
  const amount = params.get("amount");
  const user_id = params.get("user_id");

  useEffect(() => {
    if (amount && user_id) {
      fetch("http://localhost:8000/api/ledger/log/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          type: "credit",
          amount: parseFloat(amount),
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          console.log("Transaction successfully logged:", data)
        )
        .catch((err) =>
          console.error("Failed to log transaction:", err)
        );
    }
  }, [amount, user_id]);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Thank you for your donation!</h2>
      <p>Your transaction has been recorded.</p>
    </div>
  );
};

export default DonationSuccess;
