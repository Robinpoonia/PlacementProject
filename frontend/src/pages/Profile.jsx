import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchMyProfile,
  updateMyProfileAction,
  uploadProfilePictureAction,
} from "../store/slices/userSlice";

import Loading from "../components/Layout/Loading";


export default function Profile() {
  const dispatch = useDispatch();

  const {
    profile,
    loading,
    updateLoading,
    photoLoading,
    error,
  } = useSelector(
    (state) => state.user
  );


  // ==========================================
  // EDIT MODE
  // ==========================================

  const [editing, setEditing] =
    useState(false);


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] =
    useState({
      phone: "",
      batch: "",
      selectedCompany: "",
      package: "",
    });


  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);


  // ==========================================
  // PUT PROFILE DATA INTO FORM
  // ==========================================

  useEffect(() => {
    if (!profile) return;

    setFormData({
      phone:
        profile.phone || "",

      batch:
        profile.batch || "",

      selectedCompany:
        profile.selectedCompany || "",

      package:
        profile.package ?? "",
    });
  }, [profile]);


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };


  // ==========================================
  // UPLOAD PROFILE PICTURE
  // ==========================================

  const handlePhotoChange = async (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;


    // ========================================
    // CHECK FILE TYPE
    // ========================================

    if (
      !file.type.startsWith("image/")
    ) {
      alert(
        "Please select an image file."
      );

      e.target.value = "";

      return;
    }


    // ========================================
    // CHECK FILE SIZE - 5MB
    // ========================================

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        "Image must be smaller than 5 MB."
      );

      e.target.value = "";

      return;
    }


    try {
      // ======================================
      // UPLOAD
      // ======================================

      const updatedUser =
        await dispatch(
          uploadProfilePictureAction(
            file
          )
        ).unwrap();


      // ======================================
      // UPDATE LOCAL STORAGE
      // ======================================

      const storedData =
        JSON.parse(
          localStorage.getItem(
            "user"
          ) || "{}"
        );


      // Supports both:
      //
      // { name, role, ... }
      //
      // OR
      //
      // { user: { name, role } }

      if (storedData?.user) {
        const newStoredData = {
          ...storedData,

          user: {
            ...storedData.user,
            ...updatedUser,
          },
        };

        localStorage.setItem(
          "user",
          JSON.stringify(
            newStoredData
          )
        );
      } else {
        const newStoredData = {
          ...storedData,
          ...updatedUser,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(
            newStoredData
          )
        );
      }


      alert(
        "Profile picture updated successfully!"
      );

    } catch (err) {
      console.error(
        "Photo upload error:",
        err
      );

      alert(
        typeof err === "string"
          ? err
          : "Failed to upload profile picture"
      );

    } finally {
      // Allows selecting same image again

      e.target.value = "";
    }
  };


  // ==========================================
  // SAVE PROFILE DETAILS
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result =
        await dispatch(
          updateMyProfileAction({
            phone:
              formData.phone,

            batch:
              formData.batch,

            selectedCompany:
              formData.selectedCompany,

            package:
              formData.package,
          })
        );


      if (
        updateMyProfileAction.fulfilled.match(
          result
        )
      ) {
        const updatedUser =
          result.payload;


        // ====================================
        // UPDATE LOCAL STORAGE
        // ====================================

        const storedData =
          JSON.parse(
            localStorage.getItem(
              "user"
            ) || "{}"
          );


        if (storedData?.user) {
          localStorage.setItem(
            "user",

            JSON.stringify({
              ...storedData,

              user: {
                ...storedData.user,
                ...updatedUser,
              },
            })
          );
        } else {
          localStorage.setItem(
            "user",

            JSON.stringify({
              ...storedData,
              ...updatedUser,
            })
          );
        }


        setEditing(false);
      }

    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );
    }
  };


  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const handleCancel = () => {
    if (profile) {
      setFormData({
        phone:
          profile.phone || "",

        batch:
          profile.batch || "",

        selectedCompany:
          profile.selectedCompany || "",

        package:
          profile.package ?? "",
      });
    }

    setEditing(false);
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Loading
        text="Loading Profile..."
        fullScreen
      />
    );
  }


  // ==========================================
  // PROFILE NOT FOUND
  // ==========================================

  if (!profile) {
    return (
      <div
        className="
          min-h-screen
          pt-32
          text-center
        "
      >
        <p className="text-red-400">
          {error ||
            "Profile not found"}
        </p>
      </div>
    );
  }


  // ==========================================
  // USER FIRST LETTER
  // ==========================================

  const firstLetter =
    profile.name
      ?.charAt(0)
      ?.toUpperCase() || "U";


  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div
      className="
        min-h-screen
        pt-28
        pb-20
        px-6
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        {/* ================================= */}
        {/* PAGE TITLE */}
        {/* ================================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:justify-between
            sm:items-center
            gap-4
            mb-8
          "
        >

          <div>

            <h1
              className="
                text-4xl
                font-bold
                text-white
              "
            >
              My Profile
            </h1>

            <p
              className="
                text-gray-400
                mt-2
              "
            >
              Manage your placement profile.
            </p>

          </div>


          {!editing && (

            <button
              onClick={() =>
                setEditing(true)
              }

              className="
                px-6
                py-3
                bg-cyan-500
                hover:bg-cyan-600
                text-white
                rounded-xl
                font-semibold
                transition
              "
            >
              Edit Profile
            </button>

          )}

        </div>


        {/* ================================= */}
        {/* PROFILE HEADER */}
        {/* ================================= */}

        <div
          className="
            bg-[#121a2d]
            border
            border-cyan-500/10
            rounded-3xl
            p-8
            mb-6
          "
        >

          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              sm:items-start
              gap-6
            "
          >

            {/* ============================= */}
            {/* PROFILE PICTURE */}
            {/* ============================= */}

            <div
              className="
                relative
                w-28
                h-28
                shrink-0
              "
            >

              {profile.profilePicture ? (

                <img
                  src={
                    profile.profilePicture
                  }

                  alt={
                    profile.name ||
                    "Profile"
                  }

                  className="
                    w-28
                    h-28
                    rounded-full
                    object-cover
                    border-4
                    border-cyan-500/30
                  "
                />

              ) : (

                <div
                  className="
                    w-28
                    h-28
                    rounded-full
                    bg-cyan-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-4xl
                    font-bold
                  "
                >
                  {firstLetter}
                </div>

              )}


              {/* =========================== */}
              {/* PHOTO UPLOAD BUTTON */}
              {/* =========================== */}

              <label
                title="Change profile picture"

                className={`
                  absolute
                  bottom-0
                  right-0

                  w-11
                  h-11

                  rounded-full

                  flex
                  items-center
                  justify-center

                  border-4
                  border-[#121a2d]

                  text-white

                  transition

                  ${
                    photoLoading
                      ? `
                        bg-gray-600
                        cursor-not-allowed
                      `
                      : `
                        bg-cyan-500
                        hover:bg-cyan-600
                        cursor-pointer
                      `
                  }
                `}
              >

                {photoLoading ? (

                  <div
                    className="
                      w-5
                      h-5
                      border-2
                      border-white
                      border-t-transparent
                      rounded-full
                      animate-spin
                    "
                  />

                ) : (

                  <span className="text-lg">
                    📷
                  </span>

                )}


                <input
                  type="file"

                  accept="
                    image/jpeg,
                    image/jpg,
                    image/png,
                    image/webp
                  "

                  onChange={
                    handlePhotoChange
                  }

                  disabled={
                    photoLoading
                  }

                  className="hidden"
                />

              </label>

            </div>


            {/* ============================= */}
            {/* USER DETAILS */}
            {/* ============================= */}

            <div
              className="
                text-center
                sm:text-left
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                  text-white
                "
              >
                {profile.name}
              </h2>


              <p
                className="
                  text-gray-400
                  mt-1
                "
              >
                {profile.email}
              </p>


              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                  mt-3
                  justify-center
                  sm:justify-start
                "
              >

                <span
                  className="
                    inline-block
                    px-3
                    py-1
                    bg-cyan-500/10
                    text-cyan-400
                    rounded-full
                    capitalize
                  "
                >
                  {profile.role}
                </span>


                {profile.batch && (

                  <span
                    className="
                      inline-block
                      px-3
                      py-1
                      bg-purple-500/10
                      text-purple-400
                      rounded-full
                    "
                  >
                    Batch {profile.batch}
                  </span>

                )}

              </div>

            </div>

          </div>


          {/* ============================= */}
          {/* PHOTO UPLOAD MESSAGE */}
          {/* ============================= */}

          <div
            className="
              mt-6
              pt-5
              border-t
              border-gray-700/40
            "
          >

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Click the camera icon to change
              your profile picture. JPG, PNG or
              WebP up to 5 MB.
            </p>

          </div>

        </div>


        {/* ================================= */}
        {/* PHOTO UPLOAD ERROR */}
        {/* ================================= */}

        {error && !editing && (

          <div
            className="
              mb-6
              bg-red-500/10
              border
              border-red-500/20
              text-red-400
              px-5
              py-4
              rounded-xl
            "
          >
            {error}
          </div>

        )}


        {/* ================================= */}
        {/* VIEW MODE */}
        {/* ================================= */}

        {!editing ? (

          <div
            className="
              grid
              md:grid-cols-2
              gap-5
            "
          >

            {/* PHONE */}

            <ProfileField
              title="Phone Number"

              value={
                profile.phone ||
                "Not added"
              }
            />


            {/* BATCH */}

            <ProfileField
              title="Batch"

              value={
                profile.batch ||
                "Not added"
              }
            />


            {/* COMPANY */}

            <ProfileField
              title="Selected Company"

              value={
                profile.selectedCompany ||
                "Not placed yet"
              }
            />


            {/* PACKAGE */}

            <ProfileField
              title="Package"

              value={
                profile.package !== null &&
                profile.package !== undefined &&
                profile.package !== ""

                  ? `${profile.package} LPA`

                  : "Not added"
              }
            />

          </div>

        ) : (

          // =================================
          // EDIT MODE
          // =================================

          <form
            onSubmit={handleSubmit}

            className="
              bg-[#121a2d]
              border
              border-cyan-500/10
              rounded-3xl
              p-8
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-white
                mb-7
              "
            >
              Edit Profile
            </h2>


            <div
              className="
                grid
                md:grid-cols-2
                gap-6
              "
            >

              {/* =========================== */}
              {/* PHONE */}
              {/* =========================== */}

              <InputField
                label="Phone Number"

                name="phone"

                type="tel"

                placeholder="9876543210"

                value={
                  formData.phone
                }

                onChange={
                  handleChange
                }
              />


              {/* =========================== */}
              {/* BATCH */}
              {/* =========================== */}

              <InputField
                label="Batch"

                name="batch"

                type="number"

                placeholder="2028"

                value={
                  formData.batch
                }

                onChange={
                  handleChange
                }
              />


              {/* =========================== */}
              {/* COMPANY */}
              {/* =========================== */}

              <InputField
                label="Selected Company"

                name="selectedCompany"

                placeholder="Microsoft"

                value={
                  formData.selectedCompany
                }

                onChange={
                  handleChange
                }
              />


              {/* =========================== */}
              {/* PACKAGE */}
              {/* =========================== */}

              <InputField
                label="Package (LPA)"

                name="package"

                type="number"

                step="0.01"

                placeholder="24"

                value={
                  formData.package
                }

                onChange={
                  handleChange
                }
              />

            </div>


            {/* ================================= */}
            {/* IMPORTANT */}
            {/* ================================= */}

            <div
              className="
                mt-6
                bg-cyan-500/5
                border
                border-cyan-500/10
                rounded-xl
                px-5
                py-4
              "
            >

              <p
                className="
                  text-sm
                  text-gray-400
                "
              >
                To change your profile picture,
                use the camera button above.
              </p>

            </div>


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && (

              <p
                className="
                  text-red-400
                  mt-5
                "
              >
                {error}
              </p>

            )}


            {/* ================================= */}
            {/* BUTTONS */}
            {/* ================================= */}

            <div
              className="
                flex
                flex-wrap
                gap-4
                mt-8
              "
            >

              <button
                type="submit"

                disabled={
                  updateLoading
                }

                className="
                  px-8
                  py-3
                  bg-cyan-500
                  hover:bg-cyan-600
                  text-white
                  rounded-xl
                  font-semibold
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition
                "
              >

                {updateLoading ? (

                  <span
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <span
                      className="
                        w-5
                        h-5
                        border-2
                        border-white
                        border-t-transparent
                        rounded-full
                        animate-spin
                      "
                    />

                    Saving...

                  </span>

                ) : (

                  "Save Changes"

                )}

              </button>


              <button
                type="button"

                disabled={
                  updateLoading
                }

                onClick={
                  handleCancel
                }

                className="
                  px-8
                  py-3
                  bg-gray-700
                  hover:bg-gray-600
                  text-white
                  rounded-xl
                  disabled:opacity-50
                  transition
                "
              >
                Cancel
              </button>

            </div>

          </form>

        )}

      </div>

    </div>
  );
}


// ==========================================
// PROFILE DISPLAY FIELD
// ==========================================

function ProfileField({
  title,
  value,
}) {
  return (

    <div
      className="
        bg-[#121a2d]
        border
        border-cyan-500/10
        rounded-2xl
        p-6
      "
    >

      <p
        className="
          text-gray-500
          text-sm
        "
      >
        {title}
      </p>


      <p
        className="
          text-white
          text-xl
          font-semibold
          mt-2
        "
      >
        {value}
      </p>

    </div>

  );
}


// ==========================================
// INPUT FIELD
// ==========================================

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  step,
}) {
  return (

    <div>

      <label
        className="
          block
          text-gray-300
          mb-2
          font-medium
        "
      >
        {label}
      </label>


      <input
        name={name}

        type={type}

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        step={step}

        className="
          w-full
          bg-[#071022]
          border
          border-cyan-500/10
          rounded-xl
          px-5
          py-4
          text-white
          outline-none
          focus:border-cyan-500
          transition
        "
      />

    </div>

  );
}