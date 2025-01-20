import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Community from "./Community";
import Partners from "./Partners";
import Question from "./Question";
import RivewCard from "./RivewCard";
import Teacher from "./Teacher";
import TopEnroll from "./TopEnroll";
import Category from "./category";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>SmartLearning | Home</title>
      </Helmet>
      <Banner />
      <Partners />
      <TopEnroll />
      <RivewCard />
      <Community />
      <Teacher />
      <Question />
      <Category />
    </div>
  );
};

export default Home;
