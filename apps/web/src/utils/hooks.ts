import { useState, useEffect, useCallback } from "react";

export const useImageCacheLocalStorage = (
  id: string | undefined,
  defaultValue: string | undefined = undefined,
) => {
  const [image, setImage] = useState<string | undefined>(defaultValue);

  const cacheImage = useCallback(
    (link: string) => {
      if (!id) return;
      localStorage.setItem(id, link);
      setImage(link);
    },
    [id],
  );

  useEffect(() => {
    if (!id) return;
    const cachedImage = localStorage.getItem(id);
    if (cachedImage) setImage(cachedImage);
  }, [id]);

  return {
    cacheImage,
    image,
  };
};

type ErrorState = {
  message: string;
  status: boolean;
};

export const useFormBold = (formId: string) => {
  const [error, setError] = useState<ErrorState>({
    message: "",
    status: false,
  });
  const [succeeded, setSucceeded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    recaptchaRef?: { current: { getValue: () => any } },
  ) => {
    e.preventDefault();

    // Getting the Form data
    const data = new FormData(e.currentTarget);
    //@ts-ignore
    const value = Object.fromEntries(data.entries());
    const finalData = { ...value };

    // Conditionally add "g-recaptcha-response" if recaptchaRef is provided
    if (recaptchaRef) {
      finalData["g-recaptcha-response"] = recaptchaRef.current.getValue();
    }

    //check if the values is empty
    //@ts-ignore
    const isEmpty = !Object.values(value).some((x) => x !== null && x !== "");
    if (isEmpty) {
      return setError({
        message: "Please fill the form!",
        status: true,
      });
    }

    setLoading(true);

    // submit the form
    fetch(`https://formbold.com/s/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    })
      .then((res) => {
        setError({
          message: "",
          status: false,
        });
        setSucceeded(true);
      })
      .catch((error) => {
        setError({
          message: error.message,
          status: true,
        });
        setSucceeded(false);
      })
      .finally(() => setLoading(false));
  };

  return [{ error, succeeded, loading }, handleSubmit] as const;
};
