import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import SectionHeader from "../../components/SectionHeader";
import useContexHooks from "../../useHooks/useContexHooks";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PreLoader from "../../components/PreLoader";

const Checkout = ({ ids }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, enrollPrice } = useContexHooks();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { handleSubmit, reset } = useForm();

  // Function to create payment intent (wrapped in a stable function)
  const createPaymentIntent = async (price) => {
    const res = await axiosSecure.post("/create-payment-intent", { price });
    return res.data;
  };

  // Mutation for creating the payment intent
  const mutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (data) => {
      setClientSecret(data.clientSecret); // Set clientSecret in state
    },
    onError: (error) => {
      toast.error(`Error creating payment intent: ${error.message}`, {
        position: "top-center",
      });
    },
  });

  // Create the clientSecret when the component mounts or enrollPrice changes
  useEffect(() => {
    if (enrollPrice && !clientSecret) {
      mutation.mutate(parseInt(enrollPrice));
    }
  }, [enrollPrice, clientSecret]);

  if (!enrollPrice) {
    return <PreLoader />;
  }

  const onSubmit = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // Ensure Stripe, Elements, and clientSecret are ready
    if (!stripe || !elements || !clientSecret) {
      setIsProcessing(false);
      toast.error("Payment initialization failed. Please try again.");
      return;
    }

    // Step 2: Get the card element
    const card = elements.getElement(CardElement);
    if (card === null) {
      setIsProcessing(false);
      toast.error("Card details are required.");
      return;
    }

    // Step 3: Create payment method
    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentError) {
      setError(paymentError.message);
      setIsProcessing(false);
      return;
    } else {
      console.log(paymentMethod);
      setError("");
    }

    // Step 4: Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setIsProcessing(false);
    } else {
      setTransactionId(paymentIntent.id);
      toast.success("Payment successful!");
      reset();
      const info = {
        name: user?.displayName,
        email: user?.email,
        transactionId: paymentIntent.id,
      };
      await axiosSecure.patch(`/classenroll-update/${ids}`, info);
      navigate("/dashboard/enrollclass");
    }

    setIsProcessing(false); // Reset processing state
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <SectionHeader title={"Checkout"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={user?.displayName}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#388E3C]"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#388E3C]"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            value={"$" + enrollPrice}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#388E3C]"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="card"
            className="block text-sm font-medium text-gray-700"
          >
            Card Information
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-[#388E3C] text-white py-3 rounded-lg text-lg font-medium transition-all disabled:opacity-50"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-700">Your Transaction ID: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default Checkout;

Checkout.propTypes = {
  ids: PropTypes.string.isRequired,
};
