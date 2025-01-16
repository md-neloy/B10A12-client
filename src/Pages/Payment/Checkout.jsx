import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import SectionHeader from "../../components/SectionHeader";
import useContexHooks from "../../useHooks/useContexHooks";
import { toast } from "react-toastify";
import { useState } from "react";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";

const Checkout = ({ price }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [Error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useContexHooks();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const { handleSubmit, reset } = useForm();

  const createPost = async (newPost) => {
    const res = await axiosSecure.post("/create-payment-intent", newPost);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
    },
    onError: (error) => {
      toast.error(`Error creating payment intent: ${error.message}`, {
        position: "top-center",
      });
    },
  });

  const onSubmit = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // Step 1: Create payment intent if clientSecret is not already set
    if (!clientSecret) {
      await mutation.mutateAsync({ price: parseInt(price) });
    }

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
            name: user.displayName,
            email: user.email,
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
      setIsProcessing(false);
    }
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
            value={"$" + price}
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
        <p className="text-red-600">{Error}</p>
        {transactionId && (
          <p className="text-green-700">Your Transaction ID: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default Checkout;

Checkout.propTypes = {
  price: PropTypes.string.isRequired,
};
