import {
  PasswordInput,
  Text,
  Group,
  Anchor,
  Autocomplete,
  Loader,
} from "@mantine/core";
import { useState, useRef } from "react";

export function ForgotPasswordInput() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 1000);
    }
  };
  return (
    <>
      <Group justify="space-between" mb={5}>
        <Autocomplete
          value={value}
          data={data}
          onChange={handleChange}
          rightSection={loading ? <Loader size="1rem" /> : null}
          label="Async Autocomplete data"
          placeholder="Your email"
        />
        <Text component="label" htmlFor="your-password" size="sm" fw={500}>
          Your password
        </Text>

        <Anchor
          href="#"
          onClick={(event) => event.preventDefault()}
          pt={2}
          fw={500}
          fz="xs"
        >
          Forgot your password?
        </Anchor>
      </Group>
      <PasswordInput placeholder="Your password" id="your-password" />
    </>
  );
}
