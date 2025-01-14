import Container from "../../Sharecomponent/Container";
import w3logo from "../../assets/w3logo.png";
import ciscoLogo from "../../assets/ciscoLogo.png";
import wordpressLogo from "../../assets/wordpressLogo.png";
import coursera from "../../assets/coursera-icon.png";
import udemyLogo from "../../assets/udemyLogo.png";
const Partners = () => {
  return (
    <div>
      <Container>
        <div className="my-8 md:my-24">
          <h1 className="text-center font-medium mb-8">
            Trusted by over 10,000 companies and million of learners around the
            world
          </h1>
          <div className="flex items-center flex-wrap gap-4">
            <img
              className="w-20 md:w-28 block mx-auto"
              src="https://pin.it/1XPUdwcPO"
            />
            <img className="w-20 md:w-28 block mx-auto" src={w3logo} />
            <img className="w-20 md:w-28 block mx-auto" src={ciscoLogo} />
            <img className="w-20 md:w-28 block mx-auto" src={wordpressLogo} />
            <img className="w-20 md:w-28 block mx-auto" src={coursera} />
            <img className="w-20 md:w-28 block mx-auto" src={udemyLogo} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Partners;
