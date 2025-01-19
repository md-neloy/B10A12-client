import { FaChalkboardTeacher } from "react-icons/fa";
import Lottie from "lottie-react";
import teacherLottie from "./LottieFiles/teacher.json";
import teacherPic from "../../assets/teacherpic.jpg";
import Container from "../../Sharecomponent/Container";
import SectionHeader from "../../components/SectionHeader";
import Button from "../../Sharecomponent/Button";

const Teacher = () => {
  return (
    <section className=" bg-gray-100">
      <Container>
        <div>
          <SectionHeader title={"Join As Teacher"} />
          <div className="flex flex-col lg:flex-row items-center gap-8 md:h-[600px]">
            <div className="w-full md:w-1/2">
              <Lottie
                animationData={teacherLottie}
                loop={true}
                className="w-full "
              />
            </div>
            <div className="w-full md:w-1/2 md:p-10">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center md:text-start">
                Meet Our Amazing Teachers
              </h2>
              <div className="card card-compact bg-base-100 w-full md:w-96 shadow-xl ">
                <figure>
                  <img src={teacherPic} alt="teacher" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">Jon Smith</h3>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="flex">
                    <Button
                      text="Became a Teacher"
                      width="100%"
                      link="/techon"
                      logo={<FaChalkboardTeacher />}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teacherData.map((teacher, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4"
                >
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {teacher.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {teacher.experience} - {teacher.category}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Teacher;
