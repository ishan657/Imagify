import Description from "../components/Description";
import Finalbutton from "../components/Finalbutton";
import Header from "../components/Header";
import Reviews from "../components/Reviews";
import Steps from "../components/Steps";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Reviews />
      <Finalbutton />
    </div>
  );
};

export default Home;
