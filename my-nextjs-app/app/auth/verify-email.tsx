
export default function VerifyEmail() {
    const handleResendVerification = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/verification/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Verification email sent.");
      } else {
        alert("Failed to resend email.");
      }
    };
  
    return (
      <div>
        <h1>Verify Your Email Address</h1>
        <p>Before proceeding, please check your email for a verification link.</p>
        <p>If you did not receive the email, you can request another below.</p>
        <button onClick={handleResendVerification}>Resend Verification Email</button>
      </div>
    );
  }
  