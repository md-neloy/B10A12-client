import { useParams } from "react-router-dom";

const EnrollClassDetailsPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Enroll Class Details Page</h2>
      <p>{id}</p>
    </div>
  );
};

export default EnrollClassDetailsPage;
