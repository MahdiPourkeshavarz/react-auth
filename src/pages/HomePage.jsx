import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function HomePage() {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token || token === undefined) {
      navigate("/auth");
    }
  }, [token]);

  return (
    <>
      <div>
        <ul>
          <li>backend</li>
          <li>front-end</li>
        </ul>
        <div>
          {/* {courses.map((course) => (
            <CourseCard key={crypto.randomUUID()} course={course} />
          ))} */}
        </div>
      </div>
    </>
  );
}
