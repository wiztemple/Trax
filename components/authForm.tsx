import React, { useState } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { auth } from "../lib/mutations";

const AuthForm: React.FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password });
    setIsLoading(false);
    router.push("/");
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { name, email, password });
    setIsLoading(false);
    router.push("/");
  };
  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/music.svg" height={50} width={50} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" width="500px" borderRadius="5px">
          <form onSubmit={mode === "signup" ? handleSignup : handleSignin}>
            {mode === "signup" && (
              <Input
                placeholder="user name"
                type="text"
                marginBottom="20px"
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <Input
              placeholder="email"
              type="email"
              marginBottom="20px"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              marginBottom="20px"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.600",
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
