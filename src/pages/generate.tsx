import { Colors } from "@/constants";
import { type NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import Head from "next/head";

interface FormValues {
  prompt: string;
}

const Generate: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>IconAI - Generate Icon</title>
        <meta
          name="description"
          content="Generate an icon from OpenAI on this page"
        />
      </Head>
      <form
        onSubmit={void handleSubmit(onSubmit)}
        className="mt-5 flex flex-col justify-start space-y-8 text-black"
      >
        <h2 className="text-4xl">Let&apos;s generate your icon.</h2>
        <div>
          <label className="label">
            Enter a descriptive prompt for your icon
          </label>
          <input
            className="form-input w-full rounded-lg"
            placeholder="an astronaut playing basketball with a cat"
            {...register("prompt")}
          />
        </div>
        <div>
          <label className="label">Choose the main color for your icon</label>
          <div className="flex items-center space-x-5">
            {Colors.map((color: string) => (
              <div key={color} className="flex items-center">
                <input
                  id="red-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="form-radio h-5 w-5"
                />
                <label
                  htmlFor="red-radio"
                  className="ml-2 text-base font-medium"
                >
                  Red
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn my-3 w-20">
          Submit
        </button>
      </form>
    </>
  );
};

export default Generate;
