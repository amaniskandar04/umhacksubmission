import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DonationSuccess = () => {
  const [params] = useSearchParams();
  const amount = params.get("amount");
  const user_id = params.get("user_id");

  useEffect(() => {
    toast.success("🎉 Congrats, you just started your streak!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

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
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px"
    }}>
      <h2>Thank you for your donation!</h2>
      <p>Your transaction has been recorded.</p>
      <ToastContainer />
    </div>
  );
};

export default DonationSuccess;

