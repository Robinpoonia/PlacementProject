import {
  useEffect,
  useState
} from 'react';

import ResumeCard
from '../components/resumes/ResumeCard';

export default function Resumes() {

  const [
    data,
    setData
  ] =
  useState([]);

  useEffect(() => {

    fetchResumes();

  }, []);

  const fetchResumes =
  async () => {

    try {

      const res =
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/resume/resumes`
      );

      const json =
      await res.json();

      setData(json);

    }

    catch (err) {

      console.log(err);

    }

  };

  return (

    <div
      className="
        min-h-screen
        pt-28
        px-6
      "
    >

      <div
        className="
          max-w-6xl
          mx-auto
        "
      >

        <h1
          className="
            text-6xl
            font-bold
            text-white
            mb-10
          "
        >

          Senior Resumes

        </h1>


        <div
          className="
            grid
            md:grid-cols-3
            gap-6
          "
        >

          {

            data.length > 0

            ?

            data.map((item) => (

              <ResumeCard

                key={item._id}

                item={item}

              />

            ))

            :

            <div
              className="
                text-gray-400
                text-xl
              "
            >

              No resumes uploaded

            </div>

          }

        </div>

      </div>

    </div>

  );

}