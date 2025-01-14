import Container from "../../Sharecomponent/Container";
import geeks from "../../assets/geeks.png";
import w3logo from "../../assets/w3logo.png";
import ciscoLogo from "../../assets/ciscoLogo.png";
import wordpressLogo from "../../assets/wordpressLogo.png";
import coursera from "../../assets/coursera-icon.png";
import udemyLogo from "../../assets/udemyLogo.png";
import SectionHeader from "../../components/SectionHeader";
const Partners = () => {
  return (
    <div>
      <Container>
        <div className="my-8 md:my-24">
          <SectionHeader title={"Trusted Companies"} />
          <div className="flex items-center flex-wrap gap-4">
            <img
              className="w-20 md:w-28 block mx-auto"
              src={geeks}
              alt="geeks"
            />
            <img
              className="w-20 md:w-28 block mx-auto"
              src={w3logo}
              alt="w3school"
            />
            <img
              className="w-20 md:w-28 block mx-auto"
              src={ciscoLogo}
              alt="cisco"
            />
            <img
              className="w-20 md:w-28 block mx-auto"
              src={wordpressLogo}
              alt="wordpress"
            />
            <img
              className="w-20 md:w-28 block mx-auto"
              src={coursera}
              alt="coursera"
            />
            <img
              className="w-20 md:w-28 block mx-auto"
              src={udemyLogo}
              alt="udemy"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Partners;
