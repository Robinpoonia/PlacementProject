import { useState } from 'react';

export default function SignInModal({
  isOpen,
  onClose
}) {

  const [mode, setMode] =
    useState('login');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const [formData, setFormData] =
    useState({

      name: '',

      scholarNo: '',

      email: '',

      password: ''

    });

  if (!isOpen)
    return null;

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  const submit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError('');

        const endpoint =

          mode === 'login'

            ? '/api/auth/login'

            : '/api/auth/register';

        const res =
          await fetch(

            `${import.meta.env.VITE_API_URL}${endpoint}`,

            {

              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body:
                JSON.stringify(
                  formData
                )

            }

          );

        const data =
          await res.json();

        if (!res.ok) {

          throw new Error(
            data.message
          );

        }

        localStorage.setItem(
          'user',
          JSON.stringify(data)
        );

        window.location = '/';

      }

      catch (err) {

        setError(
          err.message
        );

      }

      finally {

        setLoading(
          false
        );

      }

    };

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/60
      z-50
      flex
      justify-center
      items-center
    "
    >

      <div
        className="
        relative
        w-[420px]
        bg-[#121a2d]
        rounded-2xl
        p-8
      "
      >

        <button

          type="button"

          onClick={onClose}

          className="
          absolute
          top-5
          right-5
          text-white
          text-3xl
        "

        >

          ×

        </button>


        <h1
          className="
          text-white
          text-4xl
          mb-8
        "
        >

          {
            mode === 'login'

              ? 'Login'

              : 'Register'
          }

        </h1>


        {

          error

          &&

          <p
            className="
            text-red-400
            mb-4
          "
          >

            {error}

          </p>

        }


        <form

          onSubmit={submit}

          className="
          space-y-5
        "

        >

          {

            mode === 'register'

            &&

            <input

              name="name"

              placeholder="Name"

              value={
                formData.name
              }

              onChange={
                handleChange
              }

              className="
              w-full
              p-4
              rounded-xl
              bg-[#071022]
              text-white
            "

            />

          }


          {

            mode === 'register'

            &&

            <input

              name="scholarNo"

              placeholder="Scholar Number"

              value={
                formData.scholarNo
              }

              onChange={
                handleChange
              }

              className="
              w-full
              p-4
              rounded-xl
              bg-[#071022]
              text-white
            "

            />

          }


          <input

            name="email"

            type="email"

            placeholder="Email"

            value={
              formData.email
            }

            onChange={
              handleChange
            }

            className="
            w-full
            p-4
            rounded-xl
            bg-[#071022]
            text-white
          "

          />


          <input

            name="password"

            type="password"

            placeholder="Password"

            value={
              formData.password
            }

            onChange={
              handleChange
            }

            className="
            w-full
            p-4
            rounded-xl
            bg-[#071022]
            text-white
          "

          />


          {

            mode === 'register'

            &&

            <p
              className="
              text-cyan-400
              text-sm
            "
            >

              Role will be assigned automatically

            </p>

          }


          <button

            type="submit"

            className="
            w-full
            bg-cyan-500
            py-4
            rounded-xl
            text-white
          "

          >

            {

              loading

                ? 'Loading...'

                :

                mode === 'login'

                  ? 'Login'

                  : 'Register'

            }

          </button>

        </form>


        <p
          className="
          mt-6
          text-center
          text-gray-400
        "
        >

          {

            mode === 'login'

              ? "Don't have account?"

              : 'Already have account?'

          }

          <button

            type="button"

            onClick={() =>
              setMode(

                mode === 'login'

                  ? 'register'

                  : 'login'

              )
            }

            className="
            ml-2
            text-cyan-400
          "

          >

            {

              mode === 'login'

                ? 'Sign Up'

                : 'Sign In'

            }

          </button>

        </p>

      </div>

    </div>

  );

}