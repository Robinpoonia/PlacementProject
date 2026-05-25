import { useState } from 'react';

export default function ExperienceForm() {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] =
    useState(null);

  const [formData, setFormData] =
    useState({
      company: '',
      roundType: 'OT',
      description: '',
      result: 'Qualified',
      nextRoundDetails: '',
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const user =
          JSON.parse(
            localStorage.getItem(
              'user'
            )
          );

        if (!user) {
          alert(
            'Login first'
          );

          return;
        }

        const response =
          await fetch(
            `${import.meta.env.VITE_API_URL}/api/experiences`,
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',

                Authorization:
                  `Bearer ${user.token}`,
              },

              body:
                JSON.stringify(
                  formData
                ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              'Failed'
          );
        }

        setPreview(data);

        alert(
          'Experience Submitted'
        );

        setFormData({
          company: '',
          roundType:
            'OT',
          description:
            '',
          result:
            'Qualified',
          nextRoundDetails:
            '',
        });

      } catch (err) {
        alert(
          err.message
        );

      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <div>

      <form
        onSubmit={
          handleSubmit
        }
        className="
          space-y-6
        "
      >

        {/* COMPANY */}

        <input
          type="text"
          name="company"

          value={
            formData.company
          }

          onChange={
            handleChange
          }

          required

          placeholder="Company"

          className="
          w-full
          rounded-xl
          bg-[#071022]
          p-5
          text-white
          outline-none
        "
        />

        {/* ROUND */}

        <select
          name="roundType"

          value={
            formData.roundType
          }

          onChange={
            handleChange
          }

          className="
          w-full
          rounded-xl
          bg-[#071022]
          p-5
          text-white
        "
        >

          <option>
            OT
          </option>

          <option>
            Technical
          </option>

          <option>
            HR
          </option>

        </select>

        {/* DESCRIPTION */}

        <textarea
          name="description"

          value={
            formData
              .description
          }

          onChange={
            handleChange
          }

          required

          rows={7}

          placeholder="
Share your experience
"

          className="
          w-full
          rounded-xl
          bg-[#071022]
          p-5
          text-white
          outline-none
        "
        />

        {/* RESULT */}

        <select
          name="result"

          value={
            formData.result
          }

          onChange={
            handleChange
          }

          className="
          w-full
          rounded-xl
          bg-[#071022]
          p-5
          text-white
        "
        >

          <option>
            Qualified
          </option>

          <option>
            Not Qualified
          </option>

        </select>

        {/* NEXT ROUND */}

        {formData.result ===
          'Qualified' && (

          <textarea
            name="nextRoundDetails"

            value={
              formData
                .nextRoundDetails
            }

            onChange={
              handleChange
            }

            rows={4}

            placeholder="
Next round details
"

            className="
            w-full
            rounded-xl
            bg-[#071022]
            p-5
            text-white
            outline-none
          "
          />

        )}

        {/* SUBMIT */}

        <button
          type="submit"

          disabled={
            loading
          }

          className="
          w-full
          rounded-xl
          bg-cyan-500
          py-5
          text-white
          text-lg
          font-bold
          hover:bg-cyan-600
        "
        >

          {loading
            ? 'Submitting...'
            : 'Submit'}

        </button>

      </form>

      {/* PREVIEW */}

      {preview && (

        <div
          className="
          mt-10
          rounded-2xl
          bg-[#101b31]
          p-8
          text-white
        "
        >

          <h2
            className="
            text-3xl
            mb-5
          "
          >

            Experience Preview

          </h2>

          <p>
            🏢
            {' '}
            {preview.company}
          </p>

          <p>
            🎯
            {' '}
            {preview.roundType}
          </p>

          <p>
            📝
            {' '}
            {preview.description}
          </p>

          <p>
            ✅
            {' '}
            {preview.result}
          </p>

          {preview.nextRoundDetails && (

            <p>

              ➡️
              {' '}
              {
                preview
                  .nextRoundDetails
              }

            </p>

          )}

        </div>

      )}

    </div>
  );
}