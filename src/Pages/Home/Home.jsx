import Banner from "./Banner";
import Community from "./Community";
import Partners from "./Partners";
import Question from "./Question";
import RivewCard from "./RivewCard";
import Teacher from "./Teacher";
import TopEnroll from "./TopEnroll";

const Home = () => {
  return (
    <div>
      <Banner />
      <Partners />
      <TopEnroll />
      <RivewCard />
      <Community />
      <Teacher />
      <Question />
    </div>
  );
};

export default Home;
