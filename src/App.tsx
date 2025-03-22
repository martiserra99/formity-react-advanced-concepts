import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Step,
  Layout,
  Row,
  TextField,
  NumberField,
  NextButton,
  Data,
} from "./components";

export default function App() {
  const [values, setValues] = useState<object | null>(null);

  if (values) {
    return <Data data={values} onStart={() => setValues(null)} />;
  }

  return (
    <Step
      defaultValues={{
        name: "",
        surname: "",
        age: 20,
      }}
      resolver={zodResolver(
        z.object({
          name: z
            .string()
            .min(1, { message: "Required" })
            .max(20, { message: "Must be at most 20 characters" }),
          surname: z
            .string()
            .min(1, { message: "Required" })
            .max(20, { message: "Must be at most 20 characters" }),
          age: z
            .number()
            .min(18, { message: "Minimum of 18 years old" })
            .max(99, { message: "Maximum of 99 years old" }),
        }),
      )}
      onSubmit={(values) => setValues(values)}
    >
      <Layout
        heading="Tell us about yourself"
        description="We would want to know a little bit more about you"
        fields={[
          <Row
            key="name-surname"
            items={[
              <TextField key="name" name="name" label="Name" />,
              <TextField key="surname" name="surname" label="Surname" />,
            ]}
          />,
          <NumberField key="age" name="age" label="Age" />,
        ]}
        button={<NextButton>Next</NextButton>}
      />
    </Step>
  );
}
