import Footer from "../ui/Footer";
import Header from "../ui/Header";
import HomePageCourses from "../ui/HomePageCourses";

function Home() {
  return (
    <div className="max-w-screen bg-slate-900 text-neutral-200 overflow-x-hidden font-b-mitra">
      <Header />
      <HomePageCourses />
      <Footer />
    </div>
  );
}

export default Home;
