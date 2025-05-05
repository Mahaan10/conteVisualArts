import Header from "../ui/Header";

function Home() {
  return (
    <>
      <Header />
      <div className="md:w-[850px] md:h-[500px] w-[340px] h-[300px] mx-auto p-6 relative">
        {/* Header Background Image */}
        <div className="bg-[url('images/Art.jpg')] bg-center bg-no-repeat w-full h-full overflow-hidden rounded-lg bg-cover"></div>
        {/* Header ... */}
        <div className="text-white absolute top-1/4">
          <p className="text-3xl text-white font-bold">
            با آموزشگاه کٌنته، هنر رو تجربه کن
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
