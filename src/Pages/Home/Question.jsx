import SectionHeader from "../../components/SectionHeader";
import Container from "../../Sharecomponent/Container";

const Question = () => {
  return (
    <div className="py-10">
      <Container>
        <div>
          <SectionHeader title={"Frequently Asked Quction"}></SectionHeader>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What is an online course classroom?
            </div>
            <div className="collapse-content">
              <p>
                An online course classroom is a virtual environment where
                students can access course materials, interact with instructors,
                participate in discussions, and complete assignments remotely.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              How do I enroll in a course?
            </div>
            <div className="collapse-content">
              <p>
                You can enroll in a course by visiting our Courses section,
                selecting the desired course, and following the enrollment
                instructions. Payment options are available at checkout.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              What materials are provided in the course?
            </div>
            <div className="collapse-content">
              <p>
                Course materials typically include video lectures, reading
                materials, assignments, quizzes, and projects. Some courses may
                also offer live sessions and interactive content.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Question;
