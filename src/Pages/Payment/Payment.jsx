import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import Container from "../../Sharecomponent/Container";
import { useParams } from "react-router-dom";
// TODO;
const stiprePromise = loadStripe(import.meta.env.VITE_stripe_publishabel_key);
const Payment = () => {
  const { price } = useParams();
  return (
    <div>
      <Container>
        <div>
          <div className="bg-[#E9ECEF] shadow-lg p-4">
            <Elements stripe={stiprePromise}>
              <Checkout price={price} />
            </Elements>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
