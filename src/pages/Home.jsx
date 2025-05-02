import Footer from "../ui/Footer";
import Header from "../ui/Header";
import HomePageCourses from "../ui/HomePageCourses";

function Home() {
  return (
    <div className="max-w-screen bg-sand/50 text-black dark:bg-dark-purple dark:text-neutral-200 overflow-x-hidden font-b-mitra">
      <Header />
      <HomePageCourses />
      <Footer />
    </div>
  );
}

export default Home;
