import { Link } from "react-router-dom";

function HomePageCourses() {
  const courses = [
    {
      id: 1,
      image: "images/812798_23813-NURJJK.jpg",
      title: "نقاشی چهره",
      to: "/courses/portrait",
    },
    {
      id: 2,
      image: "images/nature.jpg",
      title: "نقاشی طبیعت",
      to: "/courses/nature",
    },
    {
      id: 3,
      image: "images/4523044_2384322.jpg",
      title: "نقاشی از روی عکس",
      to: "/courses/pictures",
    },
    {
      id: 4,
      image: "images/halftone-monochrome-collage.jpg",
      title: "نقاشی به سبک سورئالیسم",
      to: "/courses/so-realism",
    },
    {
      id: 5,
      image: "images/vintage-style-soldier-helmet-still-life.jpg",
      title: "نقاشی به سبک رئالیسم",
      to: "/courses/realism",
    },
    {
      id: 6,
      image: "images/vintage-style-soldier-helmet-still-life.jpg",
      title: "نقاشی به سبک رئالیسم",
      to: "/courses/realism",
    },
  ];
  return (
    <>
      {courses.map((course) => (
        <Link
          key={course.id}
          to={course.to}
          className="flex flex-col gap-y-2 items-center w-full"
        >
          <div className="w-40 h-40">
            <img src={course.image} alt="" className="rounded-lg" />
          </div>
          <h1 className="text-sm text-nowrap w-40 text-right">
            {course.title}
          </h1>
        </Link>
      ))}
    </>
  );
}

export default HomePageCourses;
