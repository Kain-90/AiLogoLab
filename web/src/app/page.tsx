import { Flex, Text, Button } from "@radix-ui/themes";
import { NavBar } from "./components/toggle-theme";

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let's go</Button>
      </Flex>
    </main>
  );
}
