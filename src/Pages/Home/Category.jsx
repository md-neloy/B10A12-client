import {
  FaCode,
  FaPaintBrush,
  FaMobileAlt,
  FaGamepad,
  FaShieldAlt,
  FaRobot,
  FaChartLine,
  FaEllipsisH,
} from "react-icons/fa";
import Container from "../../Sharecomponent/Container";
import Marquee from "react-fast-marquee";

const categories = [
  { icon: <FaCode />, name: "Web Development" },
  { icon: <FaPaintBrush />, name: "Graphics Design" },
  { icon: <FaMobileAlt />, name: "App Development" },
  { icon: <FaGamepad />, name: "Game Development" },
  { icon: <FaShieldAlt />, name: "Cyber Security" },
  { icon: <FaRobot />, name: "Artificial Intelligence" },
  { icon: <FaChartLine />, name: "Digital Marketing" },
  { icon: <FaEllipsisH />, name: "Coming Soon" },
];

const Category = () => {
  return (
    <section className="bg-gray-50 py-10">
      <Container>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Explore Categories
          </h2>
          <div className="w-full">
            <Marquee>
              <div className="grid grid-cols-4 gap-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-6 bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-4xl text-[#212529] mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {category.name}
                    </h3>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Category;

{
  /* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {categories.map((category, index) => (
    <div
      key={index}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="text-4xl text-[#212529] mb-4">
        {category.icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-700">
        {category.name}
      </h3>
    </div>
  ))}
</div> */
}
